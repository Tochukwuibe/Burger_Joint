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

    private router: RouteComponentProps;

    public state;

    constructor(public props) {
        super(props);
        this.state = { checkout: false };
        const { location, history, match } = this.props;
        this.router = { location, history, match };
    }


    public componentDidMount = () => this.props.fetchIngredients();
    public render = () => this.renderView();


    private addIngredient = (type: string) => this.props.addIngredient(type)
    private removeIngredient = (type: string) => this.props.removeIngredient(type)
    private onCheckout = (state: boolean) => () => this.setState({ checkout: state });
    private onCompleteCheckout = () => { this.props.initCheckout(); this.router.history.push({ pathname: '/checkout' }); }








    private renderView() {

        let content: any = !this.props.ingredients ?
            this.showLoader()
            :
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
            </div>;

        if (this.props.error) { content = <p>Ingredints cannot be loaded</p> }

        return content;
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

        console.log('recalling ger modal', this.props.loading);
        return <Modal
            loading={this.props.loading}
            show={this.state.checkout}
            backDropClicked={this.onCheckout(false)}>
            {!this.props.loading ? this.renderSummary() : this.renderSpinner()}
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
