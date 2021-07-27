import React, { useContext } from 'react'
import PedidoContext from '../../context/pedidos/PedidoContext';

const Total = () => {
  // Context do Pedido
  const pedidoContext = useContext(PedidoContext);
  const { total } = pedidoContext;
//   console.log(total);


    return (
        <div className="flex items-center mt-5 justify-between bg-white p-3 border-solid border-gray-400 shadow">
            <h2 className="text-gray-800 text-lg">Total a pagar: </h2>
            <p className="text-gray-800 mt-0"> {total} €</p>
        </div>
    );
}

export default Total;