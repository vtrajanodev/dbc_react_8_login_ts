import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PessoaDTO } from "../models/PessoaDTO";
import api from "../services/api";


interface EditPessoaContextType {
  handleDeleteUser: (idPessoa: number) => Promise<void>
  handleEditUser: (idPessoa: number) => Promise<void>
  getList: () => Promise<void>
  listaPessoa: PessoaDTO[]
}

interface EditPessoaContextProviderProps {
  children: ReactNode;
}

export const EditPessoaContext = createContext({} as EditPessoaContextType)

export const EditPessoaContextProvider = ({ children }: EditPessoaContextProviderProps) => {

  const [listaPessoa, setListaPessoa] = useState<PessoaDTO[]>([])
  const navigate = useNavigate()

  // useEffect(() => {
  //   getList()
  // }, [])

  const getList = async () => {
    const { data } = await api.get('/pessoa')
    setListaPessoa(data)
  }

  const handleEditUser = async (idPessoa: number,) => {
    try {
      const pessoa = listaPessoa.find(p => p.idPessoa === idPessoa)
      console.log(pessoa)
      navigate('/')
      getList()
    } catch (err) {
      alert(err)
    }

  }

  const handleDeleteUser = async (idPessoa: number) => {
    try {
      await api.delete(`/pessoa/${idPessoa}`)
      alert('Excluido com sucesso')
    } catch (err) {
      alert(err)
    }
  }


  return (
    <EditPessoaContext.Provider value={{ handleDeleteUser, handleEditUser, listaPessoa, getList }}>
      {children}
    </EditPessoaContext.Provider>
  );
}

export const usePessoa = () => {
  const value = useContext(EditPessoaContext)

  return value
}