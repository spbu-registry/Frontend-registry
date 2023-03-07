import { FC, useEffect, useRef } from "react";
import styles from "./TextInputFormComponent.module.scss";
import { InputFieldType } from ".";

// Base Classs
interface BasicInputFieldProps {
  minLength?: number;
  maxLength?: number;
  additionalValidation?: Function;
  required?: boolean;
  pattern?: string;
  type: string;
  id: string;
  name?: string;
  ratio?: number;
  placeholder: string;
}

export const BasicInputField: FC<BasicInputFieldProps> = ({
  placeholder,
  name,
  id,
  type,
  ratio,
  required,
  minLength,
  maxLength,
  additionalValidation,
  pattern,
}) => {
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

  // Handle Validation
  useEffect(() => {
    const input = inputRef.current;

    if (input === null) return;

    function handleValidation() {
      if (input === null) return;

      input.setCustomValidity("");

      if (!input.validity.valid) {
        if (required && input.validity.valueMissing) {
          input.setCustomValidity("This field is required");
        } else if (input.validity.tooLong) {
          input.setCustomValidity(
            `This should not be longer than ${maxLength} symbols`
          );
        } else if (input.validity.tooShort) {
          input.setCustomValidity(
            `This should not be shorter than ${minLength} symbols`
          );
        }
        additionalValidation && additionalValidation(input);
      }
    }

    input.addEventListener("input", handleValidation);

    return () => {
      input.removeEventListener("input", handleValidation);
    };
  });

  return (
    <input
      className={`${styles.Input}`}
      pattern={pattern}
      ref={inputRef}
      type={type}
      id={id}
      name={name ?? id}
      style={{ flex: ratio }}
      placeholder={placeholder}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
    />
  );
};

// Extend BasicInputField

interface TextInputProps {
  id: string;
  ratio: number;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  name?: string;
}

export const TextInputField: FC<TextInputProps> = ({
  id,
  ratio,
  placeholder,
  required,
  minLength,
  maxLength,
  name,
}) => {
  return (
    <BasicInputField
      type="text"
      id={id}
      ratio={ratio}
      placeholder={placeholder}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      name={name}
    />
  );
};

interface EmailInputProps {
  id: string;
  ratio: number;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  name?: string;
}

export const EmailInputField: FC<EmailInputProps> = ({
  id,
  ratio,
  placeholder,
  required,
  minLength,
  maxLength,
  name,
}) => {
  function additionalValidation(input: HTMLInputElement) {
    if (input.validity.typeMismatch) {
      input.setCustomValidity("Please put a valid email address");
    }
  }

  return (
    <BasicInputField
      type="email"
      additionalValidation={additionalValidation}
      id={id}
      ratio={ratio}
      placeholder={placeholder}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      name={name}
    />
  );
};

interface NumberInputProps {
  id: string;
  ratio: number;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  name?: string;
}
export const NumberInputField: FC<NumberInputProps> = ({
  id,
  ratio,
  placeholder,
  required,
  minLength,
  maxLength,
  name,
}) => {
  function additionalValidation(input: HTMLInputElement) {
    if (input.validity.patternMismatch) {
      input.setCustomValidity("Please put a valid phone number");
    }
  }

  return (
    <BasicInputField
      pattern={"^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"}
      type="tel"
      additionalValidation={additionalValidation}
      id={id}
      ratio={ratio}
      placeholder={placeholder}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      name={name}
    />
  );
};

// Area Component

interface AreaInputProps {
  id: string;
  ratio: number;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  name?: string;
}

export const AreaInputField: FC<AreaInputProps> = ({
  id,
  ratio,
  placeholder,
  required,
  minLength,
  maxLength,
  name,
}) => {
  return (
    <textarea
      id={id}
      className={`${styles.Input} ${styles.Area}`}
      style={{ flex: ratio, resize: "none" }}
      name={name}
      required={required}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
};
