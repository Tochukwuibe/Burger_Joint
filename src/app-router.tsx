import * as React from 'react';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Checkout } from './containers/Checkout/Checkout';
import Layout from './hoc/Layout/layout';
import { Orders } from './containers/Orders/Orders';



const routes = [
    {
        path: '/builder',
        component: BurgerBuilder
    },
    {
        path: '/checkout',
        component: Checkout
    },
    {
        path: '/orders',
        component: Orders
    }
];




const renderNotFound = () => <h1>Page not found</h1>;


const AppRouter = (props) => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    {
                        routes.map(({ path, component }) => {
                            return <Route key={path} path={path} component={component} />;
                        })
                    }
                    <Redirect exact={true} from='/' to='/builder' />;
                <Route render={renderNotFound} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
};

export default AppRouter;