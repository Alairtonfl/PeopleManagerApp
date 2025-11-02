import React, { createContext, useState, useContext, ReactNode } from 'react';
import {
  Person,
  fetchPersons as fetchPersonsService,
  createPerson as createPersonService,
  updatePerson as updatePersonService,
  deletePerson as deletePersonService,
} from '../Services/PersonService';

interface PersonContextType {
  persons: Person[];
  loading: boolean;
  error: string | null;
  fetchPersons: () => Promise<void>;
  createPerson: (data: {     name: string, 
    gender: number, 
    cpf: string, 
    birthDate: string, 
    email?: string | null;
    naturality?: string | null,
    nationality?: string | null,
    password: string }) => Promise<Person | null>;
  updatePerson: (id: number, data: Partial<Person>) => Promise<Person | null>;
  deletePerson: (id: number) => Promise<boolean>;
}

const PersonContext = createContext<PersonContextType>({
  persons: [],
  loading: false,
  error: null,
  fetchPersons: async () => {},
  createPerson: async () => null,
  updatePerson: async () => null,
  deletePerson: async () => false
});

export const PersonProvider = ({ children }: { children: ReactNode }) => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPersons = async (
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchPersonsService();
      setPersons(res.data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar pessoas');
    } finally {
      setLoading(false);
    }
  };

  const createPerson = async (data: { 
    name: string, 
    gender: number, 
    cpf: string, 
    birthDate: string, 
    email?: string | null;
    naturality?: string | null,
    nationality?: string | null,
    password: string
 }): Promise<Person | null> => {
    setLoading(true);
    setError(null);
    try {
      const newPerson = await createPersonService(data);
      setPersons((prev) => [...prev, newPerson]);
      return newPerson;
    } catch (err: any) {
      const apiMessage = err.response?.data?.message || 'Erro ao criar pessoa';
      setError(apiMessage);
      throw new Error(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  const updatePerson = async (id: number, data: Partial<Person>): Promise<Person | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedPerson = await updatePersonService(id, data);
      setPersons((prev) => prev.map((c) => (c.id === id ? updatedPerson : c)));
      return updatedPerson;
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar pessoa');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deletePerson = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deletePersonService(id);
      setPersons((prev) => prev.filter((c) => c.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar pessoa');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PersonContext.Provider
      value={{
        persons,
        loading,
        error,
        fetchPersons,
        createPerson,
        updatePerson,
        deletePerson
      }}
    >
      {children}
    </PersonContext.Provider>
  );
};

export const usePerson = () => useContext(PersonContext);
