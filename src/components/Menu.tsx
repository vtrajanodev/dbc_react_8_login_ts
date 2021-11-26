import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const Menu = () => {
  const { userAuthenticated, handleLogout } = useContext(AuthContext)

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
