import { Formik, Field, Form, FormikHelpers } from 'formik';
import styles from '../styles/login.module.scss'
import { LoginDTO } from '../models/LoginDTO';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const Login = () => {

  const { handleLogin, userAuthenticated } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (userAuthenticated) navigate('/pessoa', {replace: true})
  }, [])

  
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