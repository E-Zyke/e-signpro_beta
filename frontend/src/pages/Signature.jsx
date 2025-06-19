import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Signature() {
  const { token } = useParams();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const sign = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signatures/${token}`, {}, {
          headers: {
            "User-Agent": navigator.userAgent,
          }
        });
        setStatus("success");
        setMessage(res.data.message);
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("Erreur lors de la signature : token invaltokene ou expiré.");
      }
    };
    sign();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-xl text-center bg-white p-6 rounded-2xl shadow">
        {status === "pending" && (
          <div className="flex flex-col items-center">
            <p className="text-blue-500 text-lg mb-2">Signature en cours...</p>
            <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        )}
        {status === "success" && <p className="text-green-600 text-xl font-semibold">{message}</p>}
        {status === "error" && <p className="text-red-600 text-xl font-semibold">{message}</p>}
      </div>
    </div>
  );
}
