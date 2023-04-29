import React, { FC } from 'react';
import styles from './DateBlock.module.scss';

interface DateBlockProps {
  dateOfCreate: string;
  dateOfRegister: string;
  deadline: string;
  status: string;
}

const DateBlock: FC<DateBlockProps> = ({
  dateOfCreate,
  dateOfRegister,
  deadline,
  status,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.dates}>
        <div className={styles.block}>
          <p>Дата создания проекта:</p>
          <p>{dateOfCreate}</p>
        </div>
        <div className={styles.block}>
          <p>Сроки подачи заявок: </p>
          <p>{dateOfRegister}</p>
        </div>
        <div className={styles.block}>
          <p>Сроки проекта: </p>
          <p>{deadline}</p>
        </div>

        <div className={styles.block}>
          <p className={styles.status}>Статус проекта:</p>
          <p>{status}</p>
        </div>
      </div>
      <button>Подать заявку</button>
    </div>
  );
};

export default DateBlock;
