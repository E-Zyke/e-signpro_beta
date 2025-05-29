export default function RGPD() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Politique de confidentialité & RGPD</h1>

      <p className="mb-4 text-gray-700">
        Nous attachons une grande importance à la protection de vos données personnelles. Ce service respecte le
        Règlement Général sur la Protection des Données (RGPD) en vigueur au sein de l’Union Européenne.
      </p>

      <ul className="list-disc list-inside space-y-2 text-gray-800">
        <li>✅ Les données collectées sont strictement nécessaires à l’établissement.</li>
        <li>🔐 Toutes les informations sont stockées de manière sécurisée et chiffrée.</li>
        <li>🕓 Les données sont conservées pour une durée maximale de 3 ans sauf obligation légale contraire.</li>
        <li>🧾 Vous pouvez à tout moment exercer vos droits : accès, rectification, suppression de vos données.</li>
        <li>📧 Contact : <a href="mailto:contact@esignpro.fr" className="text-blue-600 underline"></a></li>
      </ul>

      <p className="mt-6 text-sm text-gray-500">
        Pour plus d’informations, consultez le site de la CNIL : <a href="https://www.cnil.fr" className="underline text-blue-600">www.cnil.fr</a>
      </p>
    </section>
  );
}
