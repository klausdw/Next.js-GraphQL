import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import AderirCliente from '../components/pedidos/AderirCliente'
import AderirProdutos from '../components/pedidos/AderirProdutos'
import ResumoPedido from '../components/pedidos/ResumoPedido'
import Total from '../components/pedidos/Total'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
// Context de Pedidos
import PedidoContext from '../context/pedidos/PedidoContext';

const NOVO_PEDIDO = gql`
    mutation novoPedido($input: PedidoInput){
        novoPedido(input:$input){
            id
    }
  }
`;

const OBTER_PEDIDOS = gql`
query obterPedidosVendedor {
    obterPedidosVendedor{
      id
      pedido{
        id
        quantidade
        nome
      }
      cliente {
          id
          nome
          sobrenome
          email
          telefone
      }
      vendedor
      total
      estado
    }
  }
`;

const NovoPedido = () => {

  const router = useRouter();

  const [ mensagem, setMensagem] = useState(null);

    // Utilizar Context e extrair funciones e valores
    const pedidoContext = useContext(PedidoContext);
    const { cliente, produtos, total } = pedidoContext;

    // Mutation
    const [ novoPedido ] = useMutation(NOVO_PEDIDO, {
      update(cache, { data: { novoPedido } }) {
        const { obterPedidosVendedor } = cache.readQuery({
          query: OBTER_PEDIDOS,
        });
        cache.writeQuery({
          query: OBTER_PEDIDOS,
          data: {
            obterPedidosVendedor: [...obterPedidosVendedor, novoPedido ]
          }
        })
      }
    });    

    const validarPedido = () => {
      return !produtos.every((produto) => produto.quantidade > 0) ||
        total === 0 ||
        cliente.length === 0
        ? "opacity-50 cursor-not-allowed"
        : "";
    };
    const criarNovoPedido = async () => {
      const { id } = cliente;
      // remover outras infos do produto
      const pedido = produtos.map(( {__typename, existencia, ...produto }) => produto)
      // console.log(pedido);

      try {
        const { data } = await novoPedido({
          variables: {
            input: {
              cliente: id,
              total,
              pedido
            }
          }
        })
        // console.log(data);
        // Redirect
        router.push("/pedidos")
        // Alert
        Swal.fire(
          'Correto',
          'O Pedido foi adicionado com sucesso',
          'success'
        )
      } catch (error) {
        setMensagem(error.message);

        setTimeout(() => {
          setMensagem(null)
        }, 8000);
        // console.log(error);
      }
    }

    const mostrarMensagem = () => {
      return (
        <div className="bg-red-600 shadow rounded py-2 px-3 my-3 w-full max-w-sm text-center text-white mx-auto">
          <p> {mensagem} </p>
        </div>
      )
    }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Criar Novo Pedido</h1>

      { mensagem && mostrarMensagem() }
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AderirCliente />
          <AderirProdutos />
          <ResumoPedido />
          <Total />

          <button
            onClick={ () => criarNovoPedido() }
            type="button"
            className={` bg-gray-600 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${ validarPedido() }`}
          >
            Confirmar Pedido
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NovoPedido;
