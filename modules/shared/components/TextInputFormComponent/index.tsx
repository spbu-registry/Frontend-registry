
import {
  TextInputField, 
  EmailInputField,
  NumberInputField,
  AreaInputField,
} from "./FieldComponents";

/*
    This component was build to be reusable if needed. So please consider using if it fits in your component.

    If you are looking for props or interfaces please take a look in the interfaces.d.ts file.

    This Input Component was build to provide custom style and validation with as minimal future code as possible.

    For styling purposes here is the blueprint of the component : 
    
    <div className={ style.Devider }>
      <label className={ style.Label and style.Required?}></label>
      <div className={ style.InputWrapper }>
        <input or textarea className={style.Input and style.(Right or Wrong input)} />
        <span className={style.InputError}>
      </div>
    </div>

  Notice : Please be aware that component starts without RightorWrong input classname and sets it only on the first input.
*/

export enum InputFieldType {
  Area = 1,
  Text = 2,
  Email = 3,
  PhoneNumber = 4,
}

export default function TextInputFormComponent(props : TextInputFormComponentProps){

  function buildByType(type: InputFieldType) {
    switch (type) {
      case InputFieldType.Text:
        return <TextInputField id={props.id} placeholder={props.placeholder} validation={props.validation} name={props.name} setValue={props.setValue} inputStyling={props.styling}/>;

      case InputFieldType.Email:
        return <EmailInputField id={props.id} placeholder={props.placeholder} validation={props.validation} name={props.name} setValue={props.setValue} inputStyling={props.styling}/>;

      case InputFieldType.PhoneNumber:
        return <NumberInputField id={props.id} placeholder={props.placeholder} validation={props.validation} name={props.name} setValue={props.setValue} inputStyling={props.styling}/>;

      case InputFieldType.Area:
        return <AreaInputField id={props.id} placeholder={props.placeholder} validation={props.validation} name={props.name} setValue={props.setValue} inputStyling={props.styling}/>
    }
  }

  const requiredClass = props.validation?.required ? props.styling?.Required : "";

  return (
    <div className={`${props.styling?.Devider}`}>
      <label
        className={`${props.styling?.Label} ${requiredClass}`}
        htmlFor={props.id}
      >
        {props.label}
      </label>

      {buildByType(props.type)}
    </div>
  );
};
