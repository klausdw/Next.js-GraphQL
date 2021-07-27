import React, {useState} from 'react'
import Head from 'next/head';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router';

const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput) {
        autenticarUsuario(input: $input) {
            token
        }
    }
`;

const Login = () => {

    // Mutation
    const [ autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO)

    const [ mensagem, guardarMensagem ] = useState(null);

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                        .email('E-Mail invalido')
                        .required('E-Mail é obrigratorio'),
            password: Yup.string()
                            .required('Senha é obrigatoria')
        }),
        onSubmit: async valores => {
            // console.log(valores);
            const { email, password } = valores;
            try {
                const { data } = await autenticarUsuario({
                    variables: {
                        input: {
                            email, password
                        }
                    }
                });
                console.log(data);
                // loading spinner
                guardarMensagem('Autenticando...')
                // save token in localstorage
                
                setTimeout(() => {
                  const { token } = data.autenticarUsuario;
                  localStorage.setItem('token', token);
                }, 1000);

                // redirect
                setTimeout(() => {
                    guardarMensagem(null)
                    router.push('/')
                }, 3000 )
            } catch (error) {
                guardarMensagem(error.message)
                console.log(error);

                setTimeout(() => {
                    guardarMensagem(null)
                }, 2000)
            }
        }
    })

    const mostrarMensagem = () => {
        return (
            <div className="bg-white rounded py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensagem}</p>
            </div>
        )
    }
    
    return (
      <div>
        <Layout>
        { mensagem && mostrarMensagem() }
          <h1 className="text-center text-2xl text-white font-light">Login</h1>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-sm">
              
                <form 
                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={formik.handleSubmit}
                >
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
                {formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">{formik.errors.email}</p>
                  </div>
                ) : null}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
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
                  value="Entrar"
                />
              </form>
            </div>
          </div>
        </Layout>
      </div>
    );
}
export default Login;