import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/pedidos/PedidoContext";

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

const AderirCliente = () => {
  const [cliente, setCliente] = useState([]);

  // Context do Pedido
  const pedidoContext = useContext(PedidoContext);
  const { aderirCliente } = pedidoContext;
  // console.log(pedidoContext);

  // Consultar DB
  const { data, loading, error } = useQuery(OBTER_CLIENTES_USUARIO);

  useEffect(() => {
    aderirCliente(cliente);
  }, [cliente]);

  const selecionarCliente = (clientes) => {
    setCliente(clientes);
  };

  // Resultados
  if (loading) return null;

  const { obterClientesVendedor } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        1. - Escolher um Cliente para o Pedido
      </p>
      <Select
        className="mt-3"
        options={obterClientesVendedor}
        onChange={(opcao) => selecionarCliente(opcao)}
        getOptionValue={(opcoes) => opcoes.id}
        getOptionLabel={(opcoes) => opcoes.nome}
        placeholder="Selecionar o cliente"
        noOptionsMessage={() => "Não existe Resultados"}
      />
    </>
  );
};

export default AderirCliente;
