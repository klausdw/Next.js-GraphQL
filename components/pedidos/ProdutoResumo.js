import React, { useContext, useState, useEffect } from 'react'
import PedidoContext from '../../context/pedidos/PedidoContext';

const ProdutoResumo = ({produto}) => {
    
    // Context do Pedido
    const pedidoContext = useContext(PedidoContext);
    const { quantidadeProdutos, atualizarTotal } = pedidoContext;
    // console.log(quantidadeProdutos);
    
    const [ quantidade, setQuantidade ] = useState();

    useEffect(() => {
        atualizarQuantidade();
        atualizarTotal();
    }, [quantidade]);

    const atualizarQuantidade = () => {
        const novoProduto = { ...produto, quantidade: Number(quantidade) }
        quantidadeProdutos(novoProduto);
        // console.log(novoProduto);
    }
    
    const { nome, preco } = produto;
  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm"> {nome} </p>
        <p> {preco} €</p>
      </div>
      <input
        type="number"
        placeholder="Quantidade"
        className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        onChange={ e => setQuantidade(e.target.value) }
        value={quantidade}
      />
    </div>
  );
}

export default ProdutoResumo;