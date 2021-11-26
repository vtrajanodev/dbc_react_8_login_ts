import { useEffect, useState } from "react";
import api from "../services/api";
import styles from '../styles/pessoa.module.scss'
import { PessoaDTO } from '../models/PessoaDTO'

export const Pessoa = () => {

  const [listaPessoa, setListaPessoa] = useState<PessoaDTO[]>([])

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/pessoa')
      setListaPessoa(data)
    })()
  }, [])

  const handleEditUser = (id: number) => {
    
  }

  return (
    <div className={styles.pessoaContainer}>
      <h1>Dados dos usuários</h1>
      <div className={styles.pessoaLista}>
        {listaPessoa.map(pessoa => (
          <div className={styles.card} key={pessoa.idPessoa}>
            <div>
              <h3>{pessoa.nome}</h3>
              <p>Nascimento: {pessoa.dataNascimento}</p>
              <p>Email: {pessoa.email}</p>
              <p>Doc: {pessoa.cpf}</p>
            </div>
              <div className={styles.botoes}>
                <button>Editar</button>
                <button>Deletar</button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}