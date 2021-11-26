import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PessoaDTO } from "../models/PessoaDTO";
import api from "../services/api";


interface EditPessoaContextType {
  handleDeleteUser: (id: number) => Promise<void>
  handleEditUser: (id: number) => Promise<void>
  listaPessoa: PessoaDTO[]
} 

interface EditPessoaContextProviderProps {
  children: ReactNode
}

export const EditPessoaContext = createContext({} as EditPessoaContextType)

export const EditPessoaContextProvider = ({ children }: EditPessoaContextProviderProps) => {

  const [listaPessoa, setListaPessoa] = useState<PessoaDTO[]>([])

  const handleDeleteUser = async (id: number) => {
    try {
      await api.delete(`/pessoa/${id}`)
      alert('Excluido com sucesso')
    } catch (err) {
      alert(err)
    }
  }
  
  const handleEditUser = async (id: number, ) => {
    try {
      await api.post(`/pessoa/${id}`)
      alert('Atualizado com sucesso')
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/pessoa')
      setListaPessoa(data)
    })()
  }, [])
  return (
    <EditPessoaContext.Provider value={{handleDeleteUser, handleEditUser, listaPessoa}}>
      {children}
    </EditPessoaContext.Provider>
  );
}

export const usePessoa = () => {
  const value = useContext(EditPessoaContext)

  return value
}