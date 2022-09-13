import React, { Component } from 'react';
import './App.css';

import { Container } from 'reactstrap';

import UsuarioPage from './pages/UsuarioPage';

class App extends Component {
  render() {
    return (
      <Container className='mt-5'>
        <UsuarioPage />
      </Container>
    );
  }
}
export default App;
