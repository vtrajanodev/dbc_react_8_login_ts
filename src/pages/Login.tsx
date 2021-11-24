import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/login.module.scss'

export const Login = () => {

  const { userAuthenticated, handleLogin } = useContext(AuthContext)

  interface LoginDTO {
    usuario: string;
    senha: string;
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
            setTimeout(() => {
              console.log(values)
              handleLogin(values)
              setSubmitting(false);
            }, 500);
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