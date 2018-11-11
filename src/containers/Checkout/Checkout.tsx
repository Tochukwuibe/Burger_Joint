import * as React from 'react';
import { CheckOutSummarty } from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import { ContactData } from './ContactData/ContactData';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 3
};

export class Checkout extends React.Component {


    public state: { ingredients: {}, price: number };
    public router: RouteComponentProps;

    constructor(props) {
        super(props);
        const { history, location, match } = this.props as any;
        this.router = { history, location, match };
        const ingredients = this.parseIngredientsFormRouter();
        const price = this.getPrice(ingredients);
        this.state = { ingredients, price };
    }



    public onCanceled = () => {
        this.router.history.goBack();
    }

    public onProceed = async () => {
        this.router.history.push(this.router.match.url + '/contact-data');
    }


    private parseIngredientsFormRouter() {

        let { search } = this.router.location;
        search = search.slice(1);

        return search.split('&').reduce((acc, param) => {
            const keyVal = param.split('=');
            return { ...acc, [keyVal[0]]: keyVal[1] };
        }, {});

    }

    private getPrice(ingredients: { [key: string]: number }) {
        return Object.keys(ingredients).map(key => {
            return ingredients[key] * INGREDIENT_PRICES[key];
        })
            .reduce((acc, curr) => acc + curr, 0);
    }

    private renderContactData = (props) => {
        return <ContactData {...props} price={this.state.price} ingredients={this.state.ingredients} />;
    }



    public render() {
        return (
            <div>
                <CheckOutSummarty proceed={this.onProceed} cancel={this.onCanceled} ingredients={this.state.ingredients} />
                <Route path={this.router.match.path + '/contact-data'} render={this.renderContactData} />
            </div>
        );
    }
}

