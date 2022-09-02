import React, {Component} from 'react';

import { BrowserRouter, Routes, Route,
         Link, Navigate, useLocation, 
         Outlet } from 'react-router-dom';

import Home from './pages/Home';
import Tarefas from './pages/Tarefas';
import Sobre from './pages/Sobre';
import Login from './pages/Login';

import LoginManager from './LoginManager';

// let loggedUser  = LoginManager.usuarioLogado;

const PrivateRoutes = () => {
    const location = useLocation();
    return (
        !LoginManager.usuarioLogado
        ? <Navigate to="/login" replace={true} state={{from: location }} />
        : <Outlet />
    );
}

// const withRouter = (Component) => {
//     const ComponentWithRouterProps = (props) => {
//         return (
//             <Component {...props} />
//         );
//     }
//     return ComponentWithRouterProps;
// }

// const LogoutButton = withRouter((props) => {
//     if (!LoginManager.usuarioLogado)
//         return null;

//     return (
//         <button {...props} >Sair</button>
//     )
// });

const LogoutButton = (props) => {
    if(!LoginManager.usuarioLogado) {
        return null; 
    } else {
        return (
            <button {...props} >Sair</button>
        );
    }
}

class App extends Component {
    logout = () => {
        LoginManager.usuarioLogado = false;
        this.forceUpdate();
    }
    
    render() {
        return(
            <BrowserRouter>
                <div>
                    <ul>
                        <li> <Link to="/" > Página Inicial </Link> </li>
                        <li> <Link to="/tarefas" > Tarefas </Link> </li>
                        <li> <Link to="/sobre" > Sobre </Link> </li>
                    </ul>

                    <LogoutButton onClick={this.logout} />
    
                    <hr />
    
                    <Routes>
                        <Route element={<PrivateRoutes />} >
                            <Route path="/" element={<Home />} />
                            <Route path="/tarefas/*" element={< Tarefas/>} />
                            <Route path="/sobre" element={<Sobre />} />
                        </Route> 
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
