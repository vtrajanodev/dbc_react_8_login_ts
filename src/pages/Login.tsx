import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/login.module.scss'
import { LoginDTO } from '../models/LoginDTO';
import api from '../services/api';
import { useNavigate } from 'react-router';

export const Login = () => {

  const { setUserAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

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
  
  return (
    <div className="container">
      <h2>Faça login:</h2>
      <div className={styles.loginAria}>
        <Formik
          initialValues={{
            usuario: '',
            senha: '',
          }}
          onSubmit={(
            values: LoginDTO,
            { setSubmitting }: FormikHelpers<LoginDTO>
          ) => {

            console.log(values)
            handleLogin(values)
            setSubmitting(false);

          }}
        >
          <Form className={styles.loginFields}>
            <label htmlFor="usuario">Usuario</label>
            <Field id="usuario" name="usuario" placeholder="John" />

            <label htmlFor="senha">Senha</label>
            <Field id="senha" name="senha" placeholder="*******" />

            <button type="submit">Entrar</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}