import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import { PersonProvider } from './Contexts/PersonContext'; 
import AppRoutes from './Routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <PersonProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
      </PersonProvider>
    </AuthProvider>
  );
}
