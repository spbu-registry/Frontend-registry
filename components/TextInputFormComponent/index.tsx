import styles from "./TextInputFormComponent.module.scss";

import {
  TextInputField,
  NumberInputField,
  EmailInputField,
  AreaInputField,
} from "./FieldComponents";
import { FC } from "react";
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

export enum InputFieldType {
  Area = 1,
  Text = 2,
  Email = 3,
  PhoneNumber = 4,
}

interface TextInputFormComponentProps {
  id: string;
  ratio?: number;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  name?: string;
  vertical?: boolean;
  label: string;
  type: InputFieldType;
}

const TextInputFormComponent: FC<TextInputFormComponentProps> = ({
  id,
  ratio = 1,
  placeholder,
  required,
  minLength,
  maxLength,
  name,
  vertical,
  label,
  type,
}) => {
  function buildByType(type: InputFieldType) {
    switch (type) {
      case InputFieldType.Text:
        return (
          <TextInputField
            id={id}
            ratio={ratio}
            placeholder={placeholder}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            name={name}
          />
        );

      case InputFieldType.Email:
        return (
          <EmailInputField
            id={id}
            ratio={ratio}
            placeholder={placeholder}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            name={name}
          />
        );

      case InputFieldType.PhoneNumber:
        return (
          <NumberInputField
            id={id}
            ratio={ratio}
            placeholder={placeholder}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            name={name}
          />
        );

      case InputFieldType.Area:
        return (
          <AreaInputField
            id={id}
            ratio={ratio}
            placeholder={placeholder}
            required={required}
            maxLength={maxLength}
            name={name}
          />
        );
    }
  }

  const requiredClass = required ? styles.required : "";
  const verticalClass = vertical ? styles.vertical : "";

  return (
    <div className={`${styles.Devider} ${verticalClass}`}>
      <label
        className={`${styles.Label} ${requiredClass}`}
        htmlFor={id}
        style={{ flex: 1 }}
      >
        {label}
      </label>

      {buildByType(type)}
    </div>
  );
};

export default TextInputFormComponent;
