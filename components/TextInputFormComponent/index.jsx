import styles from "./TextInputFormComponent.module.scss";

import { TextInputField, NumberInputField, EmailInputField, AreaInputField } from "./FieldComponents";
/*
    This component was build to be reusable if needed. So please consider using if it fits in your component.
    Keep in mind most of validation happens on submit event only.

    TextInputFormComponent props :
    required : 
        id : string - Every input shoud have a unique id,
        label : string - Every input shoud have a label
        type : InputFieldType - Type of input
    optional : 
        placeholder : string
        required : boolean
        vertical : boolean

        ratio : number - describes ration of space between input and label
        minLength : number
        maxLength : number

        name : string - for submitting form
*/



export const InputFieldType = {
    Area : 1,
    Text : 2,
    Email : 3,
    PhoneNumber : 4
}

export default function TextInputFormComponent (props) {

    function buildByType (type) {
        switch (type) {

            case InputFieldType.Text :
                return <TextInputField id={props.id} ratio={props.ratio ?? 1} placeholder={props.placeholder} required={props.required} minLength={props.minLength} maxLength={props.maxLength} name={props.name}/>;

            case InputFieldType.Email :
                return <EmailInputField id={props.id} ratio={props.ratio ?? 1} placeholder={props.placeholder} required={props.required} minLength={props.minLength} maxLength={props.maxLength} name={props.name}/>;

            case InputFieldType.PhoneNumber :
                return <NumberInputField id={props.id} ratio={props.ratio ?? 1} placeholder={props.placeholder} required={props.required} minLength={props.minLength} maxLength={props.maxLength} name={props.name}/>

            case InputFieldType.Area : 
                return <AreaInputField id={props.id} ratio={props.ratio ?? 1} placeholder={props.placeholder} required={props.required} maxLength={props.maxLength} name={props.name} />
        }
    }

    const required = props.required ? styles.required : '';
    const vertical = props.vertical ? styles.vertical : '';

    return (<div className={`${styles.Devider} ${vertical}`}>

        <label className={`${styles.Label} ${required}`} htmlFor={props.id} style={{flex : 1}}>
            {props.label}
        </label>

        {buildByType(props.type)}

    </div>)
}