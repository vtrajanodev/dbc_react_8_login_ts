import { useEffect, useState } from "react";
import api from "../services/api";
import styles from '../styles/pessoa.module.scss'
import { PessoaDTO } from '../models/PessoaDTO'
import { Card } from "../components/Card";
import { useEditPessoa } from "../hooks/useEditPessoa";

export const Pessoa = () => {
  const [listaPessoa, setListaPessoa] = useState<PessoaDTO[]>([])
  const { handleDeleteUser } = useEditPessoa()

  //TODO pasar para o contexto
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/pessoa')
      setListaPessoa(data)
    })()
  }, [])

  
  return (
   <Card styles={styles} listaPessoa={listaPessoa} handleDeleteUser={handleDeleteUser}/>
  );
}