import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2'

const OBTER_CLIENTE = gql`
  query obterUmCliente($id: ID!) {
    obterUmCliente(id: $id) {
      nome
      sobrenome
      empresa
      email
      telefone
    }
  }
`;
const ATUALIZAR_CLIENTE = gql`
mutation atualizarCliente($id: ID!, $input : ClientInput){
    atualizarCliente(id: $id, input:$input){
      nome 
      email
    }
  }
`;

const EditarCliente = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  console.log(id);

  // Query Cliente
  const { data, loading, error } = useQuery(OBTER_CLIENTE, {
    variables: { id },
  });

  // Update Mutation
  const [ atualizarCliente ] = useMutation(ATUALIZAR_CLIENTE)



  //   console.log(data);
  //   console.log(loading);
  //   console.log(error);

  // Schema validation
  const schemaValidation = Yup.object({
    nome: Yup.string().required("Nome é obrigratorio"),
    sobrenome: Yup.string().required("Sobrenome é obrigratorio"),
    empresa: Yup.string().required("Empresa é obrigratoria"),
    email: Yup.string()
      .email("Email não é validado")
      .required("E-Mail é obrigatorio"),
  });



  if (loading) return "Carregando...";
//   console.log(data.obterUmCliente);

  const { obterUmCliente } = data;

  // Updade in DB
  const atualizarInfoCliente = async values => {
    const { nome, sobrenome, empresa, email, telefone } = values;
    try {
        const { data } = await atualizarCliente({
            variables: {
                id,
                input: {
                    nome,
                    sobrenome,
                    empresa,
                    email,
                    telefone
                }
            }
        });
        console.log(data);
        // sweet alert
        Swal.fire(
            "Atualizado!", 
            "Cliente foi atualizado corretamente", 
            "success");
        // TODO: Redirect
        router.push('/')
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={ schemaValidation }
            enableReinitialize
            initialValues={ obterUmCliente }
            onSubmit={ ( values ) => {
                atualizarInfoCliente(values)
                // console.log(values)
                // console.log(functions)
            }}
          >
            {(props) => {
              {/* console.log(props); */}
              return (
                <form
                  onSubmit={props.handleSubmit}
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
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
                      placeholder="Nome do Cliente"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.nome}
                    />
                  </div>
                    {props.touched.nome && props.errors.nome ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">{props.errors.nome}</p>
                        </div>
                    ) : null}
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
                      placeholder="Sobrenome do Cliente"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.sobrenome}
                    />
                  </div>
                  {props.touched.sobrenome && props.errors.sobrenome ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">{props.errors.sobrenome}</p>
                        </div>
                    ) : null}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="empresa"
                    >
                      Empresa
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                      id="empresa"
                      type="empresa"
                      placeholder="Empresa do Cliente"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.empresa}
                    />
                  </div>
                  {props.touched.empresa && props.errors.empresa ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">{props.errors.empresa}</p>
                        </div>
                    ) : null}
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
                      placeholder="E-Mail do Cliente"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                    />
                  </div>
                  {props.touched.email && props.errors.email ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">{props.errors.email}</p>
                        </div>
                    ) : null}
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
                      placeholder="Telefone do Cliente"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.telefone}
                    />
                  </div>

                  <input
                    type="submit"
                    className="bg-gray-600 w-full mt-5 p-2 text-white uppercase hover:bg-gray-800"
                    value="Editar Cliente"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarCliente;

