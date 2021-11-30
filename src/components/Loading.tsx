import { usePessoa } from '../hooks/usePessoa'
import logo from '../assets/Spinner.svg'
import styles from '../styles/loading.module.scss'


export const Loading = () => {

  const { loading } = usePessoa()

  return (
    <>
      {loading && (
        <div className={styles.loadingContainer}>
          <img src={logo} alt="loading..." />
        </div>
      )}
    </>
  )
}
