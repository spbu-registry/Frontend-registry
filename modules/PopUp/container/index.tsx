import { FC } from "react";
import styles from "./PopUp.module.sass";

interface PopUpProps {
  active: boolean;
  setActive: any;
}

const PopUp: FC<PopUpProps> = ({ active, setActive }) => {
  return (
    <div
      className={active ? styles.active : styles.popUp}
      onClick={() => setActive(false)}
    >
      <div
        className={styles.popUp__content}
        onClick={(event) => event.stopPropagation()}
      >
        <button className={styles.close} onClick={() => setActive(false)}>
          &times;
        </button>
        <p className={styles.header}>Внимание</p>

        <div className={styles.body}>
          <p className={styles.text}>
            С момента последнего входа в систему появились новые проекты, в
            которых вы можете принять участие. Пожалуйста, пройдите опрос для
            поиска наиболее подходящей для вас команды.
          </p>
          <button className={styles.registry}>Заполнить анкету</button>
          <p className={styles.warning}>
            *Вы не можете продолжить пользоваться сайтом пока не заполните анкету
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
