import * as React from 'react';
import Button from '../../../components/UI/Button/Button';
import { orders } from '../../../http/http';
import { Redirect } from 'react-router';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import { Input, formControl } from '../../../components/UI/FormControls/Input/input';
import styles from './contactData.module.css';
import connect from '../../../store/reducers/Checkout/index';
import { withErrorHandler } from '../../../hoc/withErrorHandler/WithErrorHandler';


export default withErrorHandler(connect(class ContactData extends React.Component<any> {

    public state: { form: any, formIsValid: boolean };
 
    constructor(props) {
        super(props);
        this.state = { form: this.initializeForm(), formIsValid: false };
    }


    public render = () => this.renderView();





    private onSubmit = async (e) => {
        e.preventDefault();
        this.props.makeOrder(this.createOrder());
    }


    private onFormInputChanged = (controlName) => {
        return (value, valid) => {
            const newForm = { ...this.state.form };
            const newControl = { ...newForm[controlName] };
            newControl.config.value = value;
            newControl.valid = valid;
            newControl.touched = true;
            newForm[controlName] = newControl;
            let formIsValid = true;
            for (let key in newForm) {
                formIsValid = newForm[key].valid && formIsValid;
            }
            this.setState({ form: newForm, formIsValid });
        };
    }

    private renderView() {
        return (<div className={styles.ContactData}>
            <h4>Enter Your Contact Data</h4>
            {this.renderForm()}

        </div>);
    }

    private renderForm(): React.ReactNode {
        return this.props.loading ?
            <Spinner /> :
            <form onSubmit={this.onSubmit}>
                {this.renderInputs(this.state.form)}
                <Button disabled={!this.state.formIsValid} type="submit" btnType="Success">Order</Button>
                {this.props.complete ? <Redirect to="/orders" /> : null}
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


    private renderInputs(form) {

        return Object.keys(form).map((key) => {
            return { ...form[key], key };
        })
            .map((control, index) => <Input
                key={index}
                inputType={control.inputType}
                config={control.config}
                valid={control.valid}
                validation={control.validation}
                touched={control.touched}
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
                }
            })
        }
    }



}), orders)

