const { v4: uuidv4 } = require('uuid');
const path = require('path');
const conventionSchema = require('../validations/convention.validation');

const { generateSignatureToken } = require('../utils/jwtUtils');
const { generateConventionPDF } = require('../services/pdfService');
const { sendSignatureEmail } = require('../services/mailService');

const Convention = require('../models/Convention');

exports.createConvention = async (req, res) => {
  console.log("📨 Données reçues dans req.body :", JSON.stringify(req.body, null, 2));
  
  const { error, value } = conventionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Champs invalides', details: error.details });
  }

  const id = uuidv4();
  const tokens = {
    eleve: generateSignatureToken(id, 'eleve'),
    famille: generateSignatureToken(id, 'famille'),
    entreprise: generateSignatureToken(id, 'entreprise'),
    professeur: generateSignatureToken(id, 'professeur')
  };

  const date_creation = new Date().toLocaleDateString('fr-FR');
  const statut = 'en_attente';
  const convention = {
    eleve: value.eleve,
    famille: value.famille,
    entreprise: value.entreprise,
    professeur: value.professeur,
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
      professeur: null
    }
  };


  const emails = {
    eleve: value.eleve?.email,
    famille: value.famille?.email,
    entreprise: value.entreprise?.email,
    professeur: value.professeur?.email
  };


  const signatureLinks = {};
    for (const role in tokens) {
      signatureLinks[role] = `${process.env.FRONTEND_URL}/signature/${tokens[role]}`;
    }

  const pdfsFolderPath = path.join(__dirname, '../pdfs');
  if (!require('fs').existsSync(pdfsFolderPath)) {
      require('fs').mkdirSync(pdfsFolderPath, { recursive: true });
      console.log(`Dossier PDF créé : ${pdfsFolderPath}`);
  }

  const pdfPath = path.join(__dirname, '../pdfs', `${id}.pdf`);
  try {
    await generateConventionPDF(convention, pdfPath);
    convention.meta.pdf_url = `/pdfs/${id}.pdf`;

    await Convention.create({
      id,
      data: convention,
      pdfUrl: convention.meta.pdf_url,
      statut,
      dateCreation: new Date().toLocaleDateString('fr-FR')
    });

    for (const role in emails) {
      const email = emails[role];

      console.log(`📧 Envoi de l'email de signature pour le rôle ${role} à l'adresse :`, email);

      if (email) { // Vérifie que l'email existe avant d'envoyer
        const link = `${process.env.FRONTEND_URL}/signature/${tokens[role]}`;
        await sendSignatureEmail(email, role, link, id);
      } else {
        console.warn(`Adresse email manquante pour le rôle ${role}. L'email de signature ne sera pas envoyé.`);
      }
    }

    return res.status(201).json({
      message: 'Convention créée avec succès',
      id,
      tokens,
      signatureLinks,
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

exports.getConventionStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const convention = await Convention.findByPk(id, {
      attributes: ['id', 'statut', 'signatures', 'data']
    });

    if (!convention) {
      return res.status(404).json({ message: 'Convention non trouvée' });
    }

    const rolesStatus = {};
    let allSigned = true;
    const orderedRoles = ['eleve', 'famille', 'entreprise', 'professeur'];

    if (convention.signatures) {
      orderedRoles.forEach(r => {
        const isSigned = !!convention.signatures[r]?.signe;
        rolesStatus[r] = {
          signed: isSigned,
          date: convention.signatures[r]?.date || null
        };
        if (!isSigned) {
          allSigned = false;
        }
      });
    } else {
      allSigned = false;
    }

    if (allSigned && convention.statut !== 'validée') {
      await convention.update({ statut: 'validée' });
      console.log(`Convention ${id} mise à jour au statut 'validée' car toutes les signatures sont présentes.`);
      convention.statut = 'validée';
    }

    const signatairesInfo = {
      eleve: { nom: convention.data?.eleve?.nom, prenom: convention.data?.eleve?.prenom, email: convention.data?.eleve?.email },
      famille: { nom: convention.data?.famille?.nom, prenom: convention.data?.famille?.prenom, email: convention.data?.famille?.email },
      entreprise: { nom: convention.data?.entreprise?.nom, prenom: convention.data?.entreprise?.tuteur, email: convention.data?.entreprise?.email },
      professeur: { nom: convention.data?.professeur?.nom, prenom: null, email: convention.data?.professeur?.email }
    };


    return res.status(200).json({
      id: convention.id,
      statutGlobal: convention.statut,
      signatures: rolesStatus,
      signatairesInfo: signatairesInfo
    });

  } catch (err) {
    console.error('Erreur lors de la récupération du statut de la convention par ID :', err);
    return res.status(500).json({ message: 'Erreur serveur lors de la récupération du statut.' });
  }
};
