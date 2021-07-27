import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router';

const USUARIO = gql`
    query obterUsuario{
        obterUsuario{
            id
            nome
            sobrenome
        }
    }
`;
const Header = () => {

    const router = useRouter();
    //query apollo
    const {data, loading, error} = useQuery(USUARIO)
    // console.log(data);
    // console.log(loading);
    // console.log(error);
    
    // loading befor data
    if(loading) return 'Carregando...';

    // Without Info
    if(!data) {
        router.push('/login')
    }

    const {nome, sobrenome} = data.obterUsuario;

    const logout = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    return (
        <div className="sm:flex sm:justify-between mb-6">
            <p className="mr-2 mb-5 lg:mb-0">Olá {nome} {sobrenome}</p>

            <button
                onClick={() => logout() }
                type="button"
                className="bg-blue-800 h-10 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
                >

                Logout
            </button>
        </div>
    );
}

export default Header;