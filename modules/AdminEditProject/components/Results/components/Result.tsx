import { FC } from 'react';
import styles from './Result.module.scss';

export interface result {
  id: number;
  type: string;
  source: string;
}

interface ResultProps {
  result: result;
  removeResult: (id: number) => void;
}

const Result: FC<ResultProps> = ({ result, removeResult }) => {
  return (
    <li key={result.id} className={styles.result}>
      <div>
        <div>{result.type}</div>
        <div>&nbsp;-&nbsp;</div>
        <div>{result.source}</div>
      </div>
      <button onClick={() => removeResult(result.id)}>X</button>
    </li>
  );
};

export default Result;
