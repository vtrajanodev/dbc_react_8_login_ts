import { useEffect, useState } from "react";
import api from "../services/api";
import styles from '../styles/pessoa.module.scss'

interface People {
  name: string;
  dataNascimento: string;
  cpf: string;
  email: string;
}
export const Pessoa = () => {

  const [listPeople, setListPeople] = useState<People[]>([])

  const getPeople = async () => {
    const response = await api.get('/pessoa')
    const { nome, dataNascimento, cpf, email } = response.data
    console.log(response.data)
    setListPeople([
      ...listPeople,
      {
        name: nome,
        dataNascimento: dataNascimento,
        cpf: cpf,
        email: email
      }
    ])
    console.log(listPeople)
  }

  useEffect(() => {
    getPeople()
  }, [])

  return (
    <div className={styles.pessoaContainer}>
      <h1>Pessoa</h1>
      <div className={styles.pessoasLista}>
        {listPeople.map((people, index) => (
          <div key={index}>{people.name}</div>
        ))}
      </div>
    </div>
  );
}