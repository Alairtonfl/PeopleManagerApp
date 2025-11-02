import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import AddPersonForm from "../Components/AddPersonForm.tsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAddPersonOpen, setIsAddPersonOpen] = useState(false);

  const openAddPersonModal = () => setIsAddPersonOpen(true);
  const closeAddPersonModal = () => setIsAddPersonOpen(false);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // remove tudo que não for número
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(value);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(cpf, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 rounded-3xl shadow-lg max-w-md w-full p-10 text-white">
        <h1 className="text-3xl font-bold text-center mb-8">
          Bem-vindo(a) de volta!
        </h1>

        {error && (
          <div className="mb-4 text-red-500 font-semibold text-center">
            {error}
          </div>
        )}

        {isAddPersonOpen && <AddPersonForm onClose={closeAddPersonModal} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cpf" className="block mb-2 font-semibold">
              CPF
            </label>
            <input
              id="cpf"
              type="text"
              inputMode="numeric"
              maxLength={14}
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleCpfChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 
                      placeholder-slate-400 text-white focus:outline-none 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      transition duration-150 ease-in-out shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-semibold">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-700 border border-slate-600 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white 
             bg-gradient-to-r from-blue-600 to-blue-700 
             hover:from-blue-700 hover:to-blue-800 
             focus:outline-none focus:ring-4 focus:ring-blue-300 
             disabled:opacity-50 disabled:cursor-not-allowed 
             transition-all duration-200 ease-in-out shadow-md"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={openAddPersonModal}
            className="w-full py-3 rounded-xl font-semibold text-blue-700 
             bg-white border border-blue-700 
             hover:bg-blue-50 hover:border-blue-800 
             focus:outline-none focus:ring-4 focus:ring-blue-200 
             disabled:opacity-50 disabled:cursor-not-allowed 
             transition-all duration-200 ease-in-out shadow-sm mt-3"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
