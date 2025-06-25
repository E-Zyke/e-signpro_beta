
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
    <Helmet>
      <title>Page Non Trouvée | E-Sign PRO</title>
      <meta name="description" content="La page que vous recherchez n'existe pas. Retournez à l'accueil pour continuer." />
    </Helmet>
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-12"> 
        <h1 className="text-6xl sm:text-7xl font-extrabold text-blue-700 mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
          Oups ! Page non trouvée.
        </h2>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
          La page que vous recherchez semble introuvable. Il se peut qu'elle ait été déplacée ou supprimée.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
        >
          Retourner à l'accueil
        </Link>
      </div>
    </Layout>
    </>
  );
}
