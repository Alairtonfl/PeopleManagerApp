import apiClient from './ApiClient';

export interface User {
  id: string;
  cpf: string;
}


export async function login(cpf: string, password: string): Promise<User> {
  try {
    const response = await apiClient.post('/api/v1/Auth/authenticate', { cpf, password });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro no login');
  }
}

export async function logout(): Promise<void> {
  try {
    await apiClient.post('/api/auth/logout');
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro no logout');
  }
}

export async function fetchCurrentUser(): Promise<User | null> {
  try {
    const response = await apiClient.get('/api/v1/Auth/me');
    return response.data.data;
  } catch {
    return null;
  }
}
