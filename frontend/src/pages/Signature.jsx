import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from 'react-helmet-async';

export default function Signature() {
  const { id } = useParams();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [conventionId, setConventionId] = useState(null);
  const [signerRole, setSignerRole] = useState(null);

  useEffect(() => {
    const decodeJwt = (token) => {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(atob(base64));
        return decodedPayload;
      } catch (e) {
        console.error("Erreur lors du décodage du JWT :", e);
        return null;
      }
    };

    if (id) {
      const decodedInfo = decodeJwt(id);
      if (decodedInfo) {
        setConventionId(decodedInfo.id_convention);
        setSignerRole(decodedInfo.role);
      }

      const sign = async () => {
        try {
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signatures/${id}`, {}, {
            headers: {
              "User-Agent": navigator.userAgent,
            }
          });
          setStatus("success");
          setMessage(res.data.message);
        } catch (err) {
          console.error("Erreur lors de la signature :", err);
          setStatus("error");
          setMessage(err.response?.data?.error || "Une erreur est survenue lors de la signature. Le lien est peut-être invalide ou expiré.");
        }
      };
      sign();
    } else {
      setStatus("error");
      setMessage("Lien de signature invalide ou manquant.");
    }
  }, [id]);

  return (
    <>
    <Helmet>
      <title>Page de Signature | E-Sign PRO</title>
      <meta name="description" content="Signez votre convention de stage en ligne de manière sécurisée." />
    </Helmet>
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-xl text-center bg-white p-6 rounded-2xl shadow">
        {status === "pending" && (
          <div className="flex flex-col items-center">
            <p className="text-blue-500 text-lg mb-2">Signature en cours...</p>
            {conventionId && <p className="text-gray-600 text-sm">Convention ID: <span className="font-mono">{conventionId}</span></p>}
            {signerRole && <p className="text-gray-600 text-sm">Rôle: <span className="font-semibold">{signerRole}</span></p>}
            <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin mt-4"></div>
          </div>
        )}
        {status === "success" && (
          <div className="text-green-600">
            <p className="text-xl font-semibold mb-2">✔ {message}</p>
            {conventionId && <p className="text-sm">Convention ID: <span className="font-mono">{conventionId}</span></p>}
            {signerRole && <p className="text-sm">Rôle: <span className="font-semibold">{signerRole}</span></p>}
            <p className="text-sm mt-4">Vous pouvez fermer cette page.</p>
          </div>
        )}
        {status === "error" && (
          <div className="text-red-600">
            <p className="text-xl font-semibold mb-2">❌ Erreur de signature</p>
            <p className="text-sm mb-4">{message}</p>
            {conventionId && <p className="text-sm">Convention ID: <span className="font-mono">{conventionId}</span></p>}
            {signerRole && <p className="text-sm">Rôle: <span className="font-semibold">{signerRole}</span></p>}
            <p className="text-sm mt-4">Veuillez vérifier votre lien ou contacter l'établissement.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
