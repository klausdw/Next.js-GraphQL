import React, {useState} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const NOVA_CONTA = gql`
    mutation novoUsuario($input:UsuarioInput) {
        novoUsuario(input: $input){
            id
            nome
            sobrenome
            email
            rol
        }
    }
`;

const NovaConta = () => {

    // State 
    const [ mensagem, guardarMensagem ] = useState(null);

    // Mutation
    const [ novoUsuario ] = useMutation(NOVA_CONTA);

    const router = useRouter();

    // validation
    const formik = useFormik({
      initialValues: {
        nome: "",
        sobrenome: "",
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        nome: Yup.string()
            .required("Nome é obrigratorio"),
        sobrenome: Yup.string()
            .required("Sobrenome é obrigratorio"),
        email: Yup.string()
            .email("E-Mail invalido")
            .required("E-Mail é obrigratorio"),
        password: Yup.string()
            .required("Escolha uma senha")
            .min(6, "A senha deve ter no minimo 6 caracteres"),
      }),
      onSubmit: async valores => {
        // console.log("enviando");
        // console.log(valores);
        const { nome, sobrenome, email, password } = valores;

        try {
            const { data } = await novoUsuario({
                variables: {
                    input: {
                        nome, sobrenome, email, password
                    }
                }
            });
            console.log(data);
            // correct created
            guardarMensagem(`Olá ${data.novoUsuario.nome}, seu cadastro foi criado com sucesso!`);
            setTimeout(() => {
                guardarMensagem(null);
                // redirect user for login page
                router.push('/login')
            }, 3000);

        } catch (error) {
            guardarMensagem(error.message)

            setTimeout(() => {
                guardarMensagem(null)
            }, 3000)
            // console.log(error.message);
        }
      },
    });

    // Loading spinner
    // if(loading) return 'Carregando...';

    const mostrarMensagem = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensagem}</p>
            </div>
        )
    }
    
    return (
      <div>
        <Layout>
            { mensagem && mostrarMensagem() }
          <h1 className="text-center text-2xl text-white font-light">
            Criar nova Conta
          </h1>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-sm">
              <form 
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={formik.handleSubmit}
            >
                <div className="mb-4">
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
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                { formik.touched.nome && formik.errors.nome ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">{formik.errors.nome}</p>
                    </div>
                ) : null }
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
                    value={formik.values.sobrenome}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                { formik.touched.sobrenome && formik.errors.sobrenome ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">{formik.errors.sobrenome}</p>
                    </div>
                ) : null }
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
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                { formik.touched.email && formik.errors.email ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">{formik.errors.email}</p>
                    </div>
                ) : null }
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                { formik.touched.password && formik.errors.password ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">{formik.errors.password}</p>
                    </div>
                ) : null }
                <input
                  type="submit"
                  className="bg-gray-600 w-full mt-5 p-2 text-white uppercase hover:bg-gray-800"
                  value="Criar Conta"
                />
              </form>
            </div>
          </div>
        </Layout>
      </div>
    );
}
export default NovaConta;