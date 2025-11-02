# People Manager App

A modern web application for managing people's information, built with React, TypeScript, and Vite.

## 🚀 Features

- User authentication (login/logout)
- CRUD operations for managing people
- Protected routes for authenticated users
- Responsive design with Tailwind CSS
- Form validation
- RESTful API integration

## 💻 Technologies

- **Frontend Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 3
- **HTTP Client:** Axios
- **Routing:** React Router DOM 7
- **UI Components:** Lucide React
- **Type Safety:** TypeScript
- **Code Quality:** ESLint

## 🏗️ Project Structure

```
src/
├── Components/           # Reusable UI components
│   ├── AddPersonForm
│   ├── NavBar
│   └── ...
├── Contexts/            # React context providers
│   ├── AuthContext
│   └── PersonContext
├── Pages/              # Main application pages
│   ├── LoginPage
│   └── PersonPage
├── Routes/             # Route configurations
│   └── AppRoutes
└── Services/          # API and authentication services
    ├── ApiClient
    ├── AuthService
    └── PersonService
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Alairtonfl/PeopleManagerApp.git
   cd PeopleManagerApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔒 Authentication

The application uses a token-based authentication system. Users need to log in with their CPF and password to access protected routes.

## 🔑 API Integration

The application communicates with a RESTful API using the following endpoints:

- `/api/v1/Auth/authenticate` - User authentication
- `/api/v1/Auth/me` - Get current user information
- `/api/v1/people/get-all` - Fetch all people
- Additional endpoints for CRUD operations on people management

## 🎨 UI/UX

- Modern and responsive design using Tailwind CSS
- Clean and intuitive user interface
- Loading states and error handling
- Form validation feedback

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build


## 📄 License

This project is open source and available under the [MIT License](LICENSE)

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
