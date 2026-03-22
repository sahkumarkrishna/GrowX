import nodemailer from "nodemailer";

// ── Create transporter ─────────────────────────────────────────────────────────
// Uses Gmail App Password — NOT your real Gmail password.
// Generate at: Google Account → Security → 2-Step Verification → App Passwords
const createTransporter = () => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.error("❌ MAIL_USER or MAIL_PASS env variable is missing!");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,   // 16-char App Password, e.g. "abcd efgh ijkl mnop"
    },
    // Important for Render / production
    pool: true,
    maxConnections: 3,
    rateDelta: 10000,
    rateLimit: 5,
  });
};

// ── Verify SMTP connection on startup ─────────────────────────────────────────
export const verifyMailer = async () => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.error("❌ Mailer: MAIL_USER or MAIL_PASS is not set in .env");
    return;
  }
  try {
    const t = createTransporter();
    await t.verify();
    console.log(`✅ Mailer ready — sending as ${process.env.MAIL_USER}`);
  } catch (err) {
    console.error("❌ Mailer connection failed:", err.message);
    console.error("   → Check MAIL_USER and MAIL_PASS in your .env");
    console.error("   → MAIL_PASS must be a Gmail App Password, not your real password");
  }
};

// ── Generic send with retry ────────────────────────────────────────────────────
export const sendEmail = async ({ to, subject, html }, retries = 2) => {
  const transporter = createTransporter();
  if (!transporter) throw new Error("Mail transporter not configured.");

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      const info = await transporter.sendMail({
        from: `"GrowX" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
      });
      console.log(`✅ Email sent to ${to} | MessageId: ${info.messageId}`);
      return info;
    } catch (err) {
      console.error(`❌ Email attempt ${attempt} failed for ${to}:`, err.message);
      if (attempt > retries) throw err;
      await new Promise((r) => setTimeout(r, 2000 * attempt)); // backoff
    }
  }
};

// ── Shared layout helpers ──────────────────────────────────────────────────────
const wrap = (inner) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>GrowX</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;padding:20px;">
    <div style="background:#fff;border-radius:16px;overflow:hidden;
                box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      ${inner}
    </div>
    <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:20px;">
      © ${new Date().getFullYear()} GrowX · Your Career Growth Platform
    </p>
  </div>
</body>
</html>`;

const header = (emoji, title, from = "#7c3aed", to = "#2563eb") =>
  `<div style="background:linear-gradient(135deg,${from},${to});
               padding:36px;text-align:center;">
     <div style="width:56px;height:56px;background:rgba(255,255,255,0.2);
                 border-radius:14px;margin:0 auto 16px;
                 display:flex;align-items:center;justify-content:center;
                 font-size:28px;line-height:56px;text-align:center;">
       ${emoji}
     </div>
     <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;">${title}</h1>
   </div>`;

const body   = (inner) => `<div style="padding:36px;">${inner}</div>`;
const btn    = (href, label, from = "#7c3aed", to = "#2563eb") =>
  `<div style="text-align:center;margin:28px 0;">
     <a href="${href}"
        style="background:linear-gradient(135deg,${from},${to});
               color:#fff;padding:14px 40px;text-decoration:none;
               border-radius:10px;font-weight:700;font-size:15px;
               display:inline-block;">
       ${label}
     </a>
   </div>`;
const pill   = (text) =>
  `<div style="background:#f5f3ff;border:2px solid #ddd6fe;border-radius:10px;
               padding:12px 20px;text-align:center;margin:16px 0;">
     <code style="color:#7c3aed;font-size:14px;font-weight:700;
                  word-break:break-all;">${text}</code>
   </div>`;
const warn   = (text, bg = "#fef3c7", border = "#f59e0b", color = "#92400e") =>
  `<div style="background:${bg};border:2px solid ${border};border-radius:10px;
               padding:14px 18px;margin-top:20px;">
     <p style="color:${color};font-size:13px;margin:0;line-height:1.6;">${text}</p>
   </div>`;

// ══════════════════════════════════════════════════════════════════════════════
// 1.  VERIFICATION EMAIL  (register + resend)
// ══════════════════════════════════════════════════════════════════════════════
export const sendVerificationEmail = async (email, fullname, token, expiry) => {
  const FRONTEND = process.env.FRONTEND_URL || "https://growx.onrender.com";
  const link = `${FRONTEND}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

  const expiryStr = new Date(expiry).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "UTC",
  }) + " UTC";

  const html = wrap(
    header("🔐", "Verify Your Email Address") +
    body(`
      <h3 style="color:#1f2937;margin:0 0 12px;">Welcome, ${fullname}! 👋</h3>
      <p style="color:#6b7280;line-height:1.7;margin:0 0 16px;">
        Thanks for signing up to GrowX. Click the button below to confirm your
        email address and activate your account.
      </p>
      <p style="color:#6b7280;font-size:14px;margin:0 0 4px;">
        Verifying this address:
      </p>
      ${pill(email)}
      ${btn(link, "✅ Verify My Email")}
      ${warn(`⏰ This link expires at <strong>${expiryStr}</strong> (24 hours).`)}
      <hr style="border:none;border-top:1px solid #f0f0f0;margin:24px 0;"/>
      <p style="color:#9ca3af;font-size:12px;margin:0;">
        Button not working? Paste this URL in your browser:<br/>
        <a href="${link}" style="color:#7c3aed;word-break:break-all;">${link}</a>
      </p>
      <p style="color:#9ca3af;font-size:12px;margin-top:16px;">
        If you didn't create this account, ignore this email.
      </p>
    `)
  );

  await sendEmail({ to: email, subject: "✅ Verify your GrowX email address", html });
};

// ══════════════════════════════════════════════════════════════════════════════
// 2.  WELCOME EMAIL  (after verification)
// ══════════════════════════════════════════════════════════════════════════════
export const sendWelcomeEmail = async (email, fullname) => {
  const FRONTEND = process.env.FRONTEND_URL || "https://growx.onrender.com";

  const html = wrap(
    header("🎉", "Email Verified!", "#10b981", "#059669") +
    body(`
      <h3 style="color:#1f2937;margin:0 0 12px;">You're all set, ${fullname}!</h3>
      <p style="color:#6b7280;line-height:1.7;margin:0 0 20px;">
        Your email <strong style="color:#7c3aed;">${email}</strong> has been
        verified. Your GrowX account is now fully active.
      </p>
      <ul style="color:#374151;font-size:14px;line-height:2.2;padding-left:20px;margin:0 0 20px;">
        <li>🧠 Take quizzes &amp; track your progress</li>
        <li>💼 Browse jobs &amp; internships</li>
        <li>📄 Build your resume with AI</li>
        <li>✅ Run an ATS check on your resume</li>
      </ul>
      ${btn(`${FRONTEND}/login`, "🚀 Go to Dashboard", "#10b981", "#059669")}
    `)
  );

  await sendEmail({ to: email, subject: "🎉 Welcome to GrowX — You're all set!", html });
};

// ══════════════════════════════════════════════════════════════════════════════
// 3.  FORGOT PASSWORD
// ══════════════════════════════════════════════════════════════════════════════
export const sendForgotPasswordEmail = async (email, fullname, token, expiry) => {
  const FRONTEND = process.env.FRONTEND_URL || "https://growx.onrender.com";
  const link = `${FRONTEND}/reset-password/${token}`;

  const expiryStr = new Date(expiry).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "UTC",
  }) + " UTC";

  const html = wrap(
    header("🔑", "Reset Your Password", "#7c3aed", "#dc2626") +
    body(`
      <h3 style="color:#1f2937;margin:0 0 12px;">Hi ${fullname},</h3>
      <p style="color:#6b7280;line-height:1.7;margin:0 0 16px;">
        We received a request to reset the password for the GrowX account
        associated with:
      </p>
      ${pill(email)}
      ${btn(link, "🔑 Reset My Password", "#7c3aed", "#dc2626")}
      ${warn(`⏰ This link expires at <strong>${expiryStr}</strong> (15 minutes).`)}
      ${warn(
        "🛡️ If you did <strong>not</strong> request this, you can safely ignore this email. Your password has not been changed.",
        "#fef2f2", "#fca5a5", "#dc2626"
      )}
      <hr style="border:none;border-top:1px solid #f0f0f0;margin:24px 0;"/>
      <p style="color:#9ca3af;font-size:12px;margin:0;">
        Button not working? Paste this URL in your browser:<br/>
        <a href="${link}" style="color:#7c3aed;word-break:break-all;">${link}</a>
      </p>
    `)
  );

  await sendEmail({ to: email, subject: "🔑 Reset your GrowX password", html });
};

// ══════════════════════════════════════════════════════════════════════════════
// 4.  PASSWORD RESET SUCCESS
// ══════════════════════════════════════════════════════════════════════════════
export const sendPasswordResetSuccessEmail = async (email, fullname) => {
  const FRONTEND = process.env.FRONTEND_URL || "https://growx.onrender.com";

  const html = wrap(
    header("✅", "Password Reset Successful", "#10b981", "#059669") +
    body(`
      <h3 style="color:#1f2937;margin:0 0 12px;">Hi ${fullname},</h3>
      <p style="color:#6b7280;line-height:1.7;margin:0 0 20px;">
        Your GrowX account password has been reset successfully.
        You can now log in with your new password.
      </p>
      ${btn(`${FRONTEND}/login`, "Go to Login", "#10b981", "#059669")}
      ${warn(
        "⚠️ If you did <strong>not</strong> make this change, contact us immediately.",
        "#fef2f2", "#fca5a5", "#dc2626"
      )}
    `)
  );

  await sendEmail({ to: email, subject: "✅ GrowX password reset successful", html });
};