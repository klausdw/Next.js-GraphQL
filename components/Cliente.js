import React from 'react'
import Swal from 'sweetalert2'
import { gql, useMutation } from '@apollo/client'
import Router from 'next/router';

const ELIMINAR_CLIENTE = gql` 
    mutation eliminarCliente($id:ID!){
        eliminarCliente(id:$id)
    }
`;
const OBTER_CLIENTES_USUARIO = gql` 
query obterClientesVendedor{
  obterClientesVendedor{
    id
    nome
    sobrenome
    email
    empresa
  }
}
`;  

const Cliente = ({cliente}) => {

    const [ eliminarCliente ] = useMutation( ELIMINAR_CLIENTE, {
        update(cache) {
            const { obterClientesVendedor } = cache.readQuery({ query: OBTER_CLIENTES_USUARIO });

            cache.writeQuery({
                query: OBTER_CLIENTES_USUARIO,
                data: {
                    obterClientesVendedor: obterClientesVendedor.filter( clienteAtual => clienteAtual.id !== id )
                }
            })
        }
    })

    const { nome, sobrenome, empresa, email, id } = cliente;

    // Excluir Cliente
    const confirmarEliminarCliente = () => {
      // console.log('excluindo ', id);
      Swal.fire({
        title: "Eliminar esse Cliente?",
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
            const { data } = await eliminarCliente({
                variables: {
                    id
                }
            });
            // console.log(data);
            // Show alert
            Swal.fire("Excluido!", data.eliminarCliente, "success");
          } catch (error) {
            console.log(error);
          }
        }
      });
    };

    const editarCliente = () => {
        Router.push({
            pathname: "/editarcliente/[id]",
            query: { id }
        })
    } 



    return (
        <tr key={cliente.id}>
        <td className="border px-4 py-2"> {nome} {sobrenome} </td>
        <td className="border px-4 py-2"> {empresa} </td>
        <td className="border px-4 py-2"> {email} </td>
        <td className="border px-4 py-2"> 
            <button
                type="button"
                className="flex justify-center items-center bg-red-800 py-1 px-2 mx-auto rounded text-white"
                onClick={() => confirmarEliminarCliente() }
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
        </td>

        <td className="border px-4 py-2"> 
            <button
                type="button"
                className="flex justify-center items-center bg-yellow-500 py-1 px-2 mx-auto rounded text-white"
                onClick={() => editarCliente() }
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </button>
        </td>
      </tr>
    );
}

export default Cliente;