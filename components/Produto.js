import React from "react";
import Swal from "sweetalert2";
import { gql, useMutation, useQuery } from "@apollo/client";
import Router from "next/router";

const ELIMINAR_PRODUTO = gql`
  mutation eliminarProduto($id: ID!) {
    eliminarProduto(id: $id)
  }
`;
const OBTER_PRODUTO = gql`
  query obterProdutos {
    obterProdutos {
      id
      nome
      existencia
      preco
    }
  }
`;

const Produto = ({ produto }) => {
  const { nome, existencia, preco, id } = produto;

  const [eliminarProduto] = useMutation(ELIMINAR_PRODUTO, {
    update(cache) {
      const { obterProdutos } = cache.readQuery({
        query: OBTER_PRODUTO,
      });
      cache.writeQuery({
        query: OBTER_PRODUTO,
        data: {
          obterProdutos: obterProdutos.filter(
            (produtoAtual) => produtoAtual.id !== id
          ),
        },
      });
    },
  });

  const confirmarEliminarProduto = () => {
    Swal.fire({
      title: "Eliminar esse Produto?",
      text: "Essa ação não podera ser desfeita !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Excluir!",
      cancelButtonText: "Não, Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // console.log('excluindo...', id);
        try {
          const { data } = await eliminarProduto({
            variables: {
              id,
            },
          });
          console.log(data);
          Swal.fire("Excluido!", data.eliminarProduto, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const editarProduto = () => {
    Router.push({
      pathname: "/editarproduto/[id]",
      query: { id },
    });
  };

  return (
    <tr key={produto.id}>
      <td className="border px-4 py-2"> {nome} </td>
      <td className="border px-4 py-2"> {existencia} Stk</td>
      <td className="border px-4 py-2"> {preco} €</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-1 px-2 mx-auto rounded text-white"
          onClick={() => confirmarEliminarProduto()}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </button>
      </td>

      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-yellow-500 py-1 px-2 mx-auto rounded text-white"
          onClick={() => editarProduto()}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Produto;
