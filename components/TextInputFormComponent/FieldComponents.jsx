import { useEffect, useRef } from "react";
import styles from "./TextInputFormComponent.module.scss";

// Base Classs
function BasicInputField (basicInputProps) {

    const props = basicInputProps;

    const inputRef = useRef(null);

    // Handle Validation
    useEffect(() => {
        const input = inputRef.current;

        if (input === null) return;

        function handleValidation () {

            input.setCustomValidity('');

            if (!input.validity.valid) {
                if (props.required && input.validity.valueMissing) {
                    input.setCustomValidity('This field is required');
                }
                else if (input.validity.tooLong) {
                    input.setCustomValidity(`This should not be longer than ${props.maxLength} symbols`);
                }
                else if (input.validity.tooShort) {
                    input.setCustomValidity(`This should not be shorter than ${props.minLength} symbols`);
                }
                props.additionalValidation && props.additionalValidation(input);
            }
        }

        input.addEventListener('input', handleValidation);

        return () => {
            input.removeEventListener('input', handleValidation);
        }
    })

    return (
        <input className={`${styles.Input}`}
        pattern={props.pattern}
        ref={inputRef}
        type={props.type} 
        id={props.id} 
        name={props.name ?? props.id}
        style={{flex : props.ratio}}
        placeholder={props.placeholder}
        required={props.required}
        minLength={props.minLength}
        maxLength={props.maxLength}
        />
    )
}

// Extend BasicInputField

export function TextInputField (TextInputProps) {
    
    const props = TextInputProps;

    return (<BasicInputField type='text' id={props.id} ratio={props.ratio} placeholder={props.placeholder} required={props.required} minLength={props.minLength} maxLength={props.maxLength} name={props.name}/>)
}

export function EmailInputField (EmailInputProps) {

    const props = EmailInputProps;

    function additionalValidation (input) {
        if (input.validity.typeMismatch) {
            input.setCustomValidity('Please put a valid email address');
        }
    }

    return (<BasicInputField type='email' additionalValidation={additionalValidation} id={props.id} ratio={props.ratio} placeholder={props.placeholder} required={props.required} minLength={props.minLength} maxLength={props.maxLength} name={props.name}/>)
}

export function NumberInputField (NumberInputProps) {

    const props = NumberInputProps;

    function additionalValidation (input) {
        if (input.validity.patternMismatch) {
            input.setCustomValidity('Please put a valid phone number');
        }
    }

    return (<BasicInputField pattern={'^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'}
        type='tel' additionalValidation={additionalValidation} id={props.id} ratio={props.ratio} placeholder={props.placeholder} required={props.required} minLength={props.minLength} maxLength={props.maxLength} name={props.name}/>)

}

// Area Component

export function AreaInputField (AreaInputProps) {
    const props = AreaInputProps;

    return <textarea id={props.id} className={`${styles.Input} ${styles.Area}`} style={{flex : props.ratio, resize: 'none'}} name={props.name} required={props.required} placeholder={props.placeholder} maxLength={props.maxLength}/>
}