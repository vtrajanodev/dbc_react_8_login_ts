import { createContext, ReactNode, useEffect, useState } from 'react'
import { LoginDTO } from '../models/LoginDTO'
import { useNavigate } from 'react-router'
import api from '../services/api'

interface AuthContextInterface {
  userAuthenticated: boolean;
  setUserAuthenticated: (value: boolean) => void;
  handleLogin: (values: LoginDTO) => Promise<void>;
  handleLogout: () => void;
}

interface AuthContextProviderType {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextInterface)
export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  
  const [userAuthenticated, setUserAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if(token) {
      api.defaults.headers.common['Authorization'] = token
      setUserAuthenticated(true)
    }
  }, [])

  const handleLogin = async (user: LoginDTO) => {
    try {

      const { data } = await api.post('/auth', user)
      localStorage.setItem('token', data)
      api.defaults.headers.common['Authorization'] = data

      setUserAuthenticated(true)
      navigate('/pessoa')

    } catch (err) {
      alert(err)
    }
  }

  const handleLogout = () => {

    localStorage.setItem('token', '')
    api.defaults.headers.common['Authorization'] = ''
    navigate('/')
    setUserAuthenticated(false)
  } 

  return (
    <AuthContext.Provider value={{ userAuthenticated, setUserAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}