import { CadastroDTO } from '../models/CadastroDTO'
import { Formik, Form, Field, FormikHelpers, } from 'formik'
import { usePessoa } from '../hooks/usePessoa'
import styles from '../styles/cadastro.module.scss'

export const Cadastro = () => {

  const { getList, handleSaveEditChanges, handleRegister, isEditing, userEditing, } = usePessoa()

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
          onSubmit={async (
            values: CadastroDTO,
            { setSubmitting }: FormikHelpers<CadastroDTO>
          ) => {
            (!isEditing ?
            await handleRegister(values)
            :
            await handleSaveEditChanges(userEditing.idPessoa, values))
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
              <Field id="cpf" name="cpf" placeholder="19392848212" />

              <label htmlFor="email">Email:</label>
              <Field id="email" name="email" placeholder="email@exemplo.com" />

              <button type="submit">{isEditing ? "Atualizar cadastro" : "Cadastrar"}</button>
            </div>
          </Form>
        </Formik>

      </div>
    </>
  )
}
