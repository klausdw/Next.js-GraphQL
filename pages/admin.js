import Layout from "../components/Layout";
import Cv from '../components/Cv'
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from 'next/link'

const CVS = gql`
query obterCurriculum{
    obterCurriculum{
      id
      dadosPessoais {
        nome
        sobrenome
        email
        profissao
        nacionalidade
        telefone
        nascimento
              estadoCivil
        filhos
        endereco
        cidade
        cep
        estado
        cnh
      }
      formacao {
        data
        titulo
        local
      }
      experiencia {
        data
        funcao
        local
      }
      pratico {
        data
        funcao
        local
      }
      cursos {
        data
        titulo
        local
      }
      idiomas {
        nome
        nivel
      }
      candidato{
        nome
        sobrenome
        email
        criado
        rol
      }
    }
  }
`;

const Admin = () => {
    const { data, loading, error } = useQuery(CVS);
    console.log(data);
    console.log(loading);
    console.log(error);

  if(loading) return 'Carregando ...'

  const { obterCurriculum } = data;

  return (

      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Admin</h1>   

        { obterCurriculum.length === 0 ? (
            <p className="mt-5 text-center text-2xl">Não existem Curriculum</p>
            ) : (
              obterCurriculum.map( curriculum => (
                    <Cv 
                        key={curriculum.id}
                        curriculum={curriculum}
                    />

                ))
            )
        }
      </Layout>

  );
};
export default Admin;
