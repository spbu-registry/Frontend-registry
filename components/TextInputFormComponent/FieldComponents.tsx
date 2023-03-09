import { useEffect, useRef, useState } from "react";

/*
  FORMS SHOUD USE NOVALIDATE
*/
/*
  Components that are used to get and validate input.
  Both validation option and style can be customized.
  This components shoud not be used by themselves but rather by using TextInputFormComponent meta components.

  For styling purposes here is the blueprint of the components : 
    <div className={ style.InputWrapper }>
      <input or textarea className={style.Input and style.(Right or Wrong input)} />
      <span className={style.InputError}>
    </div>

  Notice : Please be aware that component starts without RightorWrong input classname and sets it only on the first input.
*/


// Base Classs

function BasicInputField(props: BasicInputFieldProps) : JSX.Element {

  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | undefined>();

  // Handle Validation
  useEffect(() => {
    const input = inputRef.current;
    const validationOpt = props.validation;

    if (input === null) return;

    function handleValidation(event: Event) {

      if (input === null) return;

      if (validationOpt === undefined) {
        props.setValue((event.target as HTMLInputElement).value);
        return;
      }

      if (!input.validity.valid) {
        if (validationOpt.required && input.validity.valueMissing) {
          setError("This field is required");
        } else if (input.validity.tooLong) {
          setError(
            `This should not be longer than ${validationOpt.maxLength} symbols`
          );
        } else if (input.validity.tooShort) {
          setError(
            `This should not be shorter than ${validationOpt.minLength} symbols`
          );
        }
        props.additionalValidation && props.additionalValidation(input, setError);

        props.setValue(null);
      }
      else {
        props.setValue((event.target as HTMLInputElement).value);
        setError('');
      }
    }

    function onBlur(event: Event) {
      handleValidation(event);
      input?.removeEventListener('blur', onBlur);
      input?.addEventListener("input", handleValidation);
    }

    input.addEventListener("blur", onBlur);

    return () => {
      input.removeEventListener('blur', onBlur);
      input.removeEventListener("input", handleValidation);
    };
  }, [props]);

  const validationOpt = props.validation;
  const style = props.inputStyling;

  let correct : string = '';
  if (error !== undefined) {
    correct = (error === '' ? props.inputStyling?.RightInput : props.inputStyling?.WrongInput) ?? '';
  }

  return (
    <div className={`${style?.InputWrapper}`}>
      <input
        className={`${style?.Input}  ${correct}`}
        pattern={validationOpt?.pattern}
        ref={inputRef}
        type={props.type}
        id={props.id}
        name={props.name ?? props.id}
        placeholder={props.placeholder}
        required={validationOpt?.required}
        minLength={validationOpt?.minLength}
        maxLength={validationOpt?.maxLength}
      />
      <span className={style?.InputError}>{error}</span>
    </div>
  )
};

// Extend BasicInputField

export function TextInputField(props: ExtensionInputProps) : JSX.Element {

  return (
    <BasicInputField
      type="text" id={props.id} setValue={props.setValue} placeholder={props.placeholder} validation={props.validation} name={props.name} inputStyling={props.inputStyling}
    />
  );
};

export function EmailInputField(props: ExtensionInputProps) : JSX.Element {

  const additionalValidation: AdditionalValidation = (input, setError) =>
    input.validity.typeMismatch && setError("Please put a valid email address");

  return (
    <BasicInputField type="email" id={props.id} setValue={props.setValue} placeholder={props.placeholder} name={props.name} validation={props.validation} additionalValidation={additionalValidation} inputStyling={props.inputStyling}/>
  )
};

export function NumberInputField(props: ExtensionInputProps) : JSX.Element {

  const additionalValidation: AdditionalValidation = (input, setError) =>
    input.validity.patternMismatch && setError("Please put a valid phone number");

  return (
    <BasicInputField type="tel" setValue={props.setValue} additionalValidation={additionalValidation} id={props.id} placeholder={props.placeholder} name={props.name} inputStyling={props.inputStyling}

      validation={Object.assign({}, props.validation, {
        pattern: "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"
      })}

    />
  );
};


// Area Component

export function AreaInputField(props: ExtensionInputProps) : JSX.Element {

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [error, setError] = useState<string | undefined>();

  // Handle Validation
  useEffect(() => {
    const input = inputRef.current;
    const validationOpt = props.validation;

    if (input === null) return;

    function handleValidation(event: Event) {

      if (input === null) return;

      if (validationOpt === undefined) {
        props.setValue((event.target as HTMLTextAreaElement).value);
        return;
      }

      if (validationOpt.required && input.validity.valueMissing) {

        setError("This field is required");
        props.setValue(null);

      }
      else {
        props.setValue((event.target as HTMLTextAreaElement).value);
        setError('');
      }
    }

    function onBlur(event: Event) {
      handleValidation(event);
      input?.removeEventListener('blur', onBlur);
      input?.addEventListener("input", handleValidation);
    }

    input.addEventListener("blur", onBlur);

    return () => {
      input.removeEventListener('blur', onBlur);
      input.removeEventListener("input", handleValidation);
    };
  }, [props]);

  const validationOpt = props.validation;
  const style = props.inputStyling;

  let correct : string = '';
  if (error !== undefined) {
    correct = (error === '' ? props.inputStyling?.RightInput : props.inputStyling?.WrongInput) ?? '';
  }

  return (
    <div className={`${style?.InputWrapper}`}>
      <textarea
        className={`${style?.Input}  ${correct}`}
        ref={inputRef}
        id={props.id}

        name={props.name ?? props.id}
        placeholder={props.placeholder}

        required={validationOpt?.required}
        maxLength={validationOpt?.maxLength}
      />
      <span className={style?.InputError}>{error}</span>
    </div>
  )
};
