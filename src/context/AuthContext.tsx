import { createContext, ReactNode, useEffect, useState } from 'react'
import axios from 'axios'

interface LoginDTO {
  usuario: string;
  senha: string;
}

interface AuthContextInterface {

  userAuthenticated: boolean;
  handleLogin: (values: LoginDTO) => Promise<void>;
}

interface AuthContextProviderType {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextInterface)
export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  
  const [userAuthenticated, setUserAuthenticated] = useState(false)

  useEffect(() => {
    console.log('teste')
  }, [])

  const handleLogin = async (user: LoginDTO) => {
    const { data } = await axios.post('https://my-application-teste.herokuapp.com/auth', user)
    setUserAuthenticated(true)
    console.log(data)
  }
  return (
    <AuthContext.Provider value={{ userAuthenticated, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}