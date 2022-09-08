import React from 'react';

import { Route, NavLink, Routes, useParams } from 'react-router-dom';

import '../App.css';

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

export default function Tarefas() {
    const DetalhesDaTarefa = () => {
        const { tarefaId } = useParams();
        const tarefa = TAREFAS.find((tarefa) => {
            return tarefa.id === parseInt(tarefaId, 10);
        });
    
        if (!tarefa) return null;
    
        return (
                <div>
                     <h3>{tarefa.id}: {tarefa.titulo}</h3>
                     <br />
                     <p>
                        {tarefa.descricao}
                     </p>
                </div>
        );
    }

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
                        listStyleType: 'none',
                        textAlign: 'center',
                        paddingInlineStart: '0',
                    }}>
                    {TAREFAS.map((tarefa) => {
                        return (
                            <li 
                                style={{textAlign: 'center',}}
                                key={tarefa.id}
                            >
                                    <NavLink 
                                        className={({ isActive }) => (isActive ? "active" : "notActive")} 
                                        to={`/tarefas/${tarefa.id}`} 
                                    >
                                        {tarefa.titulo} 
                                    </NavLink>
                            </li>
                        )
                    })}

                    </ul>
                </div>
                <div style={{
                    width: '65%',
                }}>
                    <div style={{
                        width: '40%',
                        height: '200px',
                        textAlign: 'center',
                        backgroundColor: '#CCC',
                        borderRadius: '10px',
                        padding: '1rem 0',
                        margin: 'auto',
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
        </div>
    )
}
