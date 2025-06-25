import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

export default function Accueil() {
  return (
    <>
      <Helmet>
        <title>E-Sign PRO | Signature de Conventions de Stage Simplifiée</title>
        <meta name="description" content="Dématérialisez et accélérez la signature de vos conventions de stage avec E-Sign PRO. Solution intuitive et sécurisée pour lycées professionnels, élèves, parents et entreprises." />
      </Helmet>
    <div className="text-center max-w-4xl mx-auto">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6 leading-tight">
        Dites adieu à la paperasse. <br /> Signez vos conventions de stage en un éclair !
      </h2>
      <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
        E-Sign PRO est la solution intuitive et sécurisée pour dématérialiser et simplifier la signature des conventions de stage des lycées professionnels. Une expérience fluide pour élèves, parents, entreprises et équipes pédagogiques.
      </p>

      {/* Section des fonctionnalités clés */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 mb-12">
        <div className="p-6 border rounded-2xl shadow-lg bg-white transform hover:scale-105 transition-transform duration-300">
          <div className="text-5xl mb-4">✨</div>
          <h3 className="font-bold text-xl text-blue-600 mb-2">Simplicité Révolutionnaire</h3>
          <p className="text-sm text-gray-600">
            Créez et signez vos conventions en quelques clics. Fini les formulaires complexes et les comptes à créer. Chaque signataire reçoit un lien unique et direct par e-mail.
          </p>
        </div>

        <div className="p-6 border rounded-2xl shadow-lg bg-white transform hover:scale-105 transition-transform duration-300">
          <div className="text-5xl mb-4">🔒</div>
          <h3 className="font-bold text-xl text-blue-600 mb-2">Sécurité et Confidentialité</h3>
          <p className="text-sm text-gray-600">
            Vos données sont protégées par des tokens JWT, des signatures hachées et une conformité RGPD stricte. Les PDF sont automatiquement supprimés de nos serveurs après envoi.
          </p>
        </div>

        <div className="p-6 border rounded-2xl shadow-lg bg-white transform hover:scale-105 transition-transform duration-300">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="font-bold text-xl text-blue-600 mb-2">Rapidité Inégalée</h3>
          <p className="text-sm text-gray-600">
            Accélérez le processus de signature. Le suivi en temps réel vous permet de visualiser qui a signé et qui est encore en attente, pour une transparence totale.
          </p>
        </div>
      </div>

      {/* Call to Action (Bouton pour le suivi) */}
      <div className="mt-12">
        <p className="text-xl text-gray-700 mb-6 font-semibold">
          Vous avez déjà une convention en cours ? Suivez son avancement en direct !
        </p>
        <Link
          to="/suivi/"
          className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-lg rounded-full shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105"
        >
          Accéder au Suivi de Convention
        </Link>
        <p className="mt-4 text-sm text-gray-500">
          (Vous serez invité à entrer l'ID ou le token de votre convention si celui-ci n'est pas déjà dans l'URL.)
        </p>
      </div>

    </div>
    </>
  );
}