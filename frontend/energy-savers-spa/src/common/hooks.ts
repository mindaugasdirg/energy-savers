import * as React from 'react';

export const useFetch = <T>(url: string, defaultValue?: T) => {
    const [value, setValue] = React.useState<T | undefined>(defaultValue);

    React.useEffect(() => {
        let isCancelled = false;
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            
            if (!isCancelled) {
              setValue(json);
            }

          } catch (error) {
            console.error("error", error);
          }
        };
    
        fetchData();

        return () => {
          isCancelled = true;
        };
    }, [url]);

    return value;
};