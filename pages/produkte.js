import Layout from "../components/Layout";
import Produto from "../components/Produto";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

const PRODUTOS = gql`
  query obterProdutos {
    obterProdutos {
      id
      nome
      existencia
      preco
      criado
    }
  }
`;

const Produtos = () => {
  const { data, loading, error } = useQuery(PRODUTOS);

  if (loading) return "Carregando ...";

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Produtos</h1>
        <Link href="/novoproduto">
          <a className="bg-blue-600 py-2 px-5 mt-3 inline-block text-white rounded hover:bg-gray-600 mb-3 uppercase font-bold">
            Neues Produkt +
          </a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-600">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Menge</th>
              <th className="w-1/5 py-2">Preis pro Stück</th>
              <th className="w-1/5 py-2">Löschen</th>
              <th className="w-1/5 py-2">Bearbeiten</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obterProdutos.map((produto) => (
              <Produto key={produto.id} produto={produto} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};
export default Produtos;
