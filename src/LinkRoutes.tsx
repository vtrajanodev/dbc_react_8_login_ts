import { Route, Routes } from "react-router"
import { Header } from "./components/Header"
import { NotFound } from "./components/NotFound"
import { useAuth } from "./hooks/useAuth"
import { Cadastro } from "./pages/Cadastro"
import { Login } from "./pages/Login"
import { Pessoa } from "./pages/Pessoa"

export const LinkRoutes = () => {
  const { userAuthenticated } = useAuth()
  return (
    <>
      <Header />
      {userAuthenticated ? (
        <Routes>
          <Route path="/" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pessoa"  element={<Pessoa />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) :
        (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}

      {/* <Footer /> */}
    </>
  )
}
