import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Order } from '../../components/Order/Order';
import { orders } from '../../http/http';
import { withErrorHandler } from '../../hoc/withErrorHandler/WithErrorHandler';
import  styles from './Orders.module.css';


class OrdersClass extends React.Component<any> {

    public state = { orders: [], loading: false };
    private router: RouteComponentProps;


    constructor(props) {
        super(props);
        const { match, location, history } = this.props;
        this.router = { match, location, history };
    }


    public componentDidMount = async () => {
        try {
            this.setState({ loading: true });
            const res = await orders.get('/orders.json');
            console.log('the orders data ', res.data);
            this.setState({ orders: this.mapArrayFormDatabase(res.data), loading: false });

        } catch (e) {
            this.setState({ loading: false });
        }
    }


    public render() {
        return (
            <div className={styles.Orders}>
                {this.renderOrders()}
            </div>

        );
    }


    private renderOrders() {
        return this.state.orders.map((order: any, index) => {
            return <Order key={order.key} order={order} />;
        });
    }

    private mapArrayFormDatabase(data: {}) {
        return Object.keys(data).map((key) => {
            return { key, ...data[key] };
        });
    }
}


export const Orders = withErrorHandler(OrdersClass, orders);