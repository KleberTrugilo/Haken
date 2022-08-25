import React from 'react';

import { Route, Link, Routes, useParams, Outlet } from 'react-router-dom';

const TAREFAS = [
    {
        id: 1,
        titulo: 'Tarefa 1',
        descricao: 'Descrição 1'
    }, {
        id: 2,
        titulo: 'Tarefa 2',
        descricao: 'Descrição 2'
    }, {
        id: 3,
        titulo: 'Tarefa 3',
        descricao: 'Descrição 3'
    }, {
        id: 4,
        titulo: 'Tarefa 4',
        descricao: 'Descrição 4'
    }, {
        id: 5,
        titulo: 'Tarefa 5',
        descricao: 'Descrição 5'
    }
]

const DetalhesDaTarefa = () => {
    const { tarefaId } = useParams();
    return (
        <>
            <div> Detalhes da tarefa { tarefaId } </div>

            <Outlet />
        </>
    );
}

export default function Tarefas() {
    return(
        <div>
            <h1>Tarefas</h1>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <div style={{
                    width: '35%',
                    textAlign: 'center'
                }}>
                    <h2>Lista</h2>
                    <ul style={{
                        listStyleType: 'decimal',
                        textAlign: 'center',
                    }}>
                    {TAREFAS.map((tarefa) => {
                        return( 
                            <li style={{
                                textAlign: 'center',
                            }}>
                                <Link to={ `/tarefas/${tarefa.id}` } >
                                    { tarefa.titulo }
                                </Link>
                            </li>
                            );
                    })}

                    </ul>
                </div>
                <div style={{
                    width: '65%',
                    textAlign: 'center',
                }}>
                    <h2>Detalhes</h2>
                    <Routes>
                            <Route 
                                path=':tarefaId' 
                                element={< DetalhesDaTarefa />} 
                            />
                    </Routes>
                </div>
            </div>
        </div>
    )

}
