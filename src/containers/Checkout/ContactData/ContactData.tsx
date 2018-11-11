import * as React from 'react';
import Button from '../../../components/UI/Button/Button';
// import { orders } from '../../../http/http';
// import { RouteComponentProps } from 'react-router';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import { Input, formControl } from '../../../components/UI/FormControls/Input/input';
import  styles from './contactData.module.css';


export class ContactData extends React.Component<any> {

    public state;
    // private router: RouteComponentProps;


    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: formControl('input', { name: 'name', type: 'text', placeholder: 'Name...', label: 'Name' }),
                email: formControl('input', { name: 'email', type: 'text', placeholder: 'Email...', label: 'email' }),
                street: formControl('input', { name: 'street',  type: 'text', placeholder: 'Street...', label: 'street' }),
                postalCode: formControl('input', {  name: 'postalCode', type: 'text', placeholder: 'PostalCode...', label: 'PostalCode' }),
                deliveryMethod: formControl('select', {
                    label: 'Delivery Method',
                    name: 'deliveryMethod',
                    options: [
                        { value: 'express', display: 'Express' },
                        { value: 'basic', display: 'Basic' }
                    ]
                })
            },
            loading: false
        };
        // const { match, history, location } = this.props;
        // this.router = { match, history, location };
    }


    public render() {
        console.log('the props in contact data ', this.props);
        return (
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {this.renderView()}
                
            </div>
        );
    }


    public onFormInputChange(key) {
        return ({ target }) => this.setState({ [key]: target.value });
    }


    private onSubmit = async (e) => {
        e.preventDefault();
        console.log('the submit event ', this.mapFormValue(e.target));
        // try {
        //     this.setState({ loading: true });
        //     await orders.post('/orders.json', this.createOrder());
        //     this.setState({ loading: false });
        //     this.router.history.replace('/checkout/user-info');

        // } catch (err) {
        //     console.log('the error ', err);
        //     this.setState({ loading: false });
        // }
    }


    private renderView(): React.ReactNode {
        return this.state.loading ?
            <Spinner /> :
            <form onSubmit={this.onSubmit}>
                {this.renderInputs(this.state.form)}
                <Button  type="submit"  btnType="Success">Order</Button>
            </form>;
    }

    // private createOrder() {
    //     return {
    //         ingredients: this.props.ingredients,
    //         price: this.props.price,
    //         customer: {
    //             name: this.state.name,
    //             address: this.state.address,
    //             email: this.state.email
    //         },
    //         deliveryMethod: 'fast'
    //     };
    // }


    private mapFormValue(form: HTMLFormElement) {
        const formVal = {};
        for (const  e in form.elements) {
            if(e)
            formVal[e] = form.elements[e].nodeValue;
        };
        return formVal;
    }
    

    private renderInputs(form) {
        return Object.keys(form).map((key) => {
            return { ...form[key] };
        })
        .map((control, index) => <Input key={index} {...control} />);
    }



}

