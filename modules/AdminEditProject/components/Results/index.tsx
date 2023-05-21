import { useState } from 'react';
import styles from './Results.module.scss';
import Result from './components/Result';
import { result } from './components/Result';
import ResultsForm from './components/ResultsForm';

const Results = () => {
  const [results, setResults] = useState<result[]>([]);

  const addResult = (typeInput: string, sourceInput: string) => {
    if (typeInput && sourceInput) {
      const newResult: result = {
        id: Math.random().toString(16).slice(2),
        type: typeInput,
        source: sourceInput,
      };
      setResults([...results, newResult]);
    }
  };

  const removeResult = (id: string) => {
    setResults([...results.filter((result) => result.id !== id)]);
  };

  return (
    <div>
      <h1 className={styles.header}>Результаты:</h1>
      <div className={styles.container}>
        <ul>
          {results.map((result: result) => {
            return (
              <Result
                key={result.id}
                result={result}
                removeResult={removeResult}
              />
            );
          })}
        </ul>

        <ResultsForm addResult={addResult} />
      </div>
    </div>
  );
};

export default Results;
