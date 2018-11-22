import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Order } from '../../components/Order/Order';
import { orders } from '../../http/http';
import { withErrorHandler } from '../../hoc/withErrorHandler/WithErrorHandler';
import styles from './Orders.module.css';
import connect from '../../store/reducers/Orders/index';
import { Spinner } from '../../components/UI/Spinner/Spinner';


class OrdersClass extends React.Component<any> {

    public state = { orders: [], loading: false };
    private router: RouteComponentProps;


    constructor(props) {
        super(props);
        const { match, location, history } = this.props;
        this.router = { match, location, history };
    }


    public componentWillMount() {
        console.log('the props in orders', this.props);
        if (!this.props.authenticated) {
            this.router.history.push('/builder');
        }
    }

    public componentDidMount = () => this.props.fetchOrders(this.props.token, this.props.userId);
    public render = () => this.renderView();






    private renderView() {
        return (
            <div className={styles.Orders}>
                {!this.props.authenticated ? <Redirect to="/builder" /> : null}
                {!this.props.loading ? this.renderOrders() : <Spinner />}
            </div>

        );
    }

    private renderOrders() {
        return this.props.orders.map((order: any, index) => {
            return <Order key={order.id} order={order} />;
        });
    }
}


export default withErrorHandler(connect(OrdersClass), orders);