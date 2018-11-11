import * as React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { Modal } from '../../components/UI/Modal/Modal';
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary';
import { orders } from '../../http/http';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { withErrorHandler } from '../../hoc/withErrorHandler/WithErrorHandler';
import { RouteComponentProps } from 'react-router';
import  styles from'./builder.module.css';



const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 3
};

class BurgerBuilder extends React.Component {
    private standardPrice = 4;
    private router: RouteComponentProps;

    public state;

    constructor(public props) {
        super(props);

        this.state = {
            ingredients: null,
            price: this.standardPrice,
            checkout: false,
            loading: false,
            error: false
        };

        const { location, history, match } = this.props;

        this.router = { location, history, match };
    }

    public componentDidMount() {
        this.getIngredients();
    }





    public addIngredient = (type: string) => {

        let newCnt = this.state.ingredients![type] + 1;
        newCnt = newCnt > 0 ? newCnt : 0;
        const ingredients = { ...(this.state.ingredients || {}), [type]: newCnt };
        const price = this.getPrice(ingredients) + this.standardPrice;
        this.setState({ ingredients, price });

    }

    public removeIngredient = (type: string) => {

        let newCnt = this.state.ingredients![type] - 1;
        newCnt = newCnt > 0 ? newCnt : 0;
        const ingredients = { ...(this.state.ingredients || {}), [type]: newCnt };

        const price = this.getPrice(ingredients) + this.standardPrice;
        this.setState({ ingredients, price });

    }

    public onCheckout = (state: boolean) => {
        return () => this.setState({ checkout: state });
    }

    // handels user checkout
    public onCompleteCheckout = async () => {

        const queryParams: string[] = [];
        // tslint:disable-next-line:prefer-const
        for (let i in this.state.ingredients) {
            if (i)
                queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        const querySearch = queryParams.join('&');
        this.router.history.push({ pathname: '/checkout', search: querySearch });
    }




    private async getIngredients() {
        try {

            const res = await orders.get('/ingredients.json');
            console.log('the ingredients res ', res);
            this.setState({ ingredients: res.data });
        } catch (error) {
            console.log('the error');
            this.setState({ error: true });
        }

    }


    public render() {

        let content: any = this.state.ingredients ? this.renderView() : this.showLoader();

        if (this.state.error) { content = <p>Ingredints cannot be loaded</p>; }

        return content;
    }


    private renderView() {
        return (
            <div className={styles.Builder}>
                {this.getModal()}
                <div className={styles.BurgerContainer}>
                    <Burger ingredients={this.state.ingredients!} />
                </div>
                <div className={styles.ControlsContainer}>
                    <BuildControls
                        ingredients={this.state.ingredients!}
                        addIngredient={this.addIngredient}
                        removeIngredient={this.removeIngredient}
                        price={this.state.price}
                        checkout={this.onCheckout(true)}
                    />
                </div>

            </div>
        );
    }


    private showLoader() {
        const style = {
            'display': 'grid',
            'height': '100%',
            'width': '100%',
            'alignItems': 'center',
            'gridTemplate': '1fr 1fr 1fr / 1fr'
        };

        return <div style={style} >
            <div />
            <Spinner />
            <div />
        </div>;
    }


    private getPrice(ingredients: { [key: string]: number }) {
        return Object.keys(ingredients).map(key => {
            return ingredients[key] * INGREDIENT_PRICES[key];
        })
            .reduce((acc, curr) => acc + curr, 0);
    }


    private getModal(): JSX.Element {

        console.log('recalling ger modal', this.state.loading);
        return <Modal
            loading={this.state.loading}
            show={this.state.checkout}
            backDropClicked={this.onCheckout(false)}>
            {!this.state.loading ? this.renderSummary() : this.renderSpinner()}
        </Modal>;

    }

    private renderSummary() {
        return <OrderSummary
            finish={this.onCompleteCheckout}
            cancel={this.onCheckout(false)}
            ingredients={this.state.ingredients}
            price={this.state.price}
        />;
    }


    private renderSpinner() {
        console.log('rendering spinner');
        return <Spinner />;
    }
}


export default withErrorHandler(BurgerBuilder, orders);
