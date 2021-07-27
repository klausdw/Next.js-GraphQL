import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import Swal from 'sweetalert2'

const ATUALIZAR_PEDIDO = gql`
    mutation atualizarPedido($id: ID!, $input : PedidoInput){
        atualizarPedido(id:$id, input:$input){
            estado
        }
    }
`;

const ELIMINAR_PEDIDO = gql`
    mutation eliminarPedido($id:ID!){
        eliminarPedido(id:$id)
    }
`;

const OBTER_PEDIDOS = gql`
    query obterPedidosVendedor {
        obterPedidosVendedor{
        id
    }
}
`;

const Anfrage = ({pedido}) => {
    // extrair informacoes do cliente !!
    const { id, total, cliente: { nome, sobrenome, email, telefone }, estado, cliente } = pedido;
    // console.log(cliente);
    const [ atualizarPedido ] = useMutation(ATUALIZAR_PEDIDO);
    const [ eliminarPedido ] = useMutation(ELIMINAR_PEDIDO, {
        update(cache) {
            const { obterPedidosVendedor } = cache.readQuery({
                query: OBTER_PEDIDOS
            });
            cache.writeQuery({
                query: OBTER_PEDIDOS,
                data: {
                    obterPedidosVendedor: obterPedidosVendedor.filter( pedido => pedido.id !== id )
                }
            })
        }
    });

    const [ estadoPedido, setEstadoPedido ] = useState(estado);
    const [ clase, setClase ] = useState('');

    useEffect(() => {
        if(estadoPedido) {
            setEstadoPedido(estadoPedido)
        }
        clasePedido()
    }, [estadoPedido])

    // modificar cor do estado do pedido
    const clasePedido = () => {
        if(estadoPedido === 'PENDENTE') {
            setClase('border-yellow-300')
        } else if(estadoPedido === 'COMPLETADO') {
            setClase('border-green-500')
        } else if(estadoPedido === 'CANCELADO') {
            setClase('border-red-500')

        }
    } 

    const mudarEstadoPedido = async novoEstado => {
        // console.log(novoEstado);
        try {
            const { data } = await atualizarPedido({
                variables: {
                    id,
                    input: {
                        estado: novoEstado,
                        cliente: cliente.id
                    }
                }
            });
            // console.log(data);
            // console.log(data.atualizarPedido.estado);
            setEstadoPedido(data.atualizarPedido.estado);
        } catch (error) {
            console.log(error);
        }
    }

    const confirmarEliminarPedido = () => {
        Swal.fire({
            title: "Excluir Pedido ?",
            text: "Essa ação não podera ser desfeita !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Excluir!",
            cancelButtonText: "Não, Cancelar",
          }).then( async (result) => {
            if (result.isConfirmed) {
              // console.log('excluindo...', id);
              try {
                // Delete ID
                const data = await eliminarPedido({
                    variables: {
                        id
                    }
                });
                // console.log(data);
                // Show alert
                Swal.fire("Excluido!", data.eliminarPedido, "success");
              } catch (error) {
                console.log(error);
              }
            }
          });
    }

    return (
        <div className={` ${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}> 
            <div> 
                <p className="font-bold text-gray-800">Kunde: {nome} {sobrenome}  </p>
                { email && (
                    <p className="flex items-center my-2"> 
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        {email} 
                    </p>
                )}
                { telefone && (
                    <p className="flex items-center my-2">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        {telefone} 
                    </p>
                )}
                <h2 className="text-gray-800 font-bold mt-10">Status der Bestellung:</h2>

                <select 
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
                    value={estadoPedido}
                    onChange={ e => mudarEstadoPedido(e.target.value) }
                >
                    <option value="COMPLETADO">FERTIG</option>
                    <option value="PENDENTE">Ausstehende</option>
                    <option value="CANCELADO">STORNIERT</option>
                </select>
            </div>
            <div>
                <h2 className="text-gray-800 font-bold mt-2">Zusammenfassung</h2>
                { pedido.pedido.map ( artigo => (
                    <div key={artigo.id} className="mt-4">
                        <p className="text-sm text-gray-600">Produkt: {artigo.nome} </p>
                        <p className="text-sm text-gray-600">Menge: {artigo.quantidade} </p>
                    </div>
                ))}

                <p className="text-gray-800 mt-3 font-bold">Zu Bezahlen: 
                    <span className="font-light"> {total} € </span>
                </p>

                <button
                    className="uppercase text-xs font-bold flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight"
                    onClick={ () => confirmarEliminarPedido() }
                > 
                    Excluir Pedido 
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </div>
        
        </div>
    );
}

export default Anfrage;