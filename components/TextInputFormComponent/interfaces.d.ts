
// Public - interfaces that can be useful for using the component

interface ValidationOptions {
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    pattern?: string;
}

interface InputStyling {
    InputWrapper? : string,
    InputError? : string,
    Input? : string,

    WrongInput? : string,
    RightInput? : string,
}

interface FormStyling extends InputStyling {
    Devider? : string,
    Label? : string,
    Required? : string
}

interface TextInputFormComponentProps {
    id: string;
    type: InputFieldType;
    setValue : React.Dispatch<React.SetStateAction<string | null>>;
    
    label?: string;
    placeholder?: string;
    validation? : ValidationOptions;
    name?: string;
    styling? : FormStyling
}
// Private - interfaces that are only used for changing innner logic
    
type AdditionalValidation = (input : HTMLInputElement, setError : React.Dispatch<React.SetStateAction<string | undefined>>) => void;

interface BasicInputFieldProps {
    id: string;
    type: string;
    setValue : React.Dispatch<React.SetStateAction<string | null>>;
  
    placeholder?: string;
    name?: string;
    validation? : ValidationOptions;
    additionalValidation?: AdditionalValidation;
    inputStyling? : InputStyling;
}

interface ExtensionInputProps {
    id: string;
    setValue : React.Dispatch<React.SetStateAction<string | null>>;
  
    placeholder?: string;
    validation? : ValidationOptions;
    name?: string;
    inputStyling? : InputStyling;
}
