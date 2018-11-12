import * as React from 'react';
import Button from '../../../components/UI/Button/Button';
import { orders } from '../../../http/http';
import { RouteComponentProps } from 'react-router';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import { Input, formControl } from '../../../components/UI/FormControls/Input/input';
import styles from './contactData.module.css';


export class ContactData extends React.Component<any> {

    public state: { form: any, loading: boolean };
    private router: RouteComponentProps;


    constructor(props) {
        super(props);
        this.state = {
            form: this.initializeForm(),
            loading: false,
        };
        const { match, history, location } = this.props;
        this.router = { match, history, location };
    }


    public render() {
        return (
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {this.renderView()}

            </div>
        );
    }

    public onFormInputChanged = (controlName) => {
        return (value) => {
            const newForm = { ...this.state.form };
            const newControl = { ...newForm[controlName] }
            newControl.config.value = value;
            newControl.valid = this.checkValidity(value, newControl.validation);
            newForm[controlName] = newControl;
            this.setState({ form: newForm })
        };
    }


    private onSubmit = async (e) => {
        e.preventDefault();
        try {

            console.log('the form ', this.state.form);
            // this.setState({ loading: true });
            // await orders.post('/orders.json', this.createOrder());
            // this.setState({ loading: false });
            // this.router.history.replace('/checkout/user-info');

        } catch (err) {
            console.log('the error ', err);
            this.setState({ loading: false });
        }
    }


    private renderView(): React.ReactNode {
        return this.state.loading ?
            <Spinner /> :
            <form onSubmit={this.onSubmit}>
                {this.renderInputs(this.state.form)}
                <Button type="submit" btnType="Success">Order</Button>
            </form>;
    }

    private createOrder() {
        return {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.form.name.config.value,
                address: this.state.form.address.config.value,
                email: this.state.form.email.config.value
            },
            deliveryMethod: this.state.form.deliveryMethod.config.value
        };
    }


    private checkValidity(value, rules) {
        let isValid = true ;
        
        if(rules.required) {
            isValid = value.trim() !=='' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }



    private renderInputs(form) {

        return Object.keys(form).map((key) => {
            return { ...form[key], key };
        })
            .map((control, index) => <Input
                key={index}
                inputType={control.inputType}
                config={control.config}
                change={this.onFormInputChanged(control.key)
                } />);
    }


    private initializeForm() {
        return {
            name: formControl({
                type: 'input',
                onChange: this.onFormInputChanged,
                config: { name: 'name', value: '', placeholder: 'Name...', label: 'Name' },
                validation: {
                    required: true
                }
            }),
            email: formControl({
                type: 'input',
                onChange: this.onFormInputChanged,
                config: { name: 'email', value: '', placeholder: 'Email...', label: 'Email' },
                validation: {
                    required: true
                }
            }),
            address: formControl({
                type: 'input',
                onChange: this.onFormInputChanged,
                config: { name: 'address', value: '', placeholder: 'Address...', label: 'address' },
                validation: {
                    required: true
                }
            }),
            zipCode: formControl({
                type: 'input',
                onChange: this.onFormInputChanged,
                config: { name: 'zipCode', value: '', placeholder: 'zipCode...', label: 'zipCode' },
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                }
            }),
            deliveryMethod: formControl({
                type: 'select',
                onChange: this.onFormInputChanged,
                config: {
                    name: 'name', value: '', placeholder: 'Name...', label: 'Name', options: [
                        { value: 'express', display: 'Express' },
                        { value: 'basic', display: 'basic' }
                    ]
                },
                validation: {
                    required: true
                }
            })
        }
    }



}

