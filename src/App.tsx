import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AuthContextProvider } from "./context/AuthContext";
import { Cadastro } from "./pages/Cadastro";
import { Login } from "./pages/Login";
import { Pessoa } from "./pages/Pessoa";


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pessoa" element={<Pessoa />} />
        </Routes>
        {/* <Footer /> */}
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;