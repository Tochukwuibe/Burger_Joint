import * as React from 'react';
import styles from './input.module.css';

export const Input = (props) => {
    const { change, config, inputType } = props;
    const { value, label, placeholder } = config



    let inputElement: any = null;
    const inputClasses = [styles.InputElement];

    if (props.invalid) { inputClasses.push(styles.Invalid); }

    const onInputChange = ({ target }) => {
        return change(target.value)
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
            inputElement = <select onChange={onInputChange} value={value} className={inputClasses.join(' ')} name={name} placeholder={placeholder} >
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

export function formControl(control: { type: string, config: any, onChange: Function, validation?: any }) {
    return {
        inputType: control.type,
        config: control.config,
        change: control.onChange(control.config.name),
        valid: !(!!control.validation),
        validation: control.validation
    };
}