import axios from "axios";
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

  
  useEffect(() => {
    (async () => {
      const response = await axios.get('https://my-application-teste.herokuapp.com/pessoa')
      console.log(response.data)
      setListPeople(response.data)
    })()
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