import logo from './logo.svg';
import './App.css';

import Alert from 'react-bootstrap/Alert';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Nosso primeiro projeto com ReactJS e Webpack.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <section className="mt-3">
                <p>{BasicExample()}</p>
            </section>
        </div>
    );
}

function BasicExample() {
    return (
        <>
        {[
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'light',
            'dark',
        ].map((variant) => (
            <Alert key={variant} variant={variant}>
            This is a {variant} alert—check it out!
            </Alert>
        ))}
        </>
    );
}

export default App;
