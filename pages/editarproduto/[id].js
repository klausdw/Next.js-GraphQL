import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const OBTER_PRODUTO = gql`
    query obterUmProduto($id: ID!){
        obterUmProduto(id: $id) {
            nome
            existencia
            preco
        }
    }
`;
const ATUALIZAR_PRODUTO = gql`
mutation atualizarProduto($id: ID!, $input: ProdutoInput){
    atualizarProduto(id:$id, input:$input) {
      id
      nome
      existencia
      preco
    }
  }
`;

const EditarProduto = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  console.log(id);

  // Query Cliente
  const { data, loading, error } = useQuery(OBTER_PRODUTO, {
    variables: { id },
  });

  // Update Mutation
  const [atualizarProduto] = useMutation(ATUALIZAR_PRODUTO);

  // Schema validation
  const schemaValidation = Yup.object({
    nome: Yup.string().required("Nome é obrigratorio"),
    existencia: Yup.number().positive('Só numeros positivos')
                            .integer('A Quantidade tem que ser números inteiros')
                            .required("Quantidade é obrigratoria"),
    preco: Yup.number().positive('Só numeros positivos')
                        .required("Preço é obrigratorio"),
  });

  if (loading) return "Carregando...";
  //   console.log(data.obterUmCliente);

  const { obterUmProduto } = data;

  // Updade in DB
  const atualizarInfoProduto = async (values) => {
    const { nome, existencia, preco } = values;
    try {
      const { data } = await atualizarProduto({
        variables: {
          id,
          input: {
            nome,
            existencia,
            preco
          },
        },
      });
    //   console.log(data);
      // sweet alert
      Swal.fire(
        "Atualizado!",
        "Produto foi atualizado corretamente",
        "success"
      );
      // Redirect
      router.push("/produtos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Produto</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={obterUmProduto}
            onSubmit={(values) => {
              atualizarInfoProduto(values);
              // console.log(values)
              // console.log(functions)
            }}
          >
            {(props) => {
              {
                /* console.log(props); */
              }
              return (
                <div className="flex justify-center mt-5">
                  <div className="w-full max-w-lg">
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
                          placeholder="Nome do Produto"
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
                          htmlFor="existencia"
                        >
                          Quantidade
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                          id="existencia"
                          type="number"
                          placeholder="Quantidade do Produto"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.existencia}
                        />
                      </div>
                      {props.touched.existencia && props.errors.existencia ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">
                            {props.errors.existencia}
                          </p>
                        </div>
                      ) : null}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="preco"
                        >
                          Preço
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                          id="preco"
                          type="number"
                          placeholder="Preço do Produto"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.preco}
                        />
                      </div>
                      {props.touched.preco && props.errors.preco ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">{props.errors.preco}</p>
                        </div>
                      ) : null}
                      <input
                        type="submit"
                        className="bg-gray-600 w-full mt-5 p-2 text-white uppercase hover:bg-gray-800"
                        value="Criar novo Produto"
                      />
                    </form>
                  </div>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarProduto;
