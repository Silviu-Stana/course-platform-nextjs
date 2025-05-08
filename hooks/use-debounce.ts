import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    //We don't wanna run a Query to DB instantly for every single key press
    //We use this hook to optimize number of queries
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 600);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}
