import { BrowserRouter } from "react-router-dom";
import { Loading } from "./components/Loading";
// import { Footer } from "./components/Footer";
import { AuthContextProvider } from "./hooks/useAuth"
import { EditPessoaContextProvider } from "./hooks/usePessoa";
import { LinkRoutes } from "./LinkRoutes";


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