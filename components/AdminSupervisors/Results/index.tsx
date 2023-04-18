import remove from '../../../public/admin-name-remove.svg';
import styles from './Results.module.scss';

const Results = () => {
  return (
    <div>
      <h1 className={styles.header}>Результаты:</h1>
      <div className={styles.container}>
        <ul>
          <li>
            <div>
              Гитхаб проекта <button>X</button>
            </div>
          </li>
          <li>
            <div>
              Рабочий файл проекта <button>X</button>
            </div>
          </li>
          <li>
            <div>
              Статья о проекте <button>X</button>
            </div>
          </li>
        </ul>
        <div className={styles.add}>
          <button>+</button>
          <span>Тип</span>
          <input />
          <span>Ресурс</span>
          <input />
        </div>
      </div>
    </div>
  );
};

export default Results;
