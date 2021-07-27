import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from 'sweetalert2'

const NOVO_PRODUTO = gql`
    mutation novoProduto($input: ProdutoInput){
        novoProduto(input: $input){
            id
            nome
            existencia
            preco
        }
    }
`;
const PRODUTOS = gql`
  query obterProdutos {
    obterProdutos {
      id
      nome
      existencia
      preco
      criado
    }
  }
`;

const NovoProduto = () => {

    const router = useRouter();

    const [ novoProduto ] = useMutation(NOVO_PRODUTO, {
        update(cache, { data: { novoProduto } }) {
            const { obterProdutos } = cache.readQuery({ query: PRODUTOS });

            cache.writeQuery({ 
                query: PRODUTOS, 
                data: {
                    obterProdutos: [...obterProdutos, novoProduto]
                } 
            })
        }
    })

    // Form
    const formik = useFormik({
        initialValues: {
            nome: '',
            existencia: '',
            preco: '',
        },
        validationSchema: Yup.object({
            nome: Yup.string()
                        .required('Nome do produto é obrigatorio'),
            existencia: Yup.number()
                            .required('Quantidade é obrigatorio')
                            .positive('Só numeros positivos')
                            .integer('A Quantidade tem que ser números inteiros'),
            preco: Yup.number()
                        .required('Preço é obrigatorio')
                        .positive('Só numeros positivos')
        }),
        onSubmit: async valores => {
            const { nome, existencia, preco } = valores;
            try {
                const { data } = await novoProduto({
                    variables:{
                        input:{
                            nome,
                            existencia,
                            preco
                        }
                    }
                })
                console.log(data);
                // sweet alert
                Swal.fire(
                    'Criado',
                    'O Produto foi criado corretamente',
                    'success'

                )

                // Redirect
                router.push('/produtos')
            } catch (error) {
                console.log(error);
            }
        }

    })
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Criar novo produto</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            onSubmit={formik.handleSubmit}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nome}
              />
            </div>
            {formik.touched.nome && formik.errors.nome ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">{formik.errors.nome}</p>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.existencia}
              />
            </div>
            {formik.touched.existencia && formik.errors.existencia ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">{formik.errors.existencia}</p>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.preco}
              />
            </div>
            {formik.touched.preco && formik.errors.preco ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">{formik.errors.preco}</p>
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
    </Layout>
  );
};

export default NovoProduto;
