import styles from '../styles/pessoa.module.scss'
import { Card } from "../components/Card";
import { usePessoa } from "../hooks/usePessoa";
import { Loading } from '../components/Loading';

export const Pessoa = () => {
  const { listaPessoa, handleEditUser, handleDeleteUser } = usePessoa()

  return (
    <>
      <Card styles={styles} listaPessoa={listaPessoa} handleDeleteUser={handleDeleteUser} handleEditUser={handleEditUser} />
      <Loading />
    </>
  );
}