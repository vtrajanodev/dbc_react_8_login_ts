import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const Menu = () => {

  const { userAuthenticated, handleLogout } = useAuth();

  return (
    <nav>
      <ul>
        {userAuthenticated && (
          <>
            <li>
              <Link to="/"> Cadastro</Link>
            </li>
            <li>
              <Link to="/pessoa">Pessoa</Link>
            </li>
            <li>
              <Link to="/endereco">Endereço</Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLogout}>Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
