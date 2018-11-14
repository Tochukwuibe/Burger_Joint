import * as React from 'react';
import { CheckOutSummarty } from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import connect from '../../store/reducers/BurgerBuilder/index';



export default connect(class Checkout extends React.Component<any> {


    public router: RouteComponentProps;

    constructor(props) {
        super(props);
        const { history, location, match } = this.props as any;
        this.router = { history, location, match };
        
    }

    public onCanceled = () => {
        this.router.history.goBack();
    }

    public onProceed = async () => {
        this.router.history.push(this.router.match.url + '/contact-data');
    }

    public render() {
        return (
            <div>
                <CheckOutSummarty proceed={this.onProceed} cancel={this.onCanceled} ingredients={this.props.currentIngredients} />
                <Route path={this.router.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }
})

