import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { LoginDTO } from '../models/LoginDTO'
import { useNavigate } from 'react-router'
import api from '../services/api'

interface AuthContextInterface {
  userAuthenticated: boolean;
  setUserAuthenticated: (value: boolean) => void;
  handleLogin: (values: LoginDTO) => Promise<void>;
  handleLogout: () => void;
  loading: boolean
}

interface AuthContextProviderType {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextInterface)
export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  
  const [userAuthenticated, setUserAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {

    const token = localStorage.getItem('token')
    if(token) {
      api.defaults.headers.common['Authorization'] = token
      setUserAuthenticated(true)
    }
    setLoading(false)
  }, [userAuthenticated])

  const handleLogin = async (user: LoginDTO) => {
    try {
      const { data } = await api.post('/auth', user)
      console.log(data)
      localStorage.setItem('token', data)
      api.defaults.headers.common['Authorization'] = data

      setUserAuthenticated(true)
      navigate('/pessoa')

    } catch (err) {
      alert(err)
    }
  }

  if (loading) {
    return (<h1>loading</h1>)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    api.defaults.headers.common['Authorization'] = ''
    navigate('/')
    setUserAuthenticated(false)
  } 

  return (
    <AuthContext.Provider value={{ userAuthenticated, setUserAuthenticated, handleLogin, handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext)
  return value;
}