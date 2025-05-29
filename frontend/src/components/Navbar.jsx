import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-700 hover:text-blue-800">
        E‑SIGN PRO
      </Link>
      <div className="space-x-4 text-sm">
        <Link to="/">Accueil</Link>
        <Link to="/convention">Convention</Link>
        <Link to="/suivi/token-demo">Suivi</Link>
      </div>
    </nav>
  );
}
