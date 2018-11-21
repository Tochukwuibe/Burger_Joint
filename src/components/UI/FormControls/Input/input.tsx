import * as React from 'react';
import styles from './input.module.css';

export const Input = (props) => {
    const { change, config, inputType, valid, validation, touched, className } = props;
    const { value, label, placeholder } = config

    let inputElement: any = null;
    const inputClasses = [styles.InputElement, className];

    if (!valid && validation && touched) {
        inputClasses.push(styles.Invalid);
    }

    const onInputChange = ({ target }) => {
        const isvalid = checkValidity(value, validation, touched)
        return change(target.value, isvalid)
    }


    switch (inputType) {
        case 'input': {
            inputElement = <input onChange={onInputChange} value={value} className={inputClasses.join(' ')} name={name} placeholder={placeholder} />;
            break;
        }
        case 'textArea': {
            inputElement = <textarea onChange={onInputChange} value={value} className={inputClasses.join(' ')} name={name} placeholder={placeholder} />;
            break;
        }

        case 'select': {
            const { options } = config
            inputElement = <select onChange={onInputChange} value={options[0].value} className={inputClasses.join(' ')} name={name} placeholder={placeholder} >
                {
                    options.map((option, i) => <option key={i} value={option.value}>
                        {option.display}
                    </option>)
                }
            </select>;
            break;
        }

        default: {
            inputElement = <input onChange={onInputChange} value={value} className={inputClasses.join(' ')} name={name} placeholder={placeholder} />;
        }
    }


    return (
        <div className={styles.Input}>
            <label>{label}</label>
            {inputElement}
        </div>
    );
};


function checkValidity(value, rules, touched) {
    let isValid = true;

    if (!rules) { return true }
    if (!touched) { return true }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
}




export function formControl(control: { type: string, config: any, onChange: Function, validation?: any }) {
    return {
        inputType: control.type,
        config: control.config,
        change: control.onChange(control.config.name),
        valid: !(!!control.validation) || !(!!control.validation),
        validation: control.validation,
        touched: false
    };
}