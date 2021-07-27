import Head from "next/head";
import Layout from "../components/Layout";
import Anfrage from "../components/Anfrage";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

const OBTER_PEDIDOS = gql`
  query obterPedidosVendedor {
    obterPedidosVendedor {
      id
      pedido {
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

const Bestellung = () => {
  const { data, loading, error } = useQuery(OBTER_PEDIDOS);
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  if (loading) return "Carregando...";

  const { obterPedidosVendedor } = data;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">
        Meine Bestellungen:{" "}
      </h1>

      <Link href="/novopedido">
        <a className="bg-blue-600 py-2 px-5 mt-3 inline-block text-white rounded hover:bg-gray-600 mb-3 uppercase font-bold">
          Neue Bestellung +
        </a>
      </Link>

      {obterPedidosVendedor.length === 0 ? (
        <p className="mt-5 text-center text-2xl">Es gibt keine Bestellung</p>
      ) : (
        obterPedidosVendedor.map((pedido) => (
          <Anfrage key={pedido.id} pedido={pedido} />
        ))
      )}
    </Layout>
  );
};
export default Bestellung;
