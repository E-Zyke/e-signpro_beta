const db = require('../database');
const { v4: uuidv4 } = require('uuid');
const { generateConventionPDF } = require('../services/pdfService');
const { generateSignatureToken } = require('../utils/jwtUtils');

exports.createConvention = async (req, res) => {
  try {
    const {
      lycee_proviseur,
      lycee_email,
      lycee_adresse,
      lycee_tel,
      lycee_fax,
      lycee_site,
      eleve_prenom,
      eleve_nom,
      eleve_date_naissance,
      eleve_adresse,
      eleve_tel,
      eleve_email,
      eleve_classe,
      prof_principal_nom,
      prof_referent_email,
      entreprise_nom,
      entreprise_siret,
      entreprise_code_naf,
      entreprise_assurance_rc,
      entreprise_adresse,
      entreprise_tel,
      entreprise_email,
      entreprise_tuteur_nom,
      entreprise_tuteur_fonction,
      entreprise_tuteur_tel,
      cpam,
      securite_sociale,
      transport_lycee,
      transport_stage,
      restauration,
      restauration_preciser,
      hebergement,
      hebergement_preciser,
      date_debut_stage,
      date_fin_stage,
      lieu_stage,
      horaires_stage
    } = req.body;

    const id = uuidv4();

    const token_eleve      = generateSignatureToken(id, 'eleve');
    const token_parent     = generateSignatureToken(id, 'parent');
    const token_entreprise = generateSignatureToken(id, 'entreprise');
    const token_prof       = generateSignatureToken(id, 'professeur');

    const pdf_path = await generateConventionPDF(req.body);

    await db.query(
      `INSERT INTO conventions (
        id, lycee_proviseur, lycee_email, lycee_adresse, lycee_tel, lycee_fax, lycee_site,
        eleve_prenom, eleve_nom, eleve_date_naissance, eleve_adresse, eleve_tel, eleve_email, eleve_classe,
        prof_principal_nom, prof_referent_email,
        entreprise_nom, entreprise_siret, entreprise_code_naf, entreprise_assurance_rc,
        entreprise_adresse, entreprise_tel, entreprise_email,
        entreprise_tuteur_nom, entreprise_tuteur_fonction, entreprise_tuteur_tel,
        cpam, securite_sociale,
        transport_lycee, transport_stage,
        restauration, restauration_preciser,
        hebergement, hebergement_preciser,
        date_debut_stage, date_fin_stage, lieu_stage,
        horaires_stage,
        token_eleve, token_parent, token_entreprise, token_prof,
        pdf_path
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13, $14,
        $15, $16,
        $17, $18, $19, $20,
        $21, $22, $23,
        $24, $25, $26,
        $27, $28,
        $29, $30,
        $31, $32,
        $33, $34,
        $35, $36, $37,
        $38,
        $39, $40, $41, $42,
        $43
      )`,
      [
        id,
        lycee_proviseur, lycee_email, lycee_adresse, lycee_tel, lycee_fax, lycee_site,
        eleve_prenom, eleve_nom, eleve_date_naissance, eleve_adresse, eleve_tel, eleve_email, eleve_classe,
        prof_principal_nom, prof_referent_email,
        entreprise_nom, entreprise_siret, entreprise_code_naf, entreprise_assurance_rc,
        entreprise_adresse, entreprise_tel, entreprise_email,
        entreprise_tuteur_nom, entreprise_tuteur_fonction, entreprise_tuteur_tel,
        cpam, securite_sociale,
        transport_lycee, transport_stage,
        restauration, restauration_preciser,
        hebergement, hebergement_preciser,
        date_debut_stage, date_fin_stage, lieu_stage,
        horaires_stage,
        token_eleve, token_parent, token_entreprise, token_prof,
        pdf_path
      ]
    );

    const base = process.env.BACKEND_URL || 'http://localhost:7000';
    const links = {
      eleve:      `${base}/api/signatures/${token_eleve}`,
      parent:     `${base}/api/signatures/${token_parent}`,
      entreprise: `${base}/api/signatures/${token_entreprise}`,
      professeur: `${base}/api/signatures/${token_prof}`
    };

    res.status(201).json({
      message: 'Convention créée avec succès.',
      id,
      pdf_path,
      links
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la convention.' });
  }
};
