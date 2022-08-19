import './App.css';

import { HashRouter, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Tarefas from './pages/Tarefas';
import Sobre from './pages/Sobre';

function App() {   
    return (
        <HashRouter>
            <div>
                <ul>
                    <li> <Link to="/" > Página Inicial </Link> </li>
                    <li> <Link to="/tarefas" > Tarefas </Link> </li>
                    <li> <Link to="/sobre" > Sobre </Link> </li>
                </ul>

                <br />
                
                <Route path="/" component={Home} />
                <Route path="/tarefas" component={Tarefas} />
                <Route path="/sobre" component={Sobre} />
            </div>
        </HashRouter>
    );
}

export default App;
