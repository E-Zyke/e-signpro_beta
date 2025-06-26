const Joi = require('joi');

const horairesSchema = Joi.object({
  lundi: Joi.string().required(),
  mardi: Joi.string().required(),
  mercredi: Joi.string().required(),
  jeudi: Joi.string().required(),
  vendredi: Joi.string().required()
});

const conventionSchema = Joi.object({
  eleve: Joi.object({
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    email: Joi.string().email().required(),
    tel: Joi.string().required(),
    date_naissance: Joi.date().iso().required(),
    classe: Joi.string().required()
  }).required(),

  professeur: Joi.object({
    nom: Joi.string().required(),
    email: Joi.string().email().required(),
    tel: Joi.string().required()
  }).required(),

  entreprise: Joi.object({
    nom: Joi.string().required(),
    tel: Joi.string().required(),
    email: Joi.string().email().required(),
    adresse: Joi.string().required(),
    siret: Joi.string().required(),
    rc: Joi.string().required(),
    naf: Joi.string().required(),
    tuteur: Joi.string().required()
  }).required(),

  famille: Joi.object({
    nom: Joi.string().required(),
    email: Joi.string().email().required(),
    secu: Joi.string().required(),
    cpam: Joi.string().required(),
    transport: Joi.string().required(),
    restauration: Joi.string().required()
  }).required(),

  stage: Joi.object({
    date_debut: Joi.date().iso().required(),
    date_fin: Joi.date().iso().greater(Joi.ref('date_debut')).required(),
    lieu: Joi.string().required(),
    horaires: horairesSchema.required()
  }).required(),

  meta: Joi.object({
    id: Joi.string().optional(),
    date_creation: Joi.date().optional(),
    tokens: Joi.object({
      eleve: Joi.string(),
      famille: Joi.string(),
      entreprise: Joi.string(),
      ecole: Joi.string()
    }).optional(),
    statut: Joi.string().valid('en_attente', 'signée', 'rejetée').optional(),
    pdf_url: Joi.string().uri().optional()
  }).optional(),

  signatures: Joi.object().optional()
});

module.exports = conventionSchema;
