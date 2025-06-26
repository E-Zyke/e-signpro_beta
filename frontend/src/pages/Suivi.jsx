import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Suivi() {
  const { id } = useParams();
  const [convention, setConvention] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState(id || '');
  const [error, setError] = useState(null);

  const fetchConvention = async (conventionId) => { 
    if (!conventionId || !conventionId.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/conventions/${conventionId}/status`);

      setConvention(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération du statut :", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la récupération de la convention.');
      setConvention(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchConvention(id);
      setSearchId(id); // Initialise la barre de recherche avec l'ID de l'URL
    }
  }, [id]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchConvention(searchId); // Lancez la recherche avec l'ID de l'input
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const roleLabels = {
    eleve: 'Élève',
    famille: 'Famille',
    entreprise: 'Entreprise',
    professeur: 'Professeur',
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-6 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Suivi des signatures
      </h1>

      {/* Barre de recherche responsive */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)} 
            placeholder="Entrez l'ID de la convention..." 
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            {loading ? 'En cours de recherche...' : 'Rechercher'}
          </button>
        </div>
      </form>

      {/* Affichage des erreurs */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm sm:text-base">{error}</p>
        </div>
      )}

      {/* Affichage de l'ID recherché */}
      {searchId && !error && (
        <p className="mb-6 text-center text-gray-600 text-sm sm:text-base break-all">
          ID de votre Convention: <span className="font-mono text-blue-700">{searchId}</span>
        </p>
      )}

      {/* Affichage des résultats */}
      {loading && (
        <p className="text-center mt-12 text-sm sm:text-base">Chargement du suivi...</p>
      )}

      {convention && !loading && (
        <div className="space-y-4">
          <p className="mb-4 text-center text-gray-800 font-semibold">
            Statut global de la convention: <span className="text-blue-700">{convention.statutGlobal}</span>
          </p>

          {/* Version mobile : cartes empilées */}
          <div className="block sm:hidden space-y-4">
            {Object.entries(roleLabels).map(([role, label]) => {
              const signature = convention.signatures?.[role]; // Accès aux données de signature
              const isSigned = signature?.signed; // Utiliser la propriété 'signed'
              const signataireInfo = convention.signatairesInfo?.[role];
              const nomComplet = signataireInfo ? `${signataireInfo.nom || ''} ${signataireInfo.prenom || ''}`.trim() : '';

              return (
                <div
                  key={role}
                  className={`p-4 rounded-lg border ${
                    isSigned ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-lg">
                      {label}
                      {nomComplet && ` (${nomComplet})`}
                    </span>
                    <span className={`text-sm font-medium ${
                      isSigned ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {isSigned ? '✔ Signé' : '⏳ En attente'}
                    </span>
                  </div>

                  {isSigned && (
                    <div className="text-xs text-gray-600 space-y-1">
                      <p><strong>Date :</strong> {formatDate(signature.date)}</p>
                      {signature.ip && (
                        <p><strong>IP :</strong> {signature.ip}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Version desktop : tableau */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Signataire
                  </th> {/* Nouvelle colonne pour le nom */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Date de signature
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(roleLabels).map(([role, label]) => {
                  const signature = convention.signatures?.[role];
                  const isSigned = signature?.signed;
                  const signataireInfo = convention.signatairesInfo?.[role];
                  const nomComplet = signataireInfo ? `${signataireInfo.nom || ''} ${signataireInfo.prenom || ''}`.trim() : '';

                  return (
                    <tr key={role} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {label}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {nomComplet || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          isSigned
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {isSigned ? '✔ Signé' : '⏳ En attente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {isSigned ? formatDate(signature.date) : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}