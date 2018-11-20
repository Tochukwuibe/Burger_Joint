import * as React from 'react';
import { RouteComponentProps } from 'react-router';
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


    public componentDidMount = () => this.props.fetchOrders();
    public render = () => this.renderView();



 


    private renderView() {
        return (
            <div className={styles.Orders}>
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


export const Orders = withErrorHandler(connect(OrdersClass), orders);