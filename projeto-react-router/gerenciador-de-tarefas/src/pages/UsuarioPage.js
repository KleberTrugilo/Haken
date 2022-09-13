import React, { Component } from "react";

import { Form } from 'reactstrap';

import InputForm from "../components/InputForm";

export default class UsuarioPage extends Component {
    state = {};

    onInputChange = (event) => {

    }

    onNomeValidate = (nome) => {

    }

    onEmailValidate = (email) => {

    }

    onSenhaValidate = (senha) => {

    }
    
    render() {
        const { nome, email, senha } = this.state; 
        return(
            <div>
                <Form>
                    <InputForm 
                        label="Nome" id="nome" type="text"  
                        name="nome" placeholder="Nome Completo" value={nome}
                        required={true} onChange={this.onInputChange} 
                        errorMessage="O nome é obrigatório" validator={this.onNomeValidate}
                    />
                    <InputForm 
                        label="E-mail" id="email" type="email"  
                        name="email" placeholder="email@email.com" value={email}
                        required={true} onChange={this.onInputChange} 
                        errorMessage="O e-mail é obrigatório" validator={this.onEmailValidate}
                    />
                    <InputForm 
                        label="Senha" id="senha" type="password"  
                        name="senha" placeholder="********" value={senha}
                        required={true} onChange={this.onInputChange} 
                        errorMessage="A senha é obrigatória" validator={this.onSenhaValidate}
                    />
                </Form>
            </div>
        )
    }
}

