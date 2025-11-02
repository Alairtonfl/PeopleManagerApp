import { useEffect, useState } from "react";
import { usePerson } from "../Contexts/PersonContext";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import AddPersonForm from "../Components/AddPersonForm";
import { useNavigate } from "react-router-dom";
import UpdatePersonForm from "../Components/UpdatePersonForm";
import React from "react";
import AddPersonFormV2 from "../Components/AddPersonFormV2";

export default function Dashboard() {
  const {
    persons,
    loading,
    fetchPersons,
    createPerson,
    error,
    deletePerson,
    updatePerson,
  } = usePerson();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPersonOpen, setIsAddPersonOpen] = useState(false);
  const [isAddPersonV2Open, setIsAddPersonV2Open] = useState(false);

  useEffect(() => {
    fetchPersons();
  }, []);

  const filteredPersons = persons.filter((person) =>
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

  const openAddPersonModalV2 = () => setIsAddPersonV2Open(true);
  const closeAddPersonModalV2 = () => setIsAddPersonV2Open(false);

  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleExpanded = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleEdit = (id: number) => {
    setSelectedPersonId(id);
    setShowUpdateModal(true);
  };
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <>
      <main className="p-6 max-w-7xl mx-auto text-white bg-slate-900 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Pessoas</h1>
          <div className="flex gap-2">
            <button
              onClick={openAddPersonModal}
              title="Adicionar Pessoa"
              className="bg-blue-700 hover:bg-blue-800 p-2 rounded flex items-center justify-center"
            >
              Cadastrar v1
            </button>
            <button
              onClick={openAddPersonModalV2}
              title="Adicionar Pessoa"
              className="bg-blue-700 hover:bg-blue-800 p-2 rounded flex items-center justify-center"
            >
              Cadastrar v2
            </button>
          </div>
        </div>

        {isAddPersonOpen && <AddPersonForm onClose={closeAddPersonModal} />}
        {isAddPersonV2Open && <AddPersonFormV2 onClose={closeAddPersonModalV2} />}

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
              <th className="border border-slate-700 px-4 py-2 text-left">
                Nome
              </th>
              <th className="border border-slate-700 px-4 py-2 text-left">
                CPF
              </th>
              <th className="border border-slate-700 px-4 py-2 text-left">
                Nascimento
              </th>
              <th className="border border-slate-700 px-4 py-2 text-left">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredPersons.map((person: any) => (
              <React.Fragment key={person.id}>
                <tr
                  onClick={() => toggleExpanded(person.id)}
                  className={`cursor-pointer hover:bg-slate-700 transition ${
                    expandedRow === person.id ? "bg-slate-800" : ""
                  }`}
                >
                  <td className="border border-slate-700 px-4 py-2">
                    {person.name}
                  </td>
                  <td className="border border-slate-700 px-4 py-2">
                    {person.cpf}
                  </td>
                  <td className="border border-slate-700 px-4 py-2">
                    {new Date(person.birthDate).toLocaleDateString()}
                  </td>
                  <td className="border border-slate-700 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(person.id);
                        }}
                        title="Editar"
                        className="bg-green-600 hover:bg-green-700 p-2 rounded flex items-center justify-center transition-colors"
                      >
                        <Pencil size={18} className="text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePerson(person.id);
                        }}
                        title="Excluir"
                        className="bg-red-600 hover:bg-red-700 p-2 rounded flex items-center justify-center transition-colors"
                      >
                        <Trash2 size={18} className="text-white" />
                      </button>
                    </div>
                  </td>
                </tr>

                {expandedRow === person.id && (
                  <tr className="bg-slate-900 text-sm">
                    <td colSpan={5} className="p-4 border border-slate-700">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <p>
                          <strong>Email:</strong> {person.email || "-"}
                        </p>
                        <p>
                          <strong>Nacionalidade:</strong>{" "}
                          {person.nationality || "-"}
                        </p>
                        <p>
                          <strong>Naturalidade:</strong>{" "}
                          {person.naturality || "-"}
                        </p>
                        <p>
                          <strong>Endereço:</strong> {person.address || "-"}
                        </p>
                        <p>
                          <strong>Sexo:</strong>{" "}
                          {genderNumberToString(person.gender)}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
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
