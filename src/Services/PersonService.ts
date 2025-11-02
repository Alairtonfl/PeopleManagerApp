import apiClient from './ApiClient';

export interface Person {
  id: number;
  name: string;
  gender?: number | null;
  cpf: string;
  birthDate: string;
  email?: string | null;
  naturality?: string | null;
  nationality?: string | null
  password?: string;
  address?: string | null;
}

export interface PagedPersonsResponse {
  data: Person[];
}

export async function fetchPersons(): Promise<PagedPersonsResponse> {
  const response = await apiClient.get('/api/v1/people/get-all', {
  });
  return response.data;
}

export async function createPerson(data: { 
  name: string, 
  gender?: number | null, 
  cpf: string, 
  birthDate: string, 
  email?: string | null;
  naturality?: string | null,
  nationality?: string | null,
  password: string
 }): Promise<Person> {
  const response = await apiClient.post('/api/v1/people/create', data);
  return response.data.data;
}

export async function createPersonV2(data: { 
  name: string, 
  gender?: number | null, 
  cpf: string, 
  birthDate: string, 
  email?: string | null;
  naturality?: string | null,
  nationality?: string | null,
  password: string,
  address?: string | null
 }): Promise<Person> {
  const response = await apiClient.post('/api/v2/people/create', data);
  return response.data.data;
}

export async function updatePerson(id: number, data: Partial<Person>): Promise<Person> {
  const response = await apiClient.put(`/api/v1/people/update/${id}`, data);
  return response.data.data;
}

export async function deletePerson(id: number): Promise<void> {
  await apiClient.delete(`/api/v1/people/delete/${id}`);
}

export async function getPersonByCpf(cpf: string): Promise<void> {
  await apiClient.get(`/api/v1/people/get-by-cpf/${cpf}`);
}

export async function getPersonById(id: number): Promise<Person> {
  const response = await apiClient.get(`/api/v1/people/get-by-id/${id}`);
  return response.data.data;
}
