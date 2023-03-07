import TextInputFormComponent, {InputFieldType} from "../TextInputFormComponent";
import styles from './FormForClient.module.scss';

/*
    FormForClient was build to receive project ideas from clients.
    It accepts style as props to style the outer form.
*/

export default function FormForClient (FormForClientProps) {

    const props = FormForClientProps;

    return (
        <form className={styles.FormForClient} style={props.styles}>
        <div className={styles.Wrapper} style={{flex : 1}}>
          <TextInputFormComponent
            label={'Имя юридического/физического лица'}
            id={'Employer_name'}
            placeholder={'Иванов Иван Владимирович'}
            type={InputFieldType.Text}
            required
          />
        </div>
        <div className={styles.Wrapper} style={{flex : 1}}>
          <TextInputFormComponent
            label={'Почта для связи'}
            id={'Employer_email'}
            placeholder={'example@supermail.com'}
            type={InputFieldType.Email}
            required
          />
        </div>
        <div className={styles.Wrapper} style={{flex : 1}}>
          <TextInputFormComponent
            label={'Номер телефона'}
            id={'Employer_phone'}
            placeholder={'81234567890'}
            type={InputFieldType.PhoneNumber}
            required
          />
        </div>
        <div className={styles.Wrapper} style={{flex : 2}}>
          <TextInputFormComponent
            label={'Краткая идея проекта'}
            id={'Employer_idea'}
            placeholder={'Хочу летающие машины'}
            type={InputFieldType.Area}
            required
          />
        </div>
        <div className={styles.Wrapper} style={{flex : 6}}>
          <TextInputFormComponent
            label={'Описание проекта'}
            id={'Employer_project_description'}
            placeholder={'Хочу прям такие крутящиеся летающие машины, которые пи-пи-пиу'}
            type={InputFieldType.Area}
            ratio={4}
            required vertical
          />
        </div>
        <div className={styles.Wrapper} style={{flex : 1}}>
          <TextInputFormComponent
            label={'Другие способы связи'}
            id={'Employer_contacts'}
            placeholder={'Мой второй телефон, моя мама...'}
            type={InputFieldType.Text}
          />
        </div>
        <button className={styles.FormButton} style={{flex : 1}} type="submit">Отправить</button>
      </form>
    )
}