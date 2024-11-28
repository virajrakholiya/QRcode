import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!url) {
      setError("URL is required");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/", { url });
      setQrCode(res.data.qrCode);
      
      console.log("QR Code data:", res.data.qrCode);
      
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          QR Generator<span className="text-emerald-400">.</span>
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your URL here..."
              className="flex-1 rounded-lg bg-gray-700 border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Generate →"}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}

          {qrCode && (
            <div className="mt-8 flex flex-col items-center">
              <img 
                src={qrCode} 
                alt="QR Code" 
                className="w-64 h-64 bg-white p-4 rounded-lg shadow-md"
              />
              <a 
                href={qrCode} 
                download="qrcode.png"
                className="mt-4 text-emerald-400 hover:text-emerald-300 font-medium"
              >
                Download QR Code
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;