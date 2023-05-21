import Image from 'next/image';
import { FC, useState } from 'react';
import addIcon from '../../../../../public/admin-add-icon.svg';
import styles from './ResultsForm.module.scss';

interface ResultsFormProps {
  addResult: (typeInput: string, sourceInput: string) => void;
}

const ResultsForm: FC<ResultsFormProps> = ({ addResult }) => {
  const [type, setType] = useState('');
  const [source, setSource] = useState('');
  return (
    <div className={styles.container}>
      <button onClick={() => addResult(type, source)}>
        <Image src={addIcon} alt='Add icon' width={20} height={20} />
      </button>
      <span>тип</span>
      <input
        className={styles.input}
        placeholder='Введите тип'
        onChange={(event) => setType(event.target.value)}
      />
      <span>ресурс</span>
      <input
        className={styles.input}
        placeholder='Введите ресурс'
        onChange={(event) => setSource(event.target.value)}
      />
    </div>
  );
};

export default ResultsForm;
