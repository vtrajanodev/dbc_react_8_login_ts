import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AuthContextProvider } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { Pessoa } from "./pages/Pessoa";


export const LinkRoutes = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/pessoa" element={<Pessoa />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}