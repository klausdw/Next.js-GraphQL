import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const OBTER_CLIENTES_USUARIO = gql`
  query obterClientesVendedor {
    obterClientesVendedor {
      id
      nome
      sobrenome
      email
      empresa
    }
  }
`;

const NOVO_CLIENTE = gql`
  mutation novoCliente($input: ClientInput) {
    novoCliente(input: $input) {
      id
      nome
      sobrenome
      empresa
      email
      telefone
    }
  }
`;

const novocliente = () => {
  const router = useRouter();

  const [mensagem, guardarMensagem] = useState(null);

  // Cache from Apollo
  const [novoCliente] = useMutation(NOVO_CLIENTE, {
    update(cache, { data: { novoCliente } }) {
      // Find and "copy" the Cache
      const { obterClientesVendedor } = cache.readQuery({
        query: OBTER_CLIENTES_USUARIO,
      });
      // Rewrite Cache
      cache.writeQuery({
        query: OBTER_CLIENTES_USUARIO,
        data: {
          obterClientesVendedor: [...obterClientesVendedor, novoCliente],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      nome: "",
      sobrenome: "",
      empresa: "",
      email: "",
      telefone: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string().required("Nome é obrigratorio"),
      sobrenome: Yup.string().required("Sobrenome é obrigratorio"),
      empresa: Yup.string().required("Empresa é obrigratoria"),
      email: Yup.string()
        .email("Email não é validado")
        .required("E-Mail é obrigatorio"),
    }),
    onSubmit: async (valores) => {
      const { nome, sobrenome, empresa, email, telefone } = valores;
      try {
        const { data } = await novoCliente({
          variables: {
            input: {
              nome,
              sobrenome,
              empresa,
              email,
              telefone,
            },
          },
        });
        // console.log(data.novoCliente);
        // redirect
        router.push("/");
      } catch (error) {
        // console.log(error);
        guardarMensagem(error.message);
        console.log(error);

        setTimeout(() => {
          guardarMensagem(null);
        }, 3000);
      }
    },
  });

  const mostrarMensagem = () => {
    return (
      <div className="bg-white rounded py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensagem}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Novo Cliente</h1>
      {mensagem && mostrarMensagem()}
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
                Vorname
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="nome"
                type="nome"
                placeholder="Vorname"
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
                htmlFor="sobrenome"
              >
                Nachname
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="sobrenome"
                type="sobrenome"
                placeholder="Nachname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sobrenome}
              />
            </div>
            {formik.touched.sobrenome && formik.errors.sobrenome ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">{formik.errors.sobrenome}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="empresa"
              >
                Firma
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="empresa"
                type="empresa"
                placeholder="Firma"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.empresa}
              />
            </div>
            {formik.touched.empresa && formik.errors.empresa ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">{formik.errors.empresa}</p>
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
                htmlFor="telefone"
              >
                Telefonnummer
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 "
                id="telefone"
                type="tel"
                placeholder="Telefonnummer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefone}
              />
            </div>
            {formik.touched.telefone && formik.errors.telefone ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">{formik.errors.telefone}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-gray-600 w-full mt-5 p-2 text-white uppercase hover:bg-gray-800"
              value="Registar Cliente"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default novocliente;
