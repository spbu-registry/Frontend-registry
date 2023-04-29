import { useEffect, useState } from "react";

// Hook хранит строку некоторое время

export function useSuccession (time : number) {

    const [value, setValue] = useState<string>('');

    const add = (char : string) => {
        setValue(prev => prev + char);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setValue('');
        }, time)

        return () => clearTimeout(timeout);

    }, [value, time]);

    return [value, add] as [string, (a: string) => void];


    
}