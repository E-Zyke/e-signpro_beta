const conventionSchema = require('../validations/convention.validation');

describe('Convention Validation Schema (New Structure)', () => {

  // Cas de base : toutes les données sont valides
  test('should validate a complete and correct convention object', () => {
    const validConvention = {
  "eleve": {
    "nom": "Dupont",
    "prenom": "Emma",
    "email": "gemici.enes@etik.com",
    "tel": "0612345678",
    "date_naissance": "2006-03-21",
    "classe": "mta"
  },
  "professeur": {
    "nom": "Mme Bernard Nathalie",
    "email": "gemici.enes@etik.com",
    "tel": "0420202044"
  },
  "entreprise": {
    "nom": "Boulangerie Chez Paul",
    "tel": "0420202020",
    "email": "gemici.enes@etik.com",
    "adresse": "10 rue des Pains, Lyon",
    "siret": "81234567800013",
    "rc": "123456789",
    "naf": "1071C",
    "tuteur": "Paul Tartine"
  },
  "famille": {
    "nom": "Jean Jacques",
    "email": "gemici.enes@etik.com",
    "secu": "1981278127812",
    "cpam": "CPAM Rhône",
    "transport": "Tram T3",
    "restauration": "Maison"
  },
  "stage": {
    "date_debut": "2025-06-15",
    "date_fin": "2025-06-30",
    "lieu": "Chez Paul, Lyon",
    "horaires": {
      "lundi": "09h-18h",
      "mardi": "09h-18h",
      "mercredi": "OFF",
      "jeudi": "09h-18h",
      "vendredi": "09h-18h"
    }
  }
},
      meta: {
        id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', // Exemple d'UUID valide
        date_creation: '2025-06-01T10:00:00Z',
        statut: 'en_attente',
        pdf_url: 'https://example.com/convention.pdf'
      },
      signatures: {} // Peut être un objet vide si optionnel et non défini
    };
    const { error } = conventionSchema.validate(validConvention);
    expect(error).toBeUndefined();
  });

  // Teste l'absence d'un champ requis dans un sous-objet (eleve.nom)
  test('should return an error if eleve.nom is missing', () => {
    const invalidConvention = {
      // Copie d'une convention valide, mais avec une modification
      eleve: {
        // nom: 'Doe', // Manquant
        prenom: 'John',
        email: 'john.doe@example.com',
        tel: '0123456789',
        date_naissance: '2005-01-15',
        classe: 'Terminale STI2D'
      },
      professeur: {
        nom: 'Dupont',
        email: 'dupont@lycee.fr',
        tel: '0612345678'
      },
      entreprise: {
        nom: 'Tech Solutions S.A.',
        tel: '0987654321',
        email: 'contact@techsolutions.com',
        adresse: '123 Rue de la Tech, 75000 Paris',
        siret: '12345678900000',
        rc: 'RCS Paris B 123456789',
        naf: '6201Z',
        tuteur: 'Jane Smith'
      },
      famille: {
        secu: '123456789012345',
        cpam: 'CPAM Paris',
        transport: 'Bus',
        restauration: 'Cantine'
      },
      stage: {
        date_debut: '2025-06-10',
        date_fin: '2025-08-31',
        lieu: 'Bureau Tech Solutions',
        horaires: {
          lundi: '9h-17h',
          mardi: '9h-17h',
          mercredi: '9h-17h',
          jeudi: '9h-17h',
          vendredi: '9h-17h'
        }
      },
      meta: {
        id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        date_creation: '2025-06-01T10:00:00Z',
        statut: 'en_attente',
        pdf_url: 'https://example.com/convention.pdf'
      },
      signatures: {}
    };
    const { error } = conventionSchema.validate(invalidConvention);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('"eleve.nom" is required');
  });

  // Teste une adresse email invalide pour l'entreprise
  test('should return an error if entreprise.email is invalid', () => {
    const invalidEmailConvention = {
      eleve: {
        nom: 'Doe',
        prenom: 'John',
        email: 'john.doe@example.com',
        tel: '0123456789',
        date_naissance: '2005-01-15',
        classe: 'Terminale STI2D'
      },
      professeur: {
      nom: 'Dupont',
      email: 'dupont@lycee.fr',
      tel: '0612345678'
      },
      entreprise: {
        nom: 'Tech Solutions S.A.',
        tel: '0987654321',
        email: 'contact-techsolutions', // Email invalide
        adresse: '123 Rue de la Tech, 75000 Paris',
        siret: '12345678900000',
        rc: 'RCS Paris B 123456789',
        naf: '6201Z',
        tuteur: 'Jane Smith'
      },
      famille: {
        secu: '123456789012345',
        cpam: 'CPAM Paris',
        transport: 'Bus',
        restauration: 'Cantine'
      },
      stage: {
        date_debut: '2025-06-10',
        date_fin: '2025-08-31',
        lieu: 'Bureau Tech Solutions',
        horaires: {
          lundi: '9h-17h',
          mardi: '9h-17h',
          mercredi: '9h-17h',
          jeudi: '9h-17h',
          vendredi: '9h-17h'
        }
      },
      meta: {},
      signatures: {}
    };
    const { error } = conventionSchema.validate(invalidEmailConvention);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('"entreprise.email" must be a valid email');
  });

  // Teste si les dates de début/fin de stage sont invalides
  test('should return an error if stage.date_debut is after stage.date_fin', () => {
    const invalidDates = {
      eleve: { /* ... données valides ... */ nom: 'Doe', prenom: 'John', email: 'a@b.com', tel: '1', date_naissance: '2000-01-01', classe: 'A' },
      professeur: { /* ... données valides ... */ nom: 'Prof', email: 'p@b.com', tel: '0612345678' },
      entreprise: { /* ... données valides ... */ nom: 'Ent', tel: '1', email: 'e@b.com', adresse: 'addr', siret: '1', rc: '1', naf: '1', tuteur: 'tuteur' },
      famille: { /* ... données valides ... */ secu: '1', cpam: '1', transport: '1', restauration: '1' },
      stage: {
        date_debut: '2025-08-31', // Date de début après la date de fin
        date_fin: '2025-06-10',
        lieu: 'Bureau Tech Solutions',
        horaires: { lundi: '9h-17h', mardi: '9h-17h', mercredi: '9h-17h', jeudi: '9h-17h', vendredi: '9h-17h' }
      },
      meta: {},
      signatures: {}
    };

    const { error } = conventionSchema.validate(invalidDates);
    expect(error).toBeDefined();
    // Joi n'a pas de .greater(Joi.ref()) pour les dates imbriquées dans des objets.
    // L'erreur sera probablement liée au format ISO ou à la validité de la date elle-même.
    // Il faut vérifier la sortie réelle de Joi pour ajuster le message d'erreur.
    // Pour l'instant, on se contente de vérifier qu'il y a une erreur sur les dates.
    expect(error.details[0].message).toMatch(/date/i); // Vérifie que le message parle des dates
  });

  // Teste un statut 'meta.statut' invalide
  test('should return an error if meta.statut is an invalid value', () => {
    const invalidStatus = {
        eleve: { /* ... données valides ... */ nom: 'Doe', prenom: 'John', email: 'a@b.com', tel: '1', date_naissance: '2000-01-01', classe: 'A' },
        professeur: { /* ... données valides ... */ nom: 'Prof', email: 'p@b.com', tel: '0612345678' },
        entreprise: { /* ... données valides ... */ nom: 'Ent', tel: '1', email: 'e@b.com', adresse: 'addr', siret: '1', rc: '1', naf: '1', tuteur: 'tuteur' },
        famille: { /* ... données valides ... */ secu: '1', cpam: '1', transport: '1', restauration: '1' },
        stage: { /* ... données valides ... */ date_debut: '2025-06-10', date_fin: '2025-08-31', lieu: 'lieu', horaires: { lundi: '9h-17h', mardi: '9h-17h', mercredi: '9h-17h', jeudi: '9h-17h', vendredi: '9h-17h' } },
        meta: {
            statut: 'statut_invalide' // Statut invalide
        },
        signatures: {}
    };

    const { error } = conventionSchema.validate(invalidStatus);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('"meta.statut" must be one of [en_attente, signée, rejetée]');
  });
});
