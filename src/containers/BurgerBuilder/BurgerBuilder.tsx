import * as React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { Modal } from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import { orders } from '../../http/http';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { withErrorHandler } from '../../hoc/withErrorHandler/WithErrorHandler';
import { RouteComponentProps } from 'react-router';
import styles from './builder.module.css';
import connect from '../../store/reducers/BurgerBuilder/index';




class BurgerBuilder extends React.Component {
    private standardPrice = 4;
    private router: RouteComponentProps;

    public state;

    constructor(public props) {
        super(props);

        this.state = {
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
        this.props.addIngredient(type)
    }

    public removeIngredient = (type: string) => {
        this.props.removeIngredient(type)
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
            this.props.addIngredients(res.data)
        } catch (error) {
            console.log('the error');
            this.setState({ error: true });
        }

    }


    public render() {
        // console.log('the props in builder ', this.props);
        let content: any = this.props.ingredients ? this.renderView() : this.showLoader();

        if (this.state.error) { content = <p>Ingredints cannot be loaded</p>; }

        return content;
    }


    private renderView() {
        return (
            <div className={styles.Builder}>
                {this.getModal()}
                <div className={styles.BurgerContainer}>
                    <Burger ingredients={this.props.currentIngredients} />
                </div>
                <div className={styles.ControlsContainer}>
                    <BuildControls
                        ingredients={this.props.ingredients}
                        addIngredient={this.addIngredient}
                        removeIngredient={this.removeIngredient}
                        currentIngredients={this.props.currentIngredients}
                        price={this.props.price}
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
            ingredients={this.props.ingredients}
            price={this.props.price}
        />;
    }


    private renderSpinner() {
        return <Spinner />;
    }
}


export default connect(withErrorHandler(BurgerBuilder, orders));
