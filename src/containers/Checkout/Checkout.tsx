import * as React from 'react';
import { CheckOutSummarty } from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { RouteComponentProps, Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import connect from '../../store/reducers/BurgerBuilder/index';



export default connect(class Checkout extends React.Component<any> {


    public router: RouteComponentProps;

    constructor(props) {
        super(props);
        const { history, location, match } = this.props as any;
        this.router = { history, location, match };
        console.log('the checkout props', props);
    }

    public onCanceled = () => this.router.history.goBack();
    public onProceed = () => this.router.history.push(this.router.match.url + '/contact-data');
    public render = () => this.renderView();


    private renderView() {
        return !this.props.currentIngredients ? <Redirect to="/builder" /> :
            <div>
                <CheckOutSummarty proceed={this.onProceed} cancel={this.onCanceled} ingredients={this.props.currentIngredients} />
                <Route path={this.router.match.path + '/contact-data'} component={ContactData} />
            </div>
    }
})

