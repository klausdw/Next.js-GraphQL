import React, { useEffect } from "react";
import Layout from "../components/Layout";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { gql, useQuery } from "@apollo/client";

const MELHORES_VENDEDORES = gql`
  query melhoresVendedores {
    melhoresVendedores {
      vendedor {
        nome
        email
      }
      total
    }
  }
`;

const MelhoresVendedores = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(MELHORES_VENDEDORES);
  // console.log(loading);
  // console.log(error);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return "Carregando...";

  console.log(data);

  // console.log(data.melhoresVendedores);

  const { melhoresVendedores } = data;
  // console.log(melhoresVendedores);

  const vendedorGrafica = [];

  melhoresVendedores.map((vendedor, index) => {
    vendedorGrafica[index] = {
      ...vendedor.vendedor[0],
      total: vendedor.total,
    };
  });

  console.log(vendedorGrafica);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Top Verkäufer</h1>

      <ResponsiveContainer width={"99%"} height={550}>
        <BarChart
          className="mt-10"
          width={600}
          height={500}
          data={vendedorGrafica}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3182CE" />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  );
};
export default MelhoresVendedores;
