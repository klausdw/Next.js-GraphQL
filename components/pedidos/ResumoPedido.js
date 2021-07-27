import React, { useContext } from "react";
import PedidoContext from '../../context/pedidos/PedidoContext';
import ProdutoResumo from './ProdutoResumo'

const ResumoPedido = () => {
  // Context do Pedido
  const pedidoContext = useContext(PedidoContext);
  const { produtos } = pedidoContext;
  console.log(produtos);

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        3. Quantidades do Produto
      </p>
      {produtos.length > 0 ? (
        <>
          {produtos.map((produto) => (
            <ProdutoResumo key={produto.id} produto={produto} />
          ))}
        </>
      ) : (
        <p className="mt-5 text-sm">Não existe Produtos</p>
      )}
    </>
  );
};

export default ResumoPedido;
