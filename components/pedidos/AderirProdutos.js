import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/pedidos/PedidoContext";

const OBTER_PRODUTOS = gql`
  query obterProdutos {
    obterProdutos {
      id
      nome
      existencia
      preco
    }
  }
`;

const AderirProdutos = () => {
  // state local do componente
  const [produtos, setProdutos] = useState([]);

  // Context do Pedido
  const pedidoContext = useContext(PedidoContext);
  const { aderirProdutos } = pedidoContext;

  // Consultar DB
  const { data, loading, error } = useQuery(OBTER_PRODUTOS);

  useEffect(() => {
    // TODO: Funcao para passar a PedidoState
    aderirProdutos(produtos);
    // console.log(produtos);
  }, [produtos]);

  const selecionarProduto = (produto) => {
    setProdutos(produto);
    // console.log(produto);
  };

  if (loading) return null;
  const { obterProdutos } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2. - Escolher ou buscar os Produtos
      </p>
      <Select
        className="mt-3"
        options={obterProdutos}
        onChange={(opcao) => selecionarProduto(opcao)}
        isMulti={true}
        getOptionValue={(opcoes) => opcoes.id}
        getOptionLabel={(opcoes) =>
          `${opcoes.nome} - ${opcoes.existencia} Disponiveis`
        }
        placeholder="Selecionar o Produto"
        noOptionsMessage={() => "Não existe Resultados"}
      />
    </>
  );
};

export default AderirProdutos;
