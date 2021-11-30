import { CadastroDTO } from '../models/CadastroDTO'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { usePessoa } from '../hooks/usePessoa'
import { useNavigate } from 'react-router'
import * as Yup from 'yup';
import styles from '../styles/cadastro.module.scss'


export const Cadastro = () => {


  const { getList, handleSaveEditChanges, handleRegister, isEditing, userEditing, loading, setLoading } = usePessoa()
  const navigate = useNavigate()

  const cadastroSchema = Yup.object().shape({
    nome: Yup.string()
      .min(5, 'Nome muito curto!')
      .max(50, 'Nome muito longo')
      .required('Obrigatório'),
    dataNascimento: Yup.string()
      .min(10, 'Data de nascimento incompleta')
      .max(10, 'Data de nascimento muito longa')
      .required('Obrigatório'),
    email: Yup.string()
    .email('Email invalido')
    .max(20, 'Email muito longo')
    .required('Obrigatório'),
    cpf: Yup.string()
      .min(11, 'CPF precisa conter 11 caracteres')
      .max(11, 'CPF precisa conter 11 caracteres')
      .required('Obrigatório')
  });

  return (
    <>
      <div className={`container`}>

        <h1>{isEditing ? ("Edição de usuário") : ("Cadastre um novo usuário")}</h1>
        <Formik
          initialValues={{
            nome: isEditing ? userEditing.nome : '',
            dataNascimento: isEditing ? userEditing.dataNascimento : '',
            cpf: isEditing ? userEditing.cpf : '',
            email: isEditing ? userEditing.email : ''
          }}
          validationSchema={cadastroSchema}
          onSubmit={async (
            values: CadastroDTO,
            { setSubmitting }: FormikHelpers<CadastroDTO>
          ) => {
            (!isEditing ?
              await handleRegister(values)
              :
              await handleSaveEditChanges(userEditing.idPessoa, values))
            setSubmitting(false);
            await getList()
          }}
        >
          {props => (
            <Form className={styles.cadastroContainer}>
              <div>
                <div>
                  <label htmlFor="nome">Nome</label>
                  <Field id="nome" name="nome" placeholder="John" />
                  {(props.errors.nome && props.touched.nome) && (
                    <span>{props.errors.nome}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="dataNascimento">Data de nascimento:</label>
                  <Field id="dataNascimento" name="dataNascimento" placeholder="23/12/1969" />
                  {(props.errors.nome && props.touched.dataNascimento) && (
                    <span>{props.errors.dataNascimento}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="cpf">CPF: </label>
                  <Field id="cpf" name="cpf" placeholder="19392848212" maxLength="11" minLength="11" />
                  {(props.errors.nome && props.touched.cpf) && (
                    <span>{props.errors.cpf}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="email">Email:</label>
                  <Field id="email" name="email" placeholder="email@exemplo.com" />
                  {(props.errors.nome && props.touched.email) && (
                    <span>{props.errors.email}</span>
                  )}
                </div>

                <div className={styles.botoes}>
                  <button type="button" onClick={() => navigate('/pessoa')}>Voltar</button>
                  <button type="submit">{isEditing ? "Atualizar cadastro" : "Cadastrar"}</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
