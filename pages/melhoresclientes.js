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

const MELHORES_CLIENTES = gql`
  query melhoresClientes {
    melhoresClientes {
      cliente {
        nome
        empresa
      }
      total
    }
  }
`;

const MelhoresClientes = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(MELHORES_CLIENTES);
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

  // console.log(data.melhoresClientes);

  const { melhoresClientes } = data;
  // console.log(melhoresClientes);

  const clienteGrafica = [];

  melhoresClientes.map((cliente, index) => {
    clienteGrafica[index] = {
      ...cliente.cliente[0],
      total: cliente.total,
    };
  });

  console.log(clienteGrafica);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Top Kunden</h1>

      <ResponsiveContainer width={"99%"} height={550}>
        <BarChart
          className="mt-10"
          width={600}
          height={500}
          data={clienteGrafica}
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
export default MelhoresClientes;
