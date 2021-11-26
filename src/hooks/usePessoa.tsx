import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { PessoaDTO } from "../models/PessoaDTO";
import { CadastroDTO } from "../models/CadastroDTO";
import api from "../services/api";


interface EditPessoaContextType {
  getList: () => Promise<void>;
  listaPessoa: PessoaDTO[];
  handleRegister: (user: CadastroDTO) => Promise<void>;
  handleEditUser: (idPessoa: number) => Promise<void>;
  handleDeleteUser: (idPessoa: number) => Promise<void>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

interface EditPessoaContextProviderProps {
  children: ReactNode;
}

export const EditPessoaContext = createContext({} as EditPessoaContextType)

export const EditPessoaContextProvider = ({ children }: EditPessoaContextProviderProps) => {

  const [listaPessoa, setListaPessoa] = useState<PessoaDTO[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [userEditing, setUserEditing] = useState<PessoaDTO>()
  const navigate = useNavigate()

  const getList = async () => {
    const { data } = await api.get('/pessoa')
    setListaPessoa(data)
  }

  const handleRegister = async (user: CadastroDTO) => {
    try {
      const  response = await api.post('/pessoa', user)
      alert(`Usuário ${response.data.nome} cadastrado com sucesso`)
      navigate('/pessoa')
    } catch (err) {
      alert(err)
    }
  }

  const handleEditUser = async (idPessoa: number,) => {
    try {
      setIsEditing(true)
      const pessoa = listaPessoa.find(p => p.idPessoa === idPessoa)
      setUserEditing(pessoa)
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
      getList()
    } catch (err) {
      alert(err)
    }
  }
  
  return (
    <EditPessoaContext.Provider value={{getList, listaPessoa, handleRegister, handleEditUser, handleDeleteUser, isEditing, setIsEditing, }}>
      {children}
    </EditPessoaContext.Provider>
  );
}

export const usePessoa = () => {
  const value = useContext(EditPessoaContext)

  return value
}