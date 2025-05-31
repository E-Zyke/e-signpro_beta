import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Convention from "./pages/Convention";
import Signature from "./pages/Signature";
import Suivi from "./pages/Suivi";
import TextesLegaux from "./pages/TextesLegaux";
import RGPD from "./pages/RGPD";
import Layout from "./components/Layout";


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Accueil />} />
        <Route path="/convention" element={<Convention />} />
        <Route path="/signature/:token" element={<Signature />} />
        <Route path="/suivi/:token" element={<Suivi />} />
        <Route path="/textes-legaux" element={<TextesLegaux />} />
        <Route path="/rgpd" element={<RGPD />} />
      </Route>
    </Routes>
  );
}