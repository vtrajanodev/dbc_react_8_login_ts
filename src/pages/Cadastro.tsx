import { CadastroDTO } from '../models/CadastroDTO'
import { Formik, Form, Field, FormikHelpers, } from 'formik'
import { useNavigate } from 'react-router'
import { usePessoa } from '../hooks/usePessoa'
import styles from '../styles/cadastro.module.scss'
import api from '../services/api'

export const Cadastro = () => {

  const navigate = useNavigate()
  const { getList } = usePessoa()

  const handleRegister = async (user: CadastroDTO) => {
    try {
      const  response = await api.post('/pessoa', user)
      alert(`Usuário ${response.data.nome} cadastrado com sucesso`)
      navigate('/pessoa')
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <div className={`container`}>
        <h1>Cadastre um novo usuário</h1>

        <Formik
          initialValues={{
            nome: '',
            dataNascimento: '',
            cpf: '',
            email: ''
          }}
          onSubmit={async (
            values: CadastroDTO,
            { setSubmitting }: FormikHelpers<CadastroDTO>
          ) => {
            await handleRegister(values)
            console.log(values)
            setSubmitting(false);
            await getList()
          }}
        >
          <Form className={styles.cadastroContainer}>
            <div>
              <label htmlFor="nome">Nome</label>
              <Field id="nome" name="nome" placeholder="John" />

              <label htmlFor="dataNascimento">Data de nascimento:</label>
              <Field id="dataNascimento" name="dataNascimento" placeholder="23/12/1969" />

              <label htmlFor="cpf">CPF: </label>
              <Field id="cpf" name="cpf" placeholder="19392848212"/>

              <label htmlFor="email">Email:</label>
              <Field id="email" name="email" placeholder="email@exemplo.com" />

              <button type="submit">Cadastrar</button>
            </div>
          </Form>
        </Formik>

      </div>
    </>
  )
}
