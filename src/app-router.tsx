import * as React from 'react';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/layout';
import Logout from './containers/Logout/Logout';
import { connect } from 'react-redux';
import { asyncComp } from './hoc/asyncComp/AsyncComp';




const routes = [
    {
        path: '/builder',
        component: BurgerBuilder
    },
    {
        path: '/checkout',
        component: asyncComp(() => import('./containers/Checkout/Checkout')),
        authGuard: true
    },
    {
        path: '/orders',
        component: asyncComp(() => import('./containers/Orders/Orders')),
        authGuard: true
    },
    {
        path: '/auth',
        component: asyncComp(() => import('./containers/Auth/auth'))
    },
    {
        path: '/logout',
        component: Logout
    }
];




const renderNotFound = () => <h1>Page not found</h1>;



const AppRouter = (props) => {
    console.log('the router props ', props);

    function renderRoutes(isAuth) {
        return routes.map(({ path, component, authGuard }) => {
            if (!authGuard) return  <Route key={path} path={path} component={component} />
            return isAuth ? <Route key={path} path={path} component={component} /> : null;
        })
    }

    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    {renderRoutes(props.isAuth)}
                    <Redirect exact={true} from='/' to='/builder' />;
                <Route render={renderNotFound} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
};





const mapStateToProps = ({ auth }) => {
    return {
        isAuth: auth.authenticated
    }
}




export default connect(mapStateToProps, null)(AppRouter);