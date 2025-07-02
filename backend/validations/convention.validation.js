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
    nom: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le nom doit contenir au moins 2 caractères',
      'string.max': 'Le nom ne doit pas dépasser 50 caractères'
    }),
    prenom: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le prénom doit contenir au moins 2 caractères',
      'string.max': 'Le prénom ne doit pas dépasser 50 caractères'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'L\'email doit être un email valide'
    }),
    tel: Joi.string().length(10).pattern(/^0[1-9][0-9]{8}$/).required().messages({
      'string.pattern.base': 'Le numéro de téléphone doit commencer par 0 et contenir 10 chiffres',
      'string.length': 'Le numéro de téléphone doit contenir exactement 10 chiffres'
    }),
    date_naissance: Joi.date().required().messages({
      'date.iso': 'La date de naissance doit être au format ISO'
    }),
    classe: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le nom de la classe doit contenir au moins 2 caractères',
      'string.max': 'Le nom de la classe ne doit pas dépasser 50 caractères'
    })
  }).required(),

  professeur: Joi.object({
    nom: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le nom du professeur doit contenir au moins 2 caractères',
      'string.max': 'Le nom du professeur ne doit pas dépasser 50 caractères'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'L\'email du professeur doit être un email valide'
    }),
    tel: Joi.string().length(10).pattern(/^0[1-9][0-9]{8}$/).required().messages({
      'string.pattern.base': 'Le numéro de téléphone du professeur doit commencer par 0 et contenir 10 chiffres',
      'string.length': 'Le numéro de téléphone du professeur doit contenir exactement 10 chiffres'
    })
  }).required(),

  entreprise: Joi.object({
    nom: Joi.string().min(2).max(100).required().messages({
      'string.min': 'Le nom de l\'entreprise doit contenir au moins 2 caractères',
      'string.max': 'Le nom de l\'entreprise ne doit pas dépasser 100 caractères'
    }),
    tel: Joi.string().length(10).pattern(/^0[1-9][0-9]{8}$/).required().messages({
      'string.pattern.base': 'Le numéro de téléphone de l\'entreprise doit commencer par 0 et contenir 10 chiffres',
      'string.length': 'Le numéro de téléphone de l\'entreprise doit contenir exactement 10 chiffres'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'L\'email de l\'entreprise doit être un email valide'
    }),
    adresse: Joi.string().min(5).max(200).required().messages({
      'string.min': 'L\'adresse doit contenir au moins 5 caractères',
      'string.max': 'L\'adresse ne doit pas dépasser 200 caractères'
    }),
    siret: Joi.string().length(14).pattern(/^[0-9]{14}$/).required().messages({
      'string.pattern.base': 'Le SIRET doit contenir uniquement des chiffres',
      'string.length': 'Le SIRET doit contenir exactement 14 chiffres'
    }),
    rc: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le numéro RC doit contenir au moins 2 caractères',
      'string.max': 'Le numéro RC ne doit pas dépasser 50 caractères'
    }),
    naf: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le code NAF doit contenir au moins 2 caractères',
      'string.max': 'Le code NAF ne doit pas dépasser 50 caractères'
    }),
    tuteur: Joi.string().min(2).max(100).required().messages({
      'string.min': 'Le nom du tuteur doit contenir au moins 2 caractères',
      'string.max': 'Le nom du tuteur ne doit pas dépasser 100 caractères'
    })
  }).required(),

  famille: Joi.object({
    nom: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le nom de la famille doit contenir au moins 2 caractères',
      'string.max': 'Le nom de la famille ne doit pas dépasser 50 caractères'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'L\'email de la famille doit être un email valide'
    }),
    secu: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le numéro de sécurité sociale doit contenir au moins 2 caractères',
      'string.max': 'Le numéro de sécurité sociale ne doit pas dépasser 50 caractères'
    }),
    cpam: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le numéro CPAM doit contenir au moins 2 caractères',
      'string.max': 'Le numéro CPAM ne doit pas dépasser 50 caractères'
    }),
    transport: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le mode de transport doit contenir au moins 2 caractères',
      'string.max': 'Le mode de transport ne doit pas dépasser 50 caractères'
    }),
    restauration: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le mode de restauration doit contenir au moins 2 caractères',
      'string.max': 'Le mode de restauration ne doit pas dépasser 50 caractères'
    })
  }).required(),

  stage: Joi.object({
    date_debut: Joi.date().required().messages({
      'date.iso': 'La date de début doit être au format ISO'
    }),
    date_fin: Joi.date().greater(Joi.ref('date_debut')).required().messages({
      'date.iso': 'La date de fin doit être au format ISO',
      'date.greater': 'La date de fin doit être postérieure à la date de début'
    }),
    lieu: Joi.string().min(2).max(100).required().messages({
      'string.min': 'Le lieu doit contenir au moins 2 caractères',
      'string.max': 'Le lieu ne doit pas dépasser 100 caractères'
    }),
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
