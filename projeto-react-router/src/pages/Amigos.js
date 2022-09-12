import React from 'react';

import { useParams, Link, Routes, Route } from 'react-router-dom';

const PESSOAS = [
    { id: 1, nome: "Kleber", amigos: [2, 3, 4] },
    { id: 2, nome: "Marcos", amigos: [1] },
    { id: 3, nome: "Renato", amigos: [1, 4] },
    { id: 4, nome: "Danilo", amigos: [1, 3] }
];

const findPessoa = (pessoaId) => {
    const pessoa = PESSOAS.find((pessoa) => {
        return pessoa.id === parseInt(pessoaId, 10);
    });
    return pessoa;
}

export default function Amigos() {
    const { pessoaId } = useParams();
    const pessoa = findPessoa(pessoaId || 1)
    return (
        <div>
            <h3>Amigos do {pessoa.nome}</h3>
            <ul>
                {
                    pessoa.amigos.map((amigoId) => {
                        const amigo = findPessoa(amigoId);
                        return (
                            <li key={amigoId}>
                                <Link to={`/amigos/${amigo.id}`} > {amigo.nome} </Link>                         
                            </li>
                        );
                    })
                }
            </ul>
            <Routes>
                <Route path=':pessoaId' element={ <Amigos />} />
            </Routes>
        </div>
    );
}
