import { useEffect, useState } from "react";

export const useDebounce = (value: string, time: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debounceValue;
};
