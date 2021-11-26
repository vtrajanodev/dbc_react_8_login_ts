import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/login.module.scss'
import { LoginDTO } from '../models/LoginDTO';

export const Login = () => {

  const { handleLogin } = useContext(AuthContext)
  
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