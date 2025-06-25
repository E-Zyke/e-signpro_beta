import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Convention() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    eleve_nom: '',
    eleve_prenom: '',
    eleve_email: '',
    eleve_tel: '',
    eleve_date_naissance: '',
    eleve_classe: '',
    prof_nom: '',
    prof_email: '',
    prof_tel: '',

    entreprise_nom: '',
    entreprise_tel: '',
    entreprise_email: '',
    entreprise_adresse: '',
    entreprise_siret: '',
    entreprise_rc: '',
    entreprise_naf: '',
    entreprise_tuteur: '',

    famille_secu: '',
    famille_cpam: '',
    famille_transport: '',
    famille_restauration: '',

    date_debut_stage: '',
    date_fin_stage: '',
    lieu_stage: '',

    horaires_lundi: '',
    horaires_mardi: '',
    horaires_mercredi: '',
    horaires_jeudi: '',
    horaires_vendredi: '',

    showRecap: false
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, showRecap: true });
  };

  const handleConfirm = () => {
    const dataToSend = { ...formData };
    delete dataToSend.showRecap;
    console.log("📦 Données envoyées :", dataToSend);
    alert("Formulaire validé et envoyé !");
  };

  const renderInput = (name, placeholder, type = 'text') => (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="border border-gray-300 rounded px-3 sm:px-4 py-2 sm:py-3 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      onChange={handleChange}
      value={formData[name]}
    />
  );

  const renderSection = (title, fields) => (
    <div className="bg-white border rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-700">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {fields.map(([name, label, type]) => (
          <div key={name} className="flex flex-col">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              {label}
            </label>
            {renderInput(name, label, type)}
          </div>
        ))}
      </div>
    </div>
  );

  const recapSection = (title, fields) => (
    <div className="bg-white border rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-700">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
        {fields.map(([key, label]) => (
          <div key={key} className="flex flex-col">
            <span className="font-medium text-gray-700 text-xs sm:text-sm">{label}</span>
            <span className="text-gray-900 text-sm sm:text-base">{formData[key] || '-'}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Page d'accueil avec le bouton
  if (!showForm) {
    return (
      <>
      <Helmet>
        <title>Suivi des Conventions de Stage | E-Sign PRO</title>
        <meta name="description" content="Vérifiez le statut de signature de vos conventions de stage en temps réel avec E-Sign PRO. Suivez chaque signataire (élève, famille, entreprise, professeur)." />
      </Helmet>
      <section className="max-w-6xl mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-blue-700">
            Convention de Stage
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
            <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">📄</div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
              Créez votre convention de stage en quelques minutes
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Notre formulaire simplifié vous guide étape par étape pour créer une convention 
              complète et conforme. Toutes les parties prenantes recevront automatiquement 
              leur lien de signature par email.
            </p>
          </div>
        </div>

        {/* Les 3 cartes responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">⚡</div>
            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">Rapide</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Formulaire en 5 sections, remplissage en moins de 10 minutes
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🔒</div>
            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">Sécurisé</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Liens de signature uniques et temporaires, conformité RGPD
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">📧</div>
            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">Automatique</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Envoi automatique des emails de signature à tous les signataires
            </p>
          </div>
        </div>

        {/* Bouton centré sous les cartes */}
        <div className="text-center">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-blue-600 text-white font-semibold text-base sm:text-lg rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto max-w-sm"
          >
            <span className="mr-2">✨</span>
            Créer ma convention
          </button>
        </div>
      </section>
      </>
    );
  }

  // Récapitulatif
  if (formData.showRecap) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">Récapitulatif de la Convention</h1>
          <button
            onClick={() => setShowForm(false)}
            className="text-gray-500 hover:text-gray-700 text-sm sm:text-base self-start sm:self-auto"
          >
            ← Retour à l'accueil
          </button>
        </div>

        {recapSection('Informations Élève', [
          ['eleve_nom', 'Nom'], 
          ['eleve_prenom', 'Prénom'], 
          ['eleve_email', 'Email'], 
          ['eleve_tel', 'Téléphone'], 
          ['eleve_date_naissance', 'Date de naissance'], 
          ['eleve_classe', 'Classe']
        ])}

        {recapSection('Professeur Référent', [
          ['prof_nom', 'Nom'], 
          ['prof_email', 'Email'], 
          ['prof_tel', 'Téléphone']
        ])}

        {recapSection('Informations Entreprise', [
          ['entreprise_nom', 'Nom'], 
          ['entreprise_tel', 'Téléphone'], 
          ['entreprise_email', 'Email'], 
          ['entreprise_adresse', 'Adresse'], 
          ['entreprise_siret', 'SIRET'], 
          ['entreprise_rc', 'Assurance RC'], 
          ['entreprise_naf', 'Code NAF'], 
          ['entreprise_tuteur', 'Maître de stage']
        ])}

        {recapSection('Informations Famille', [
          ['famille_email', 'Email parent / tuteur', 'email'],
          ['famille_secu', 'N° de sécurité sociale'], 
          ['famille_cpam', 'CPAM'], 
          ['famille_transport', 'Transport'], 
          ['famille_restauration', 'Restauration']
        ])}

        {recapSection('Informations Stage', [
          ['date_debut_stage', 'Date de début'], 
          ['date_fin_stage', 'Date de fin'], 
          ['lieu_stage', 'Lieu du stage'], 
          ['horaires_lundi', 'Horaires Lundi'], 
          ['horaires_mardi', 'Horaires Mardi'], 
          ['horaires_mercredi', 'Horaires Mercredi'], 
          ['horaires_jeudi', 'Horaires Jeudi'], 
          ['horaires_vendredi', 'Horaires Vendredi']
        ])}

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button 
            onClick={() => setFormData({ ...formData, showRecap: false })} 
            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors text-sm sm:text-base"
          >
            ← Modifier
          </button>
          <button 
            onClick={handleConfirm} 
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Confirmer et envoyer
          </button>
        </div>
      </section>
    );
  }

  // Formulaire
  return (
    <section className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Créer une Convention de Stage</h1>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-500 hover:text-gray-700 text-sm sm:text-base self-start sm:self-auto"
        >
          ← Retour à l'accueil
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {renderSection('Informations Élève', [
          ['eleve_nom', 'Nom'], 
          ['eleve_prenom', 'Prénom'], 
          ['eleve_email', 'Email', 'email'], 
          ['eleve_tel', 'Téléphone'], 
          ['eleve_date_naissance', 'Date de naissance', 'date'], 
          ['eleve_classe', 'Classe']
        ])}

        {renderSection('Professeur référent', [
          ['prof_nom', 'Nom du professeur'], 
          ['prof_email', 'Email du professeur', 'email'], 
          ['prof_tel', 'Téléphone du professeur']
        ])}

        {renderSection('Informations Entreprise', [
          ['entreprise_nom', 'Nom de l\'entreprise'], 
          ['entreprise_tel', 'Téléphone'], 
          ['entreprise_email', 'Email', 'email'], 
          ['entreprise_adresse', 'Adresse'], 
          ['entreprise_siret', 'N° SIRET / SIREN'], 
          ['entreprise_rc', 'Nom de l\'assurance RC'], 
          ['entreprise_naf', 'Code NAF'], 
          ['entreprise_tuteur', 'Maître de stage']
        ])}

        {renderSection('Famille', [
          ['famille_email', 'Email parent / tuteur', 'email'],
          ['famille_secu', 'N° de sécurité sociale'], 
          ['famille_cpam', 'CPAM'], 
          ['famille_transport', 'Moyen de transport'], 
          ['famille_restauration', 'Restauration (lieu)']
        ])}

        {renderSection('Informations sur le Stage', [
          ['date_debut_stage', 'Date de début', 'date'], 
          ['date_fin_stage', 'Date de fin', 'date'], 
          ['lieu_stage', 'Lieu du stage'],
          ['horaires_lundi', 'Horaires Lundi'], 
          ['horaires_mardi', 'Horaires Mardi'], 
          ['horaires_mercredi', 'Horaires Mercredi'], 
          ['horaires_jeudi', 'Horaires Jeudi'], 
          ['horaires_vendredi', 'Horaires Vendredi']
        ])}

        <button 
          type="submit" 
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Aperçu avant validation
        </button>
      </form>
    </section>
  );
}
