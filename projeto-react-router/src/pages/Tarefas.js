import React from 'react';

import { Route, Link, Routes, useParams, useLocation } from 'react-router-dom';

import { TransitionGroup ,CSSTransition } from 'react-transition-group';

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

function CustomLink({ children, to }) {
    const location = useLocation();
    const match = location.pathname === to;

    return (
        <div className={match ? 'active' : ''} >
            {match ? '> ' : ''}
            <Link to={ to } 
                style={{
                    textAlign: 'center',
                    color: 'blue',
                    textDecoration: 'none'
                }} 
            > { children } </Link>
        </div>
    );
}

export default function Tarefas() {
    const location = useLocation();
    const DetalhesDaTarefa = () => {
        const params = useParams();
        const { tarefaId } = params;
        console.log(tarefaId);
        const tarefa = TAREFAS.find((tarefa) => {
            return tarefa.id === parseInt(tarefaId, 10);
        });
    
        if (!tarefa) return null;
    
        return (
                <div style={{
                    width: '40%',
                    height: '200px',
                    textAlign: 'center',
                    backgroundColor: '#CCC',
                    borderRadius: '10px',
                    padding: '1rem 0',
                    margin: 'auto',
                    position: 'absolute'
                }}>
                    <h2>Detalhes</h2>
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
                                    key={tarefa.id}
                                >
                                        <CustomLink
                                            to={`/tarefas/${tarefa.id}`} 
                                        >
                                            {tarefa.titulo} 
                                        </CustomLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div style={{
                    width: '65%',
                    position: 'relative'
                }}>
                    <TransitionGroup component={null}>
                        <CSSTransition
                            key={location.key}
                            timeout={300}
                            classNames="fade"
                            // unmountOnExit
                        >
                            <Routes location={location}>
                                <Route
                                    path=':tarefaId'
                                    element={< DetalhesDaTarefa />} />
                            </Routes>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </div>
        </div>
    )
}
