import nodemailer from "nodemailer";

// ─────────────────────────────────────────────────────────────────────────────
// CRITICAL FIX: Do NOT create transporter at module load time.
// With ES modules all imports run before dotenv.config() in index.js,
// so process.env.MAIL_USER / MAIL_PASS would be undefined at that point.
// Creating it lazily (on first use) guarantees env vars are already loaded.
// ─────────────────────────────────────────────────────────────────────────────
let _transporter = null;

const getTransporter = () => {
    if (!_transporter) {
        if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
            throw new Error(
                "Email not configured: MAIL_USER or MAIL_PASS is missing in environment variables."
            );
        }
        _transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,   // Must be a Gmail App Password (16 chars)
            },
        });
    }
    return _transporter;
};

// ── Verify transporter on startup (call this from index.js) ──────────────────
export const verifyMailer = async () => {
    try {
        await getTransporter().verify();
        console.log("✅ Mailer ready:", process.env.MAIL_USER);
    } catch (err) {
        console.error("❌ Mailer config error:", err.message);
        console.error("   → Check MAIL_USER and MAIL_PASS in your Render env vars.");
        console.error("   → MAIL_PASS must be a Gmail App Password, not your regular password.");
        console.error("   → Generate one at: myaccount.google.com → Security → App Passwords");
    }
};

// ── Core send helper ──────────────────────────────────────────────────────────
export const sendEmail = async ({ to, subject, html }) => {
    const transporter = getTransporter();
    await transporter.sendMail({
        from: `"GrowX" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
    });
};

// ── HTML template helpers ─────────────────────────────────────────────────────
const hdr = (emoji, title, from = "#7c3aed", to = "#2563eb") => `
  <div style="background:linear-gradient(135deg,${from},${to});padding:30px;
              border-radius:12px;color:#fff;text-align:center;margin-bottom:20px;">
    <h2 style="margin:0;font-size:24px;">${emoji} ${title}</h2>
  </div>`;

const ftr = () => `
  <p style="color:#9ca3af;font-size:12px;margin-top:20px;text-align:center;">
    © ${new Date().getFullYear()} GrowX · Your Career Growth Platform
  </p>`;

const wrap = (inner) => `
  <div style="font-family:Arial,sans-serif;color:#1f2937;max-width:600px;
              margin:0 auto;padding:20px;background:#f3f4f6;border-radius:12px;">
    ${inner}
  </div>`;

// ══════════════════════════════════════════════════════════════════════════════
// 1. VERIFICATION EMAIL  (on register + resend)
// ══════════════════════════════════════════════════════════════════════════════
export const sendVerificationEmail = async (email, fullname, token, expiry) => {
    const expiryTime = new Date(expiry).toLocaleString("en-US", {
        month: "short", day: "numeric", year: "numeric",
        hour: "2-digit", minute: "2-digit",
    });

    const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    const html = wrap(`
        ${hdr("🔐", "Email Verification")}
        <h3 style="color:#1f2937;margin-top:0;">Welcome, ${fullname}!</h3>
        <p style="color:#6b7280;line-height:1.6;">
            Thank you for joining GrowX. Click the button below to verify your email
            and activate your account.
        </p>
        <div style="text-align:center;margin:30px 0;">
            <a href="${link}" style="background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;
                padding:14px 36px;text-decoration:none;border-radius:8px;
                display:inline-block;font-weight:bold;font-size:16px;">
                ✓ Verify My Email
            </a>
        </div>
        <p style="color:#9ca3af;font-size:13px;margin:20px 0;">
            Button not working? Paste this link in your browser:
        </p>
        <div style="background:#fff;border:3px dashed #7c3aed;border-radius:8px;
                    padding:15px;text-align:center;margin-bottom:20px;">
            <code style="font-size:12px;color:#7c3aed;word-break:break-all;">${link}</code>
        </div>
        <div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:8px;
                    padding:12px;margin-bottom:20px;text-align:center;">
            <p style="color:#d97706;font-weight:bold;margin:0;">⏰ Expires: ${expiryTime} (24 hours)</p>
        </div>
        <p style="color:#6b7280;margin-top:30px;border-top:1px solid #e5e7eb;padding-top:20px;font-size:13px;">
            If you didn't create this account, please ignore this email.
        </p>
        ${ftr()}
    `);

    await sendEmail({ to: email, subject: "✅ Verify Your GrowX Email", html });
};

// ══════════════════════════════════════════════════════════════════════════════
// 2. WELCOME EMAIL  (after successful verification)
// ══════════════════════════════════════════════════════════════════════════════
export const sendWelcomeEmail = async (email, fullname) => {
    const html = wrap(`
        ${hdr("🎉", "Welcome to GrowX!", "#10b981", "#059669")}
        <h3 style="color:#1f2937;margin-top:0;">Great news, ${fullname}!</h3>
        <p style="color:#6b7280;line-height:1.6;">
            Your email has been verified. Your GrowX account is now fully active!
        </p>
        <ul style="color:#374151;font-size:15px;line-height:2.2;padding-left:22px;margin:20px 0;">
            <li>🧠 Take quizzes &amp; track your progress</li>
            <li>💼 Browse jobs &amp; internships</li>
            <li>📄 Build your resume with AI</li>
            <li>✅ ATS check your resume</li>
        </ul>
        <div style="text-align:center;margin:30px 0;">
            <a href="${process.env.FRONTEND_URL}/login"
               style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;
                      padding:12px 30px;text-decoration:none;border-radius:8px;
                      display:inline-block;font-weight:bold;">
                🚀 Go to Login
            </a>
        </div>
        ${ftr()}
    `);

    await sendEmail({ to: email, subject: "🎉 Welcome to GrowX — You're all set!", html });
};

// ══════════════════════════════════════════════════════════════════════════════
// 3. FORGOT PASSWORD EMAIL
// ══════════════════════════════════════════════════════════════════════════════
export const sendForgotPasswordEmail = async (email, fullname, token, expiry) => {
    const expiryTime = new Date(expiry).toLocaleString("en-US", {
        month: "short", day: "numeric", year: "numeric",
        hour: "2-digit", minute: "2-digit",
    });

    const link = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const html = wrap(`
        ${hdr("🔐", "Reset Your Password", "#7c3aed", "#dc2626")}
        <h3 style="color:#1f2937;margin-top:0;">Hi ${fullname},</h3>
        <p style="color:#6b7280;line-height:1.6;">
            We received a request to reset the password for your GrowX account
            associated with <strong>${email}</strong>.
        </p>
        <div style="text-align:center;margin:30px 0;">
            <a href="${link}" style="background:linear-gradient(135deg,#7c3aed,#dc2626);color:#fff;
                padding:14px 36px;text-decoration:none;border-radius:8px;
                display:inline-block;font-weight:bold;font-size:16px;">
                🔑 Reset My Password
            </a>
        </div>
        <p style="color:#9ca3af;font-size:13px;margin:20px 0;">
            Button not working? Paste this link in your browser:
        </p>
        <div style="background:#fff;border:3px dashed #7c3aed;border-radius:8px;
                    padding:15px;text-align:center;margin-bottom:20px;">
            <code style="font-size:12px;color:#7c3aed;word-break:break-all;">${link}</code>
        </div>
        <div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:8px;
                    padding:12px;margin-bottom:20px;text-align:center;">
            <p style="color:#d97706;font-weight:bold;margin:0;">⏰ Expires: ${expiryTime} (15 minutes)</p>
        </div>
        <div style="background:#fef2f2;border:2px solid #fca5a5;border-radius:8px;padding:12px;margin-bottom:20px;">
            <p style="color:#dc2626;font-size:13px;margin:0;">
                🛡️ If you did <strong>not</strong> request this, ignore this email — your account is safe.
            </p>
        </div>
        ${ftr()}
    `);

    await sendEmail({ to: email, subject: "🔐 Reset Your GrowX Password", html });
};

// ══════════════════════════════════════════════════════════════════════════════
// 4. PASSWORD RESET SUCCESS EMAIL
// ══════════════════════════════════════════════════════════════════════════════
export const sendPasswordResetSuccessEmail = async (email, fullname) => {
    const html = wrap(`
        ${hdr("✅", "Password Reset Successful", "#10b981", "#059669")}
        <h3 style="color:#1f2937;margin-top:0;">Hi ${fullname},</h3>
        <p style="color:#6b7280;line-height:1.6;">
            Your GrowX password has been successfully changed.
        </p>
        <div style="text-align:center;margin:30px 0;">
            <a href="${process.env.FRONTEND_URL}/login"
               style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;
                      padding:12px 30px;text-decoration:none;border-radius:8px;
                      display:inline-block;font-weight:bold;">
                Go to Login
            </a>
        </div>
        <div style="background:#fef2f2;border:2px solid #fca5a5;border-radius:8px;padding:12px;">
            <p style="color:#dc2626;font-size:13px;margin:0;">
                ⚠️ If you did <strong>not</strong> make this change, contact support immediately.
            </p>
        </div>
        ${ftr()}
    `);

    await sendEmail({ to: email, subject: "✅ GrowX Password Reset Successful", html });
};