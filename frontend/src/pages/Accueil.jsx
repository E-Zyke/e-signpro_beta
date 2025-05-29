export default function Accueil() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold text-blue-700 mb-6">Bienvenue sur E‑SIGN PRO</h2>
      <p className="text-lg text-gray-700 mb-8">
        Générez, signez et suivez vos conventions de stage 100% en ligne.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div className="p-4 border rounded-xl shadow-sm">
          <div className="text-4xl mb-2">👌</div>
          <h3 className="font-bold text-lg">Facilité</h3>
          <p className="text-sm text-gray-600">Un formulaire simple, pas de compte à créer.</p>
        </div>

        <div className="p-4 border rounded-xl shadow-sm">
          <div className="text-4xl mb-2">🔒</div>
          <h3 className="font-bold text-lg">Sécurité</h3>
          <p className="text-sm text-gray-600">Signature numérique, RGPD, données protégées.</p>
        </div>

        <div className="p-4 border rounded-xl shadow-sm">
          <div className="text-4xl mb-2">⚡</div>
          <h3 className="font-bold text-lg">Rapidité</h3>
          <p className="text-sm text-gray-600">Chaque signataire reçoit son lien direct.</p>
        </div>
      </div>
    </div>
  );
}
