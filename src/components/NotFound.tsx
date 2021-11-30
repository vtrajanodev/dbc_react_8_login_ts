import styles from '../styles/notfound.module.scss'
import logo from '../assets/404.png'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export const NotFound = () => {
  
  const navigate = useNavigate()
  const { userAuthenticated } = useAuth()

  
  const handleBackToPage = () => {
    if (userAuthenticated) {
      navigate('/pessoa')
    }else{
      navigate('/login')
    }
  }

  return (
    <div className={`${styles.notFound} container`}>
      <img src={logo} alt="not found" />
      <h1>Página não encontrada :(</h1>
      <div className={styles.row}>
        <p>Verifique a URL digitada</p>
        <button onClick={handleBackToPage}>Voltar para o site</button>
      </div>
    </div>
  )
}
