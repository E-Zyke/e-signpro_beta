import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Signature() {
  const { token } = useParams();
  const [signatureStatus, setSignatureStatus] = useState(null);

  const handleSignature = () => {
    // Simulation d'une signature avec fetch POST (à connecter plus tard au backend)
    console.log('🔏 Signature envoyée pour token :', token);
    setSignatureStatus('success');
  };



  return (
    <section className="max-w-2xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Signature de la Convention</h1>
      <p className="mb-6 text-gray-700">Clique sur le bouton ci-dessous pour valider ta signature électronique.</p>

      <button
        onClick={handleSignature}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Signer la convention
      </button>

      {signatureStatus === 'success' && (
        <p className="mt-6 text-green-700 font-semibold">✅ Signature effectuée avec succès !</p>
      )}
    </section>
  );
}
