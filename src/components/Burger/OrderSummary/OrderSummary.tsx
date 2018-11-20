import * as React from 'react';
import Button from '../../UI/Button/Button';
import connect from '../../../store/reducers/BurgerBuilder/index'


export default connect(class OrderSummary extends React.Component<any> {





    public componentWillUpdate(nextProps, nextState) {
    }



    private getIngredientsSummary(ings: { [key: string]: number }) {
        if (!ings) return null;
        return Object.keys(ings).map((key, i) => {
            return <li key={key + i}> <span style={{ textTransform: 'capitalize' }}>{key}</span> - {ings[key]}</li>;
        });
    }




    public render() {
        const props = this.props;
        const { currentIngredients, finish, cancel, price }: any = props;

        const btnStyle = {
            display: 'grid',
            'gridTemplate': '1fr / 1fr 1fr',
            'alignItems': 'center'
        };

        return <>
            <h3 style={{ textAlign: 'center' }}>Your order</h3>
            <p style={{ textAlign: 'center' }}>A delicious burger with the following ingredients</p>
            <ul>
                {this.getIngredientsSummary(currentIngredients)}
            </ul>
            <p style={{ textAlign: 'center' }}>Total ${price.toFixed(2)}</p>
            <p style={{ textAlign: 'center' }}>Continue to Checkout?</p>
            <div style={btnStyle}>
                <Button clicked={finish} btnType='Success'>Finish</Button>
                <Button clicked={cancel} btnType='Danger'>Cancel</Button>
            </div>;
        </>;
    }

})


