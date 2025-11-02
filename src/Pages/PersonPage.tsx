import { useEffect, useState } from 'react';
import { usePerson } from '../Contexts/PersonContext';
import { Eye, Plus } from 'lucide-react';
import Navbar from '../Components/NavBar';
import AddPersonForm from '../Components/AddPersonForm';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { persons, loading, fetchPersons, createPerson, error, deletePerson, updatePerson } = usePerson();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddPersonOpen, setIsAddPersonOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPersons();
  }, []);

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddPersonModal = () => setIsAddPersonOpen(true);
  const closeAddPersonModal = () => setIsAddPersonOpen(false);

  return (
    <>
      <main className="p-6 max-w-7xl mx-auto text-white bg-slate-900 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Pessoas</h1>
          <button
            onClick={openAddPersonModal}
            title="Adicionar Pessoa"
            className="bg-blue-700 hover:bg-blue-800 p-2 rounded flex items-center justify-center"
          >
            <Plus size={24} className="text-white hover:text-gray-300 transition-colors" />
          </button>
        </div>

        {isAddPersonOpen && (
          <AddPersonForm onClose={closeAddPersonModal} />
        )}

        <input
          type="text"
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 px-4 py-2 border border-slate-600 rounded w-full max-w-sm bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
        />

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-slate-800">
              <th className="border border-slate-700 px-4 py-2 text-left">Nome</th>
              <th className="border border-slate-700 px-4 py-2 text-left">CPF</th>
              <th className="border border-slate-700 px-4 py-2 text-left">Data de Nascimento</th>
              <th className="border border-slate-700 px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>  
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4">Carregando...</td>
              </tr>
            ) : filteredPersons.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">Nenhuma pessoa encontrado.</td>
              </tr> 
            ) : (
              filteredPersons.map((person) => (
                <tr key={person.id} className="hover:bg-slate-700">
                  <td className="border border-slate-700 px-4 py-2">{person.name}</td>
                  <td className="border border-slate-700 px-4 py-2">{person.cpf}</td>
                  <td className="border border-slate-700 px-4 py-2">{new Date(person.birthDate).toLocaleDateString()}</td>
                  <td className="border border-slate-700 px-4 py-2">
                    <button
                      onClick={() => navigate(`/persons/${person.id}`)}
                      title="Ver Detalhes"
                      className="bg-green-600 hover:bg-green-700 p-2 rounded flex items-center justify-center"
                    >
                      <Eye size={20} className="text-white hover:text-gray-300 transition-colors" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </>
  );
}