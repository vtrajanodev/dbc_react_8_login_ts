import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const Menu = () => {
  const { userAuthenticated, handleLogout } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/"> Cadastro</Link>
        </li>
        <li>
          <Link to="/pessoa">Pessoa</Link>
        </li>
        {userAuthenticated && 
        <li>
          <Link to="/login" onClick={handleLogout}>Logout</Link>
        </li>
        }
      </ul>
    </nav>
  )
}
