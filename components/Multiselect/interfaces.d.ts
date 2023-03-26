interface ArrowProps {
    className : string
}


interface MultiselectProps {
    options : Map<string, boolean>,
    setOption : (key : string, value : boolean) => void
    id : string
    lable : string

    height : number
}

interface OptionProps {
  option : [string, boolean];
  setOption : (value :boolean) => void;

  highlighted : boolean;
  id : string;
} 

/*

  const [importantMap, setImportantMap] = useState(new Map([['sobaka', true], ['koshka', false]]));

  return <div style={{height : '3rem', width : '300px'}}>
    <Multiselect
    options={importantMap}
    setOption={(key, value) => setImportantMap( prevState => {
      const newState = new Map(prevState);
      newState.set(key, value)
      return newState;
    })}
    />
  </div>
};
*/