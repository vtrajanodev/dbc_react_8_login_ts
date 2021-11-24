import { Link } from "react-router-dom"

export const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/"> Home</Link>
        </li>
        <li>
          <Link to="/pessoa">Pessoa</Link>
        </li>
      </ul>
    </nav>
  )
}
