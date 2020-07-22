import React from 'react';
import { Route } from 'react-router-dom';
import NotAuthen from '../pages/NotAuthen';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={ props => {
            if (localStorage && localStorage.getItem('token')) return (
                <Component {...props}/>
            ); else return (
                <NotAuthen />
            );
        }}
    />
)

export default (PrivateRoute);