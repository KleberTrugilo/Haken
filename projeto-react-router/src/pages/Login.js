import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

import LoginManager from '../LoginManager';

// location = useLocation();
// locationFrom = location.state.from.pathname;
// console.log(locationFrom);

export default class Login extends Component {

    entrar = () => {
        LoginManager.usuarioLogado = true;
        this.forceUpdate();
    }
    
    render() {
        // const { from } = this.location.state || { from: { pathname: '/' } };

        if (LoginManager.usuarioLogado) {
            return (
                <Navigate to="/" replace={true}/>
            )
        }
        
        return (
            <div>
                <h1>Login</h1>
                <button onClick={this.entrar}> Entrar </button>
            </div>
        );

    }

}