import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { NotFound } from "./components/NotFound";
import { AuthContextProvider } from "./hooks/useAuth"
import { EditPessoaContextProvider } from "./hooks/usePessoa";
import { LinkRoutes } from "./LinkRoutes";
import { Cadastro } from "./pages/Cadastro";
import { Login } from "./pages/Login";
import { Pessoa } from "./pages/Pessoa";


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <EditPessoaContextProvider>
          <LinkRoutes />
        </EditPessoaContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;