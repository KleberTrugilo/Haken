import React, {Component} from 'react';

import { BrowserRouter, Routes, Route,
         NavLink, Navigate, useLocation, 
         Outlet,
         useParams } from 'react-router-dom';

import Home from './pages/Home';
import Tarefas from './pages/Tarefas';
import Sobre from './pages/Sobre';
import Login from './pages/Login';
import './App.css';

import LoginManager from './LoginManager';

const PrivateRoutes = () => {
    const location = useLocation();
    return (
        !LoginManager.usuarioLogado
        ? <Navigate to="/login" replace={true} state={{from: location }} />
        : <Outlet />
    );
}

const withRouter = (Component) => {
    const ComponentWithRouterProps = (props) => {
        let location = useLocation();
        let params = useParams();
        return (
            <Component {...props} 
            location={location}
            params={params}
            />
        );
    }
    return ComponentWithRouterProps;
}

const LogoutButton = withRouter((props) => {
    if (!LoginManager.usuarioLogado)
        return null;

    return (
        <button onClick={props.onClick} >Sair</button>
    )
});

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
                        <li>
                            <NavLink
                                className={({ isActive }) => (isActive ? "active" : "notActive")} 
                                to="/" > 
                                    Página Inicial 
                            </NavLink> 
                        </li>
                        <li>
                            <NavLink 
                                className={({ isActive }) => (isActive ? "active" : "notActive")}
                                to="/tarefas" >
                                    Tarefas 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => (isActive ? "active" : "notActive")} 
                                to="/sobre" >
                                    Sobre 
                            </NavLink>
                        </li>
                    </ul>

                    <LogoutButton onClick={this.logout} />
    
                    <hr />
    
                    <Routes>
                        <Route element={<PrivateRoutes />} >
                            <Route path="/" element={<Home animate={true} />} />
                            <Route path="/tarefas/*" element={< Tarefas animate={true} />} />
                            <Route path="/sobre" element={<Sobre animate={true} />} />
                        </Route> 
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
