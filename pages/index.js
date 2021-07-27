import Head from "next/head";
import Layout from "../components/Layout";
import Cliente from "../components/Cliente";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

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

const Index = () => {
  const router = useRouter();
  // Apollo Query
  const { data, loading, error } = useQuery(OBTER_CLIENTES_USUARIO);
  console.log(data);
  console.log(loading);
  console.log(error);

  // loading spinner
  if (loading) return "Carregando...";

  // Without Info
  if (!data.obterClientesVendedor) {
    router.push("/login");
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Meine Kunden:</h1>
        <Link href="/novocliente">
          <a className="bg-blue-600 py-2 px-5 mt-3 inline-block text-white rounded hover:bg-gray-600 mb-3 uppercase font-bold w-full lg:w-auto text-center">
            Neuer Kunde +
          </a>
        </Link>

        <div className="overflow-x-scrol">
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-600">
              <tr className="text-white">
                <th className="w-1/5 py-2">Name</th>
                <th className="w-1/5 py-2">Firma</th>
                <th className="w-1/5 py-2">E-Mail</th>
                <th className="w-1/5 py-2">Löschen</th>
                <th className="w-1/5 py-2">Bearbeiten</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.obterClientesVendedor.map((cliente) => (
                <Cliente key={cliente.id} cliente={cliente} />
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
};
export default Index;
