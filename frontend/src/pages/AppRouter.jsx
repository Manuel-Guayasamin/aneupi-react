import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import FormularioPage from './FormularioPage';
import FormularioSection from './FormularioSection';
import LoginPage from './LoginPage';
import BibliotecaPage from './BibliotecaPage';
import { useSelector } from 'react-redux';

const AppRouter = () => {
    const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/formulario" component={FormularioSection} />
                <Route path="/adjuntar-formulario">
                    {isAuthenticated ? <FormularioPage /> : <Redirect to="/login" />}
                </Route>
                <Route path="/biblioteca" component={BibliotecaPage} />
            </Switch>
        </Router>
    );
};

export default AppRouter; 