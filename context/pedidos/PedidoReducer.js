import {
  SELECIONAR_CLIENTE,
  SELECIONAR_PRODUTO,
  QUANTIDADE_PRODUTOS,
  ATUALIZAR_TOTAL,
} from "../../types";

const PedidoReducer = (state, action) => {
  switch (action.type) {
    case SELECIONAR_CLIENTE:
      return {
        ...state,
        cliente: action.payload,
      };
    case SELECIONAR_PRODUTO:
      return {
        ...state,
        produtos: action.payload,
      };
    case QUANTIDADE_PRODUTOS:
      return {
        ...state,
        // buscar o ID do produto e add a nova quantidade
        produtos: state.produtos.map((produto) =>
          produto.id === action.payload.id
            ? (produto = action.payload)
            : produto
        ),
      };
      case ATUALIZAR_TOTAL:
          return {
              ...state,
              total: state.produtos.reduce( (novoTotal, artigo) => novoTotal += artigo.preco * artigo.quantidade, 0 )
          }
    default:
      return state;
  }
};
export default PedidoReducer;
