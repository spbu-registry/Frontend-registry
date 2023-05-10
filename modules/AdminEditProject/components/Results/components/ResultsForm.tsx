import { FC, useState } from 'react';

interface ResultsFormProps {
    addResult: (typeInput: string, sourceInput: string) => void;
}


const ResultsForm: FC<ResultsFormProps> = ({addResult}) => {
  const [type, setType] = useState('');
  const [source, setSource] = useState('');
  return (
    <div>
        <button onClick={() => addResult(type, source)}>+</button>
      <input
        placeholder='Введите тип'
        onChange={(event) => setType(event.target.value)}
      />
      <input
        placeholder='Введите ресурс'
        onChange={(event) => setSource(event.target.value)}
      />
    </div>
  );
};

export default ResultsForm;
