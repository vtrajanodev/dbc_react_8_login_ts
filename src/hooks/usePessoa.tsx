import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { PessoaDTO } from "../models/PessoaDTO";
import { CadastroDTO } from "../models/CadastroDTO";
import { api } from "../services/api";

interface EditPessoaContextType {
  getList: () => Promise<void>;
  listaPessoa: PessoaDTO[];
  handleRegister: (user: CadastroDTO) => Promise<void>;
  handleEditUser: (idPessoa: number) => Promise<void>;
  handleDeleteUser: (idPessoa: number) => Promise<void>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  userEditing: PessoaDTO;
  handleSaveEditChanges: (id: number, user: CadastroDTO) => Promise<void>
  loading: boolean,
  setLoading: (value: boolean) => void
}

interface EditPessoaContextProviderProps {
  children: ReactNode;
}

export const EditPessoaContext = createContext({} as EditPessoaContextType)

export const EditPessoaContextProvider = ({ children } : EditPessoaContextProviderProps) => {

  const [listaPessoa, setListaPessoa] = useState<PessoaDTO[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [userEditing, setUserEditing] = useState<any>()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleRegister = async (user: CadastroDTO) => {
    try {
      const  response = await api.post('/pessoa', user)
      alert(`Usuário ${response.data.nome} cadastrado com sucesso`)
      navigate('/pessoa')
      await getList()
      setLoading(false)
    } catch (err) {
      alert(err)
    }
  }

  const getList = async () => {
    const { data } = await api.get('/pessoa')
    setListaPessoa(data)
    setIsEditing(false)
    setLoading(false)
  }

  const handleEditUser = async (idPessoa: number,) => {
    try {
      setIsEditing(true)
      const pessoa = listaPessoa.find(p => p.idPessoa === idPessoa)
      setUserEditing(pessoa)
      setLoading(false)
      navigate('/')
    } catch (err) {
      alert(err)
    }
  }

  const handleSaveEditChanges = async (id: number, user: CadastroDTO) => {
    try {
      const { data } = await api.put(`/pessoa/${id}`, user)
      console.log(data)
      navigate('/pessoa')
      alert(`Usuário ${userEditing.nome} editado com sucesso`)
      setUserEditing('')
      setLoading(false)
    }catch (err) {
      alert(err)
    }
  }
  
  const handleDeleteUser = async (idPessoa: number) => {
    try {
      await api.delete(`/pessoa/${idPessoa}`)
      alert('Excluido com sucesso')
      getList()
      setLoading(false)
    } catch (err) {
      alert(err)
    }
  }
  
  return (
    <EditPessoaContext.Provider value={{userEditing, handleSaveEditChanges ,getList, listaPessoa, handleRegister, handleEditUser, handleDeleteUser, isEditing, setIsEditing, loading, setLoading}}>
      {children}
    </EditPessoaContext.Provider>
  );
}

export const usePessoa = () => {
  const value = useContext(EditPessoaContext)

  return value
}