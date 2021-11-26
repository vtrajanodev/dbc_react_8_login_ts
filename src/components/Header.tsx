import { Link } from "react-router-dom"
import { Menu } from "./Menu"
import logo from '../assets/github1.png'
import styles from '../styles/header.module.scss'

export const Header = () => {

 
  return (
    <header className={styles.headerFlex}>
      <Link to="/login">
        <img src={logo} alt="logo icon" />
      </Link>
      <Menu />
    </header>
  )
}
