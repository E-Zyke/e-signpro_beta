const nodemailer = require('nodemailer');

const isDev = process.env.NODE_ENV !== 'production';
const devEmail = 'gemici.enes@etik.com';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/**
 * Envoie un lien de signature par email
 * @param {string} to - L'adresse email du destinataire
 * @param {string} role - Le rôle du destinataire (eleve, famille, entreprise, ecole)
 * @param {string} link - Le lien unique de signature à envoyer
 */
async function sendSignatureEmail(to, role, link) {
    const destination = isDev ? devEmail : to;

    await transporter.sendMail({
        from: `"E-SIGN PRO" <${process.env.SMTP_USER}>`,
        to: destination,
        subject: `Signature requise pour la convention de stage`,
        html: `
            <div style="font-family: sans-serif; padding: 20px;">
                <h2>Signature demandée</h2>
                <p>Bonjour,</p>
                <p>Vous êtes invité à signer la convention en tant que <strong>${role}</strong>.</p>
                <p>
                <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color:rgb(49, 108, 236); color: white; text-decoration: none; border-radius: 5px;">
                    Signer maintenant
                </a>
                </p>
                <p style="color: #999;">(Lien destiné à : ${to})</p>
                <hr />
                <small>E‑SIGN PRO - Plateforme de signature de conventions</small>
            </div>
            `
        });
    console.log(`Email de signature envoyé à ${destination} pour le rôle ${role}`);
    }

    module.exports = { sendSignatureEmail };
