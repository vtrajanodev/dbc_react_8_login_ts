import { EnderecoDTO } from "../models/EnderecoDTO";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { cepApi } from "../services/api";
import { useState } from "react";
import styles from '../styles/cadastro.module.scss'

export const Endereco = () => {

  const [endereco, setEndereco] = useState({
    cep: '',
    logradouro: '',
    numero: 0,
    cidade: '',
    estado: '',
    complemento: '',
    pais: ''
  } as EnderecoDTO)

  const handleBlur = async (cep: string) => {
    const res = await cepApi.get(`/${cep}/json`)

    if (!res.data.erro || res.status !== 200 ) {
      setEndereco({
        cep: cep,
        logradouro: res.data.logradouro,
        cidade: res.data.localidade,
        estado: res.data.uf,
        complemento: res.data.complemento,
        pais: 'Brasil'
      })

    }else {
      alert('Cep inválido')
    }
  }

  return (
    <div className="container">
      <h1>Cadastre seu endereço</h1>
      <Formik
        initialValues={{
          cep: endereco.cep !== '' ? endereco.cep : '',
          logradouro: endereco.logradouro !== '' ? endereco.logradouro : '',
          cidade: endereco ? endereco.cidade : '',
          estado: endereco ? endereco.estado : '',
          complemento: endereco ? endereco.complemento : '',
          pais: endereco ? endereco.pais : ''
        }}
        onSubmit={async (
          values: EnderecoDTO,
          { setSubmitting }: FormikHelpers<EnderecoDTO>
        ) => {
          setSubmitting(false);
        }}
      >
        {props => (
          <Form className={`${styles.cadastroContainer} mtop`}>
            <div>
              <label htmlFor="cep">CEP: </label>
              <Field onBlur={() => handleBlur(props.values.cep)} id="cep" name="cep" placeholder="69048010" />

              <label htmlFor="logradouro">Logradouro: </label>
              <Field id="logradouro" name="logradouro" placeholder="Av. Torquato Tapajos" value={endereco.logradouro}/>

              <label htmlFor="cidade">Cidade</label>
              <Field id="cidade" name="cidade" placeholder="Manaus" value={endereco.cidade} />

              <label htmlFor="estado">Estado:</label>
              <Field id="estado" name="estado" placeholder="Amazonas" value={endereco.estado} />

              <label htmlFor="complemento">Conplemento:</label>
              <Field id="complemento" name="complemento" placeholder="Bloco B, apto 401, COND. Amazon Boulevard Life" value={endereco.complemento} />

              <label htmlFor="pais">Pais:</label>
              <Field id="pais" name="pais" placeholder="Brasil" value={endereco.pais} />
              <div className={styles.botoes}>
                <button type="button">Voltar</button>
                <button type="submit">Cadastrar endereço</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
