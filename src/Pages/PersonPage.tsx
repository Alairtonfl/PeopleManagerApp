import { useEffect, useState } from 'react';
import { usePerson } from '../Contexts/PersonContext';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import AddPersonForm from '../Components/AddPersonForm';
import { useNavigate } from 'react-router-dom';
import UpdatePersonForm from '../Components/UpdatePersonForm';

export default function Dashboard() {
  const { persons, loading, fetchPersons, createPerson, error, deletePerson, updatePerson } = usePerson();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddPersonOpen, setIsAddPersonOpen] = useState(false);

  useEffect(() => {
    fetchPersons();
  }, []);

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function genderNumberToString(gender: number): string {
  switch (gender) {
    case 0:
      return "Feminino";
    case 1:
      return "Masculino";
    case 2:
      return "Outro";
    default:
      return "";
  }
}
  const openAddPersonModal = () => setIsAddPersonOpen(true);
  const closeAddPersonModal = () => setIsAddPersonOpen(false);
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  
  const handleEdit = (id: number) => {
    setSelectedPersonId(id);
    setShowUpdateModal(true);
  };const [showUpdateModal, setShowUpdateModal] = useState(false);

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
              <th className="border border-slate-700 px-4 py-2 text-left">Sexo</th>
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
                  <td className="border border-slate-700 px-4 py-2">{genderNumberToString(person.gender)}</td>
                  <td className="border border-slate-700 px-4 py-2">
                  <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(person.id)}
                        title="Editar"
                        className="bg-green-600 hover:bg-green-700 p-2 rounded flex items-center justify-center transition-colors"
                        >
                        <Pencil size={20} className="text-white hover:text-gray-300" />
                      </button>
                      <button
                        onClick={() => deletePerson(person.id)}
                        title="Excluir"
                        className="bg-red-600 hover:bg-red-700 p-2 rounded flex items-center justify-center transition-colors"
                      >
                        <Trash2 size={20} className="text-white hover:text-gray-300" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
            {showUpdateModal && selectedPersonId && (
            <UpdatePersonForm
              personId={selectedPersonId}
              onClose={() => setShowUpdateModal(false)}
            />
          )}
      </main>
    </>
  );
}