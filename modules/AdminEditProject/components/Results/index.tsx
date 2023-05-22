import { FC, useEffect, useState } from "react";
import styles from "./Results.module.scss";
import Result from "./components/Result";
import { result } from "./components/Result";
import ResultsForm from "./components/ResultsForm";
import { IAPILink, IAPIProject } from "../../../../types";

interface ResultsProps {
  initialResults: IAPILink[];
  projectRef: React.RefObject<IAPIProject>;
}

const Results: FC<ResultsProps> = ({ initialResults, projectRef }) => {
  const [results, setResults] = useState<result[]>(
    initialResults.map((result) => {
      return {
        id: "" + result.linkId,
        type: result.name!,
        source: result.link!,
      };
    })
  );

  const addResult = (typeInput: string, sourceInput: string) => {
    if (typeInput && sourceInput) {
      const newResult: result = {
        id: "",
        type: typeInput,
        source: sourceInput,
      };
      setResults([...results, newResult]);
    }
  };

  const removeResult = (id: string) => {
    setResults([...results.filter((result) => result.id !== id)]);
  };

  useEffect(() => {
    if (projectRef.current) {
      projectRef.current.links = results.map((result) => {
        return {
          linkId: result.id ? parseInt(result.id) : null,
          name: result.type,
          link: result.source,
        };
      });
    }
  }, [results]);

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
