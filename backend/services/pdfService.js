const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function generateConventionPDF(conventionData) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // format A4 (en points)

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const { eleve_nom, eleve_prenom, entreprise_nom, date_debut_stage, date_fin_stage } = conventionData;

  page.drawText('Convention de stage', {
    x: 50,
    y: 800,
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Élève : ${eleve_prenom} ${eleve_nom}`, {
    x: 50,
    y: 760,
    size: 14,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Entreprise : ${entreprise_nom}`, {
    x: 50,
    y: 730,
    size: 14,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Période : du ${date_debut_stage} au ${date_fin_stage}`, {
    x: 50,
    y: 700,
    size: 14,
    font,
    color: rgb(0, 0, 0),
  });

  const fileName = `convention_${eleve_nom}_${eleve_prenom}_${Date.now()}.pdf`;
  const filePath = path.join(__dirname, '../pdfs', fileName);

  if (!fs.existsSync(path.join(__dirname, '../pdfs'))) {
    fs.mkdirSync(path.join(__dirname, '../pdfs'));
  }

  // Sauvegarder le PDF
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(filePath, pdfBytes);

  return filePath; // retourne le chemin du PDF généré
}

module.exports = {
  generateConventionPDF,
};
