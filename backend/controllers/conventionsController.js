const { v4: uuidv4 } = require('uuid');
const path = require('path');
const conventionSchema = require('../validations/convention.validation');
const { generateSignatureToken } = require('../utils/jwtUtils');
const { generateConventionPDF } = require('../services/pdfService');
const Convention = require('../models/Convention');

exports.createConvention = async (req, res) => {
  const { error, value } = conventionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Champs invalides', details: error.details });
  }

  const id = uuidv4();
  const tokens = {
    eleve: generateSignatureToken(id, 'eleve'),
    famille: generateSignatureToken(id, 'famille'),
    entreprise: generateSignatureToken(id, 'entreprise'),
    ecole: generateSignatureToken(id, 'ecole')
  };

  const date_creation = new Date().toISOString();
  const statut = 'en_attente';
  const convention = {
    ...value,
    meta: {
      id,
      date_creation,
      tokens,
      statut,
      pdf_url: ''
    },
    signatures: {
      eleve: null,
      famille: null,
      entreprise: null,
      ecole: null
    }
  };

  const pdfPath = path.join(__dirname, '../pdfs', `${id}.pdf`);
  try {
    await generateConventionPDF(convention, pdfPath);
    convention.meta.pdf_url = `/pdfs/${id}.pdf`;

    await Convention.create({
      id,
      data: convention,
      pdfUrl: convention.meta.pdf_url,
      statut,
      dateCreation: new Date()
    });

    return res.status(201).json({
      message: 'Convention créée avec succès',
      id,
      tokens,
      date_creation,
      pdf_url: convention.meta.pdf_url
    });
  } catch (err) {
    console.error('Erreur :', err);
    return res.status(500).json({ message: 'Erreur lors de la création de la convention' });
  }
};

exports.getConventionById = async (req, res) => {
  const { id } = req.params;
  try {
    const convention = await Convention.findByPk(id);
    if (!convention) {
      return res.status(404).json({ message: 'Convention non trouvée' });
    }
    return res.status(200).json(convention);
  } catch (err) {
    console.error('Erreur lors de la récupération :', err);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};
