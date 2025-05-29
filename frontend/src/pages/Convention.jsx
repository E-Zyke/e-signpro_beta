import { useState } from 'react';

export default function Convention() {
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
    alert("Formulaire validé et prêt à être envoyé !");
  };

  const renderInput = (name, placeholder, type = 'text') => (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleChange}
    />
  );

  const renderSection = (title, fields) => (
    <div className="bg-white border rounded-lg shadow p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {fields.map(([name, label, type]) => renderInput(name, label, type))}
      </div>
    </div>
  );

  const recapSection = (title, fields) => (
    <div className="bg-white border rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3 text-blue-700">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        {fields.map(([key, label]) => (
          <div key={key} className="flex flex-col">
            <span className="font-medium text-gray-700">{label}</span>
            <span className="text-gray-900">{formData[key] || '-'}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (formData.showRecap) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Récapitulatif de la Convention</h1>

        {recapSection('Informations Élève', [
          ['eleve_nom', 'Nom'], ['eleve_prenom', 'Prénom'], ['eleve_email', 'Email'], ['eleve_tel', 'Téléphone'], ['eleve_date_naissance', 'Date de naissance'], ['eleve_classe', 'Classe']
        ])}

        {recapSection('Professeur Référent', [
          ['prof_nom', 'Nom'], ['prof_email', 'Email'], ['prof_tel', 'Téléphone']
        ])}

        {recapSection('Informations Entreprise', [
          ['entreprise_nom', 'Nom'], ['entreprise_tel', 'Téléphone'], ['entreprise_email', 'Email'], ['entreprise_adresse', 'Adresse'], ['entreprise_siret', 'SIRET'], ['entreprise_rc', 'Assurance RC'], ['entreprise_naf', 'Code NAF'], ['entreprise_tuteur', 'Maître de stage']
        ])}

        {recapSection('Informations Famille', [
          ['famille_secu', 'N° de sécurité sociale'], ['famille_cpam', 'CPAM'], ['famille_transport', 'Transport'], ['famille_restauration', 'Restauration']
        ])}

        {recapSection('Informations Stage', [
          ['date_debut_stage', 'Date de début'], ['date_fin_stage', 'Date de fin'], ['lieu_stage', 'Lieu du stage'], ['horaires_lundi', 'Horaires Lundi'], ['horaires_mardi', 'Horaires Mardi'], ['horaires_mercredi', 'Horaires Mercredi'], ['horaires_jeudi', 'Horaires Jeudi'], ['horaires_vendredi', 'Horaires Vendredi']
        ])}

        <div className="mt-6 flex gap-4">
          <button onClick={() => setFormData({ ...formData, showRecap: false })} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Retour</button>
          <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Confirmer et envoyer</button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Créer une Convention de Stage</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {renderSection('Informations Élève', [
          ['eleve_nom', 'Nom'], ['eleve_prenom', 'Prénom'], ['eleve_email', 'Email', 'email'], ['eleve_tel', 'Téléphone'], ['eleve_date_naissance', 'Date de naissance', 'date'], ['eleve_classe', 'Classe']
        ])}

        {renderSection('Professeur référent', [
          ['prof_nom', 'Nom du professeur'], ['prof_email', 'Email du professeur', 'email'] , ['prof_tel', 'Téléphone du professeur']
        ])}

        {renderSection('Informations Entreprise', [
          ['entreprise_nom', 'Nom de l’entreprise'], ['entreprise_tel', 'Téléphone'], ['entreprise_email', 'Email'], ['entreprise_adresse', 'Adresse'], ['entreprise_siret', 'N° SIRET / SIREN'], ['entreprise_rc', 'Nom de l’assurance RC'], ['entreprise_naf', 'Code NAF'], ['entreprise_tuteur', 'Maître de stage']
        ])}

        {renderSection('Famille', [
          ['famille_secu', 'N° de sécurité sociale'], ['famille_cpam', 'CPAM'], ['famille_transport', 'Moyen de transport'], ['famille_restauration', 'Restauration (lieu)']
        ])}

        {renderSection('Informations sur le Stage', [
          ['date_debut_stage', 'Date de début', 'date'], ['date_fin_stage', 'Date de fin', 'date'], ['lieu_stage', 'Lieu du stage'],
          ['horaires_lundi', 'Horaires Lundi'], ['horaires_mardi', 'Horaires Mardi'], ['horaires_mercredi', 'Horaires Mercredi'], ['horaires_jeudi', 'Horaires Jeudi'], ['horaires_vendredi', 'Horaires Vendredi']
        ])}

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Aperçu avant validation
        </button>
      </form>
    </section>
  );
}
