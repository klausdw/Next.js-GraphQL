import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const CV = gql`
mutation novoCurriculum($input: CurriculumInput){
  novoCurriculum(input:$input){
    id
      dadosPessoais {
        nome
        sobrenome
        email
        profissao
        nacionalidade
        telefone
        nascimento
        estadoCivil
        filhos
        endereco
        cidade
        cep
        estado
        cnh
      }
    formacao {
      data
      titulo
      local
    }
    experiencia {
      data
      funcao
      local
    }
    pratico {
      data
      funcao
      local
    }
    cursos {
      data
      titulo
      local
    }
    idiomas {
      nome
      nivel
    }
  }
}
`;

const novoCurriculum = () => {
  // Mutation
  const [ novoCurriculum ] = useMutation(CV);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      dadosPessoais: '',
      nome: '',
      sobrenome: '',
      email: '',
      profissao: '',
      nacionalidade: '',
      telefone: '',
      nascimento: '',
      estadoCivil: '',
      filhos: '',
      endereco: '',
      cidade: '',
      cep: '',
      estado: '',
      cnh: '',
    },
    validationSchema: Yup.object({
      dadosPessoais:Yup.string(), 
        nome:Yup.string(), 
        sobrenome:Yup.string(), 
        email:Yup.string(), 
        profissao:Yup.string(), 
        nacionalidade:Yup.string(),
        telefone:Yup.string(),
        nascimento:Yup.string(),
        estadoCivil:Yup.string(),
        filhos:Yup.string(),
        endereco:Yup.string(),
        cidade:Yup.string(),
        cep:Yup.string(),
        estado:Yup.string(),
        cnh: Yup.string(),
    }),
    onSubmit: async valores => {
      const { 
        dadosPessoais, 
        nome, 
        sobrenome, 
        email, 
        profissao, 
        nacionalidade,
        telefone,
        nascimento,
        estadoCivil,
        filhos,
        endereco,
        cidade,
        cep,
        estado,
        cnh
    } = valores;

    try {
      const { data } = await novoCurriculum({
        variables: {
          input: {
            dadosPessoais: { 
            nome, 
            sobrenome, 
            email, 
            profissao, 
            nacionalidade,
            telefone,
            nascimento,
            estadoCivil,
            filhos,
            endereco,
            cidade,
            cep,
            estado,
            cnh
            }
          }
        }
      });
      console.log(data.novoCurriculum);
    } catch (error) {
      console.log(error);
    }

    }
  })

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Novo Cliente</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form 
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-4"
                htmlFor="dadosPessoais"
              >
                Dados Pessoais
              </label>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nome"
              >
                Nome
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="nome"
                type="nome"
                placeholder="Nome"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nome}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sobrenome"
              >
                Sobrenome
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="sobrenome"
                type="sobrenome"
                placeholder="Sobrenome"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sobrenome}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                E-Mail
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="email"
                type="email"
                placeholder="E-Mail"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="profissao"
              >
                Profissão
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="profissao"
                type="profissao"
                placeholder="Profissão"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.profissao}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefone"
              >
                Telefone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="telefone"
                type="tel"
                placeholder="Telefone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefone}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nascimento"
              >
                Data de nascimento
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="nascimento"
                type="nascimento"
                placeholder="Data de nascimento"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nascimento}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="estadoCivil"
              >
                Estado Civil
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="estadoCivil"
                type="estadoCivil"
                placeholder="Estado Civil"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.estadoCivil}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="filhos"
              >
                Filhos
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="filhos"
                type="filhos"
                placeholder="Quantidade, 0 se não possui."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.filhos}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="endereco"
              >
                Endereço
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="endereco"
                type="endereco"
                placeholder="Endereço"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endereco}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cidade"
              >
                Cidade
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="cidade"
                type="cidade"
                placeholder="Cidade"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cidade}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cep"
              >
                Cep
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="cep"
                type="cep"
                placeholder="Cep"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cep}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="estado"
              >
                Estado
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="estado"
                type="estado"
                placeholder="Estado"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.estado}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cnh"
              >
                Carteira de Habilitação - CNH
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="cnh"
                type="cnh"
                placeholder="Carteira de Habilitação - CNH"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cnh}
              />
            </div>

            <input
              type="submit"
              className="bg-gray-600 w-full mt-5 p-2 text-white uppercase hover:bg-gray-800"
              value="Salvar Curriculum"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default novoCurriculum;
