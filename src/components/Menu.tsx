import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import api from "../services/api"

export const Menu = () => {
  const { userAuthenticated, setUserAuthenticated, handleLogout } = useContext(AuthContext)



  return (
    <nav>
      <ul>
        <li>
          <Link to="/"> Home</Link>
        </li>
        <li>
          <Link to="/pessoa">Pessoa</Link>
        </li>
        {userAuthenticated && 
        <li>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </li>}
      </ul>
    </nav>
  )
}
