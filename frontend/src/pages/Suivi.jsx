import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Suivi() {
  const { token } = useParams();
  const [convention, setConvention] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation d’un appel au backend pour récupérer le statut de signature
    const mock = {
      eleve: true,
      famille: true,
      entreprise: false,
      ecole: false
    };
    setTimeout(() => {
      setConvention(mock);
      setLoading(false);
    }, 800);
  }, [token]);

  if (loading) {
    return <p className="text-center mt-12">Chargement du suivi...</p>;
  }

  return (
    <section className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Suivi des signatures</h1>
      <p className="mb-6 text-center text-gray-600">Convention liée au token : <span className="font-mono text-blue-700">{token}</span></p>

      <div className="grid grid-cols-1 gap-4">
        {Object.entries(convention).map(([role, signed]) => (
          <div key={role} className={`flex justify-between items-center px-4 py-3 rounded border ${signed ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
            <span className="capitalize font-medium">{role}</span>
            <span className={`text-sm ${signed ? 'text-green-700' : 'text-gray-500'}`}>{signed ? '✔ Signé' : '⏳ En attente'}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
