import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer'

import {
    SELECIONAR_CLIENTE,
    SELECIONAR_PRODUTO,
    QUANTIDADE_PRODUTOS,
    ATUALIZAR_TOTAL
} from '../../types'

const PedidoState = ({children}) => {

    // State dos Pedidos
    const initialState = {
        cliente: {},
        produtos: [],
        total: 0
    }

    const [ state, dispatch ] = useReducer(PedidoReducer, initialState);

    // Modificar o Cliente
    const aderirCliente = cliente => {
        
        dispatch({
            type: SELECIONAR_CLIENTE,
            payload: cliente
        })
        
        // console.log(cliente);
    }

    // Modifica os Produtos
    const aderirProdutos = produtosSelecionados => {
        // console.log(produtos);
        let novoState;
        if(state.produtos.length > 0) {
            // tomar o segundo valor, quantidade e adicionar ao valor inicial 
            novoState = produtosSelecionados.map( produto => {
                // antes de adicionar um novo produto, novoObjeto faz uma copia do objeto anterior
                // antes de adicionar a um novo
                // ao adicionar um novo produto, perde-se a quantidade do produto anterior
                const novoObjeto = state.produtos.find( produtoState => produtoState.id === produto.id );
                return {
                    ...produto,
                    ...novoObjeto
                }
            })
        } else {
            novoState = produtosSelecionados;
        }

        dispatch({
            type: SELECIONAR_PRODUTO,
            payload: novoState
        })
    }
    // Modifica as quantidade dos produtos
    const quantidadeProdutos = novoProduto => {
        dispatch({
            type: QUANTIDADE_PRODUTOS,
            payload: novoProduto
        })
        // console.log(novoProduto);
        // console.log('State');
    }

    const atualizarTotal = () => {
        dispatch({
            type: ATUALIZAR_TOTAL
        })
        // console.log('calculando....');
    }

    return (
        <PedidoContext.Provider
            value={{
                cliente: state.cliente,
                produtos: state.produtos,
                total: state.total,
                aderirCliente,
                aderirProdutos,
                quantidadeProdutos,
                atualizarTotal,
            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;