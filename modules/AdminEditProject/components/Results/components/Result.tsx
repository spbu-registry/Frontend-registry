import { FC } from 'react';
import styles from './Result.module.scss';
import deleteIcon from '../../../../../public/admin-delete-icon.svg';
import Image from 'next/image';

export interface result {
  id: string;
  type: string;
  source: string;
}

interface ResultProps {
  result: result;
  removeResult: (id: string) => void;
}

const Result: FC<ResultProps> = ({ result, removeResult }) => {
  return (
    <li key={result.id} className={styles.result}>
      <div>
        <p>
          <span>{result.type}</span> - {result.source}
        </p>
        <button onClick={() => removeResult(result.id)}>
          <Image src={deleteIcon} alt='Delete icon' width={20} height={20} />
        </button>
      </div>
    </li>
  );
};

export default Result;
