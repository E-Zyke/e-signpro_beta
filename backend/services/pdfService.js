const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

async function generateConventionPDF(data, outputPath) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // En-tête
    doc.fontSize(22).text('Convention de Stage', { align: 'center', underline: true });
    doc.moveDown(1.5);

    // Élève
    doc.fontSize(16).fillColor('#333').text('Informations Élève', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor('black');
    doc.text(`Nom : ${data.eleve.nom}`);
    doc.text(`Prénom : ${data.eleve.prenom}`);
    doc.text(`Date de naissance : ${data.eleve.date_naissance}`);
    doc.text(`Classe : ${data.eleve.classe}`);
    doc.text(`Email : ${data.eleve.email}`);
    doc.text(`Téléphone : ${data.eleve.tel}`);
    doc.moveDown();

    // Professeur
    doc.fontSize(16).text('Référent Scolaire', { underline: true });
    doc.fontSize(12);
    doc.text(`Nom : ${data.professeur.nom}`);
    doc.text(`Email : ${data.professeur.email}`);
    doc.text(`Téléphone : ${data.professeur.tel}`);
    doc.moveDown();

    // Entreprise
    doc.fontSize(16).text('Informations Entreprise', { underline: true });
    doc.fontSize(12);
    doc.text(`Nom : ${data.entreprise.nom}`);
    doc.text(`Adresse : ${data.entreprise.adresse}`);
    doc.text(`SIRET : ${data.entreprise.siret}`);
    doc.text(`Code NAF : ${data.entreprise.naf}`);
    doc.text(`RC Pro : ${data.entreprise.rc}`);
    doc.text(`Téléphone : ${data.entreprise.tel}`);
    doc.text(`Email : ${data.entreprise.email}`);
    doc.text(`Tuteur : ${data.entreprise.tuteur}`);
    doc.moveDown();

    // Famille
    doc.fontSize(16).text('Informations Famille', { underline: true });
    doc.fontSize(12);
    doc.text(`Sécurité sociale : ${data.famille.secu}`);
    doc.text(`CPAM : ${data.famille.cpam}`);
    doc.text(`Transport : ${data.famille.transport}`);
    doc.text(`Restauration : ${data.famille.restauration}`);
    doc.moveDown();

    // Stage
    doc.fontSize(16).text('Stage', { underline: true });
    doc.fontSize(12);
    doc.text(`Lieu : ${data.stage.lieu}`);
    doc.text(`Dates : du ${data.stage.date_debut} au ${data.stage.date_fin}`);
    doc.moveDown();

    // Horaires
    if (data.stage.horaires) {
      doc.fontSize(16).text('Horaires', { underline: true });
      doc.fontSize(12);
      for (const [jour, horaire] of Object.entries(data.stage.horaires)) {
        doc.text(`${jour.charAt(0).toUpperCase() + jour.slice(1)} : ${horaire}`);
      }
      doc.moveDown();
    }

    // Signatures dynamiques avec détails
    doc.fontSize(16).text('Statut des Signatures', { underline: true });
    doc.moveDown(0.5);
    const roles = ['eleve', 'famille', 'entreprise', 'professeur'];
    roles.forEach(role => {
      const sig = data.signatures?.[role];
      if (sig?.signe) {
        doc.fillColor('green').text(`✔️ Signé par ${role} le ${new Date(sig.date).toLocaleString()}`);
        if (sig.ip) doc.fontSize(10).fillColor('gray').text(`IP : ${sig.ip}`);
        if (sig.agent) doc.fontSize(10).fillColor('gray').text(`Navigateur : ${sig.agent}`);
        doc.moveDown(0.5);
      } else {
        doc.fillColor('red').fontSize(12).text(`❌ En attente de signature : ${role}`);
        doc.moveDown(0.5);
      }
    });

    doc.end();
    stream.on('finish', () => resolve(outputPath));
    stream.on('error', reject);
  });
}

module.exports = { generateConventionPDF };
