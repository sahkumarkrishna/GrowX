import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

// ── Shared send helper ─────────────────────────────────────────────────────────
export const sendEmail = async ({ to, subject, html }) => {
    await transporter.sendMail({
        from: `"GrowX" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
    });
};

// ── Shared brand header / footer ───────────────────────────────────────────────
const header = (emoji, title, gradientFrom = "#7c3aed", gradientTo = "#2563eb") => `
  <div style="background:linear-gradient(135deg,${gradientFrom},${gradientTo});padding:30px;
              border-radius:12px;color:#fff;text-align:center;margin-bottom:20px;">
    <h2 style="margin:0;font-size:24px;">${emoji} ${title}</h2>
  </div>`;

const footer = () => `
  <p style="color:#9ca3af;font-size:12px;margin-top:20px;text-align:center;">
    © ${new Date().getFullYear()} GrowX · Your Career Growth Platform
  </p>`;

const wrapper = (inner) => `
  <div style="font-family:Arial,sans-serif;color:#1f2937;max-width:600px;
              margin:0 auto;padding:20px;background:#f3f4f6;border-radius:12px;">
    ${inner}
  </div>`;

// ══════════════════════════════════════════════════════════════════════════════
// 1. SEND VERIFICATION EMAIL  (called on register)
// ══════════════════════════════════════════════════════════════════════════════
export const sendVerificationEmail = async (email, fullname, token, expiry) => {
    const expiryTime = new Date(expiry).toLocaleString("en-US", {
        month: "short", day: "numeric", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    });

    const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    const html = wrapper(`
        ${header("🔐", "Email Verification")}
        <h3 style="color:#1f2937;margin-top:0;">Welcome, ${fullname}!</h3>
        <p style="color:#6b7280;line-height:1.6;">
            Thank you for joining GrowX. Please verify your email address to complete
            your registration and unlock all features.
        </p>

        <div style="text-align:center;margin:30px 0;">
            <a href="${link}"
               style="background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;
                      padding:12px 30px;text-decoration:none;border-radius:8px;
                      display:inline-block;font-weight:bold;">
                ✓ Verify Email
            </a>
        </div>

        <p style="color:#9ca3af;font-size:13px;margin:20px 0;">
            Or paste this link in your browser:
        </p>
        <div style="background:#fff;border:3px dashed #7c3aed;border-radius:8px;
                    padding:15px;text-align:center;margin-bottom:20px;">
            <code style="font-size:13px;color:#7c3aed;word-break:break-all;">${link}</code>
        </div>

        <div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:8px;
                    padding:12px;margin-bottom:20px;text-align:center;">
            <p style="color:#d97706;font-weight:bold;margin:0;">⏰ Expires: ${expiryTime}</p>
        </div>

        <p style="color:#6b7280;margin-top:30px;border-top:1px solid #e5e7eb;padding-top:20px;">
            If you didn't create this account, please ignore this email.
        </p>
        ${footer()}
    `);

    await sendEmail({ to: email, subject: "Verify Your GrowX Email", html });
};

// ══════════════════════════════════════════════════════════════════════════════
// 2. RESEND VERIFICATION EMAIL
// ══════════════════════════════════════════════════════════════════════════════
export const sendResendVerificationEmail = async (email, fullname, token, expiry) => {
    // Reuse same template — just different subject
    await sendVerificationEmail(email, fullname, token, expiry);
    // (subject override is fine; function reuses the template above)
};

// ══════════════════════════════════════════════════════════════════════════════
// 3. WELCOME EMAIL  (sent after email is verified)
// ══════════════════════════════════════════════════════════════════════════════
export const sendWelcomeEmail = async (email, fullname) => {
    const html = wrapper(`
        ${header("✅", "Email Verified!", "#10b981", "#059669")}
        <h3 style="color:#1f2937;margin-top:0;">Great news, ${fullname}!</h3>
        <p style="color:#6b7280;line-height:1.6;">
            Your email has been successfully verified. You can now login to your GrowX
            account and start exploring all features.
        </p>

        <ul style="color:#374151;font-size:15px;line-height:2.2;padding-left:22px;margin:20px 0;">
            <li>🧠 Take quizzes &amp; track your progress</li>
            <li>💼 Browse jobs &amp; internship opportunities</li>
            <li>📄 Build your resume with AI assistance</li>
            <li>✅ Run an ATS check on your resume</li>
        </ul>

        <div style="text-align:center;margin:30px 0;">
            <a href="${process.env.FRONTEND_URL}/login"
               style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;
                      padding:12px 30px;text-decoration:none;border-radius:8px;
                      display:inline-block;font-weight:bold;">
                Go to Login
            </a>
        </div>

        <p style="color:#6b7280;margin-top:30px;border-top:1px solid #e5e7eb;padding-top:20px;">
            You're all set! Start your journey with GrowX.
        </p>
        ${footer()}
    `);

    await sendEmail({ to: email, subject: "Email Verified - Welcome to GrowX! 🎉", html });
};

// ══════════════════════════════════════════════════════════════════════════════
// 4. FORGOT PASSWORD EMAIL
// ══════════════════════════════════════════════════════════════════════════════
export const sendForgotPasswordEmail = async (email, fullname, token, expiry) => {
    const expiryTime = new Date(expiry).toLocaleString("en-US", {
        month: "short", day: "numeric", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    });

    const link = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const html = wrapper(`
        ${header("🔐", "Reset Your Password", "#7c3aed", "#dc2626")}
        <h3 style="color:#1f2937;margin-top:0;">Hi ${fullname},</h3>
        <p style="color:#6b7280;line-height:1.6;">
            We received a request to reset the password for your GrowX account
            associated with <strong>${email}</strong>.
        </p>
        <p style="color:#6b7280;line-height:1.6;">
            Click the button below to set a new password:
        </p>

        <div style="text-align:center;margin:30px 0;">
            <a href="${link}"
               style="background:linear-gradient(135deg,#7c3aed,#dc2626);color:#fff;
                      padding:14px 36px;text-decoration:none;border-radius:8px;
                      display:inline-block;font-weight:bold;font-size:16px;">
                🔑 Reset My Password
            </a>
        </div>

        <p style="color:#9ca3af;font-size:13px;margin:20px 0;">
            Or paste this link in your browser:
        </p>
        <div style="background:#fff;border:3px dashed #7c3aed;border-radius:8px;
                    padding:15px;text-align:center;margin-bottom:20px;">
            <code style="font-size:13px;color:#7c3aed;word-break:break-all;">${link}</code>
        </div>

        <div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:8px;
                    padding:12px;margin-bottom:20px;text-align:center;">
            <p style="color:#d97706;font-weight:bold;margin:0;">⏰ Expires: ${expiryTime} (15 minutes)</p>
        </div>

        <div style="background:#fef2f2;border:2px solid #fca5a5;border-radius:8px;
                    padding:12px;margin-bottom:20px;">
            <p style="color:#dc2626;font-size:13px;margin:0;">
                🛡️ If you did <strong>not</strong> request a password reset, please ignore
                this email. Your account is safe and your password has not been changed.
            </p>
        </div>

        <p style="color:#6b7280;margin-top:30px;border-top:1px solid #e5e7eb;padding-top:20px;font-size:13px;">
            This link expires in 15 minutes for your security.
        </p>
        ${footer()}
    `);

    await sendEmail({ to: email, subject: "🔐 Reset Your GrowX Password", html });
};

// ══════════════════════════════════════════════════════════════════════════════
// 5. PASSWORD RESET SUCCESS EMAIL
// ══════════════════════════════════════════════════════════════════════════════
export const sendPasswordResetSuccessEmail = async (email, fullname) => {
    const html = wrapper(`
        ${header("✅", "Password Reset Successful", "#10b981", "#059669")}
        <h3 style="color:#1f2937;margin-top:0;">Hi ${fullname},</h3>
        <p style="color:#6b7280;line-height:1.6;">
            Your GrowX account password has been successfully reset.
        </p>

        <div style="background:#f0fdf4;border:2px solid #86efac;border-radius:8px;
                    padding:16px;margin:20px 0;text-align:center;">
            <p style="color:#16a34a;font-weight:bold;margin:0;font-size:16px;">
                ✅ Password changed successfully!
            </p>
        </div>

        <p style="color:#6b7280;line-height:1.6;">
            You can now log in with your new password.
        </p>

        <div style="text-align:center;margin:30px 0;">
            <a href="${process.env.FRONTEND_URL}/login"
               style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;
                      padding:12px 30px;text-decoration:none;border-radius:8px;
                      display:inline-block;font-weight:bold;">
                Go to Login
            </a>
        </div>

        <div style="background:#fef2f2;border:2px solid #fca5a5;border-radius:8px;
                    padding:12px;margin-bottom:20px;">
            <p style="color:#dc2626;font-size:13px;margin:0;">
                ⚠️ If you did <strong>not</strong> make this change, please contact us
                immediately and secure your account.
            </p>
        </div>

        <p style="color:#6b7280;margin-top:30px;border-top:1px solid #e5e7eb;padding-top:20px;font-size:13px;">
            For security, this notification was sent to ${email}.
        </p>
        ${footer()}
    `);

    await sendEmail({ to: email, subject: "✅ GrowX Password Reset Successful", html });
};
