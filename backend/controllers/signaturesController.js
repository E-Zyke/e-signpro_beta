const jwt = require('jsonwebtoken');
const db = require('../database');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');

exports.signConvention = async (req, res) => {
  try {
    const { token } = req.params;
    const { nom_signataire } = req.body;

    if (!nom_signataire) {
      return res.status(400).json({ message: 'Nom requis pour signature.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id_convention, role } = decoded;

    const result = await db.query('SELECT * FROM conventions WHERE id = $1', [id_convention]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Convention introuvable.' });

    const convention = result.rows[0];
    const pdf_path = convention.pdf_path;

    // Charger et modifier le PDF
    const pdfDoc = await PDFDocument.load(fs.readFileSync(pdf_path));
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Position X/Y selon le rôle du signataire
    const positions = {
      eleve: { x: 100, y: 150 },
      parent: { x: 100, y: 130 },
      entreprise: { x: 100, y: 110 },
      professeur: { x: 100, y: 90 }
    };

    const pos = positions[role] || { x: 100, y: 50 };

    // Ajouter la signature texte
    page.drawText(`${nom_signataire}`, {
      x: pos.x,
      y: pos.y,
      size: 12,
      font,
      color: rgb(0, 0, 0)
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(pdf_path, pdfBytes);

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
const now = new Date().toISOString();


let signatures = convention.signatures || {};
signatures[role] = {
  done: true,
  nom: nom_signataire,
  date: now,
  ip
};

await db.query(
  'UPDATE conventions SET signatures = $1 WHERE id = $2',
  [signatures, id_convention]
);


    return res.status(200).json({ message: 'Signature enregistrée avec succès.' , signatures });
  } catch (err) {
    console.error(err);
      res.status(401).json({ message: 'Token invalide ou expiré.' });
      return res.status(500).json({ message: 'Erreur lors de la signature.' });
  }
};
