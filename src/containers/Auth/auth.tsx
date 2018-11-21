import * as React from 'react';
import { formControl, Input } from '../../components/UI/FormControls/Input/input';
import Button from '../../components/UI/Button/Button';
import styles from './auth.module.css';
import connect from '../../store/reducers/Auth/index';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';


export default connect(class Auth extends React.Component<any> {

    public state: { form: any, formIsValid: boolean };

    constructor(props) {
        super(props);
        this.state = { form: this.initializeForm(), formIsValid: false }
    }

    public render = () => this.renderView();

    private onSignUp = () => this.props.signUp(this.getData());
    private onSignIn = () => this.props.signIn(this.getData());



    private getData = () => {
        return {
            email: this.state.form.email.config.value,
            password: this.state.form.password.config.value
        }
    }


    private renderView() {
        
        let view = (
            <div className={styles.Auth}>
                <h2 style={{ textAlign: 'center' }}>Please Sign In</h2>
                <div className={styles.FormCard}>
                    {this.renderForm()}
                    {!!this.props.error ? <p>{this.props.error}</p> : null}
                    <div>
                        <Button clicked={this.onSignUp} btnType="Success" >SignUp</Button>
                        <Button clicked={this.onSignIn} btnType="Success" >SignIn</Button>
                    </div>
                    {this.props.authenticated ? <Redirect to="/builder" />: null}
                </div>
            </div>
        );

        if (this.props.loading) view = <Spinner />;

        return view;
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




    private renderForm() {
        return <form>
            {this.renderInputs(this.state.form)}
        </form>
    }


    private renderInputs(form) {

        return Object.keys(form).map((key) => {
            return { ...form[key], key };
        })
            .map((control, index) => <Input
                className={styles.Input}
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

            email: formControl({
                type: 'input',
                onChange: this.onFormInputChanged,
                config: { name: 'email', value: '', placeholder: 'Email...', label: 'Email' },
                validation: {
                    required: true
                }
            }),
            password: formControl({
                type: 'input',
                onChange: this.onFormInputChanged,
                config: { name: 'password', value: '', placeholder: 'Password...', label: 'Password' },
                validation: {
                    required: true,
                    minLength: 6
                }
            }),

        }
    }


})