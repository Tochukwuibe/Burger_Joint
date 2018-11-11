import * as React from 'react';
import  styles from './input.module.css';

export const Input = ({ inputType, config, change }) => {
    let inputElement: any = null;

    
    switch (inputType) {
        case 'input': {
            inputElement = <input onChange={change} className={styles.InputElement} {...config} />;
            break;
        }
        case 'textArea': {
            inputElement = <textarea onChange={change} className={styles.InputElement} {...config} />;
            break;
        }

        case 'select': {
            const { options } = config;
            inputElement = <select onChange={change} className={styles.InputElement} {...config} >
                {
                    options.map((option, i) => <option key={i} value={option.value}>
                            {option.display}
                    </option>)
                }
            </select>;
            break;
        }

        default: {
            inputElement = <input onChange={change} className={styles.InputElement} {...config} />;
        }
    }


    return (
        <div onChange={change} className={styles.Input}>
            <label>{config.label}</label>
            {inputElement}
        </div>
    );
};

export function formControl(type: string, config: {}) {
    return {
        inputType: type,
        config
    };
}