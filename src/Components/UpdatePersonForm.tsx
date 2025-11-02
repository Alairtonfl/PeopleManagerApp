import { useEffect, useState } from "react";
import Loading from "./Loading";
import { usePerson } from "../Contexts/PersonContext";

interface UpdatePersonFormProps {
  personId: number;
  onClose: () => void;
}

export default function UpdatePersonForm({
  personId,
  onClose,
}: UpdatePersonFormProps) {
  const { updatePerson, getPersonById } = usePerson();
  const [name, setName] = useState("");
  const [gender, setGender] = useState<number | null>();
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [naturality, setNaturality] = useState("");
  const [nationality, setNationality] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // 🔹 Carrega os dados da pessoa ao abrir o modal
  useEffect(() => {
    const loadPerson = async () => {
      try {
        const person = await getPersonById(personId);
        if (person) {
          setName(person.name || "");
          setGender(person.gender || null);
          setCpf(person.cpf || "");
          setBirthDate(person.birthDate?.split("T")[0] || "");
          setEmail(person.email || "");
          setNaturality(person.naturality || "");
          setNationality(person.nationality || "");
        } else {
          setError("Erro ao carregar dados da pessoa.");
        }
      } catch (err) {
        setError("Erro ao carregar dados da pessoa.");
      } finally {
        setInitialLoading(false);
      }
    };
    loadPerson();
  }, [personId]);

  // 🔹 Atualiza a pessoa
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setLoading(true);
    try {
      await updatePerson(personId, {
        name: name.trim(),
        gender,
        cpf: cpf.trim(),
        birthDate,
        email: email.trim() || null,
        naturality: naturality.trim() || null,
        nationality: nationality.trim() || null,
      });

      onClose();
    } catch (err: any) {
      setError(err.message || "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-white">
          <Loading /> Carregando dados...
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-xl shadow-lg w-full max-w-md text-white space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Editar Pessoa</h2>

        <div>
          <label className="block mb-1 font-medium">Nome</label>
          <input
            type="text"
            placeholder="Nome da pessoa"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Sexo</label>
          <select
            value={gender ?? ""}
            onChange={(e) => {
              const value =
                e.target.value === "" ? null : Number(e.target.value);
              setGender(value);
            }}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione</option>
            <option value={0}>Feminino</option>
            <option value={1}>Masculino</option>
            <option value={2}>Outro</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">CPF</label>
          <input
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Data de Nascimento</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">E-mail</label>
          <input
            type="email"
            placeholder="email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Naturalidade</label>
          <input
            type="text"
            placeholder="Cidade de nascimento"
            value={naturality}
            onChange={(e) => setNaturality(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Nacionalidade</label>
          <input
            type="text"
            placeholder="Ex: Brasileira"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            disabled={loading}
          >
            {loading && <Loading />}
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
