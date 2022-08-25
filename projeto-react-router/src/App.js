import React from 'react';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Tarefas from './pages/Tarefas';
import Sobre from './pages/Sobre';

function App() {
    return(
        <BrowserRouter>
            <div>
                <ul>
                    <li> <Link to="/" > Página Inicial </Link> </li>
                    <li> <Link to="/tarefas" > Tarefas </Link> </li>
                    <li> <Link to="/sobre" > Sobre </Link> </li>
                </ul>

                <hr />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tarefas/*" element={<Tarefas />} />
                    <Route path="/sobre" element={<Sobre />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
