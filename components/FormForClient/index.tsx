import TextInputFormComponent, {
  InputFieldType,
} from "../TextInputFormComponent";
import FormStyles from "./FormForClient.module.scss";
import InputFormStyles from './TextInputFormComponent.module.scss';

/*
    FormForClient was build to receive project ideas from clients.
    It accepts style as props to style the outer form.
*/

interface FormForClientProps {
  stylesProp : React.CSSProperties
}

const genericStyle = {
  Input : InputFormStyles.Input,
  InputWrapper : InputFormStyles.InputWrapper,
  InputError : InputFormStyles.Error,

  Devider : InputFormStyles.Devider,
  Label : InputFormStyles.Label,
  Required : InputFormStyles.Required,

  WrongInput : InputFormStyles.WrongInput,
}

export default function FormForClient({stylesProp} : FormForClientProps) {
  return (
    <form className={FormStyles.FormForClient} style={stylesProp} noValidate>
      <div className={FormStyles.Wrapper} style={{ flex: 1 }}>
        <TextInputFormComponent
          label={"Имя юридического / физического лица"}
          id={"Employer_name"}
          setValue={() => {}}
          placeholder={"Иванов Иван Владимирович"}
          type={InputFieldType.Text}
          validation={{required : true}}
          styling={genericStyle}
        />
      </div>
      <div className={FormStyles.Wrapper} style={{ flex: 1 }}>
        <TextInputFormComponent
          label={"Почта для связи"}
          id={"Employer_email"}
          setValue={() => {}}
          placeholder={"example@supermail.com"}
          type={InputFieldType.Email}
          validation={{required : true}}
          styling={genericStyle}
        />
      </div>
      <div className={FormStyles.Wrapper} style={{ flex: 1 }}>
        <TextInputFormComponent
          label={"Номер телефона"}
          id={"Employer_phone"}
          setValue={() => {}}
          placeholder={"81234567890"}
          type={InputFieldType.PhoneNumber}
          validation={{required : true}}
          styling={Object.assign({}, genericStyle, {
            Input : InputFormStyles.InputNumber,
            InputWrapper : InputFormStyles.InputWrapperNumber,
            InputError : InputFormStyles.ErrorNumber
          })}
        />
      </div>
      <div className={FormStyles.Wrapper} style={{ flex: 2 }}>
        <TextInputFormComponent
          label={"Краткая идея проекта"}
          id={"Employer_idea"}
          setValue={() => {}}
          placeholder={"Хочу летающие машины"}
          type={InputFieldType.Area}
          validation={{required : true}}
          styling={Object.assign({}, genericStyle, {
            Input : InputFormStyles.InputArea,
            InputWrapper : InputFormStyles.AreaInputWrapper
          })}
        />
      </div>
      <div className={FormStyles.Wrapper} style={{ flex: 1 }}>
        <TextInputFormComponent
          label={"Другие способы связи"}
          id={"Employer_contacts"}
          setValue={() => {}}
          placeholder={"Мой второй телефон, моя мама..."}
          type={InputFieldType.Text}
          styling={genericStyle}
        />
      </div>
      <button className={FormStyles.FormButton} style={{ flex: 0.8 }} type="submit">
        Отправить
      </button>
    </form>
  )
}
