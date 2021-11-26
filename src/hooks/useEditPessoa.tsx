import api from "../services/api";
import { createContext, useEffect, useState, ReactNode, useContext } from "react";



interface EditPessoaContextType {
  handleDeleteUser: (id: number) => Promise<void>
} 

interface EditPessoaContextProviderProps {
  children: ReactNode
}


export const EditPessoaContext = createContext({} as EditPessoaContextType)

const handleDeleteUser = async (id: number) => {
  try {
    api.delete(`/pessoa/${id}`)
    alert('Excluido com sucesso')
  } catch (err) {
    alert(err)
  }
}

export const EditPessoaContextProvider = ({ children }: EditPessoaContextProviderProps) => {
  return (
    <EditPessoaContext.Provider value={{handleDeleteUser}}>
      {children}
    </EditPessoaContext.Provider>
  );
}

export const useEditPessoa = () => {
  const value = useContext(EditPessoaContext)

  return value
}