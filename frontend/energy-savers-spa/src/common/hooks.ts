import React from 'react';

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

export const usePost = <Request extends object, Response>(url: string, body: Request, handler: (response: Response) => void) => {
  React.useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        const response = await fetch(url, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } });
        const json = await response.json();
        
        if (!isCancelled) {
          handler(json);
        }

      } catch (error) {
        console.error("error", error);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
}, [body, handler, url]);
}

export const useStateMachine = <T>(states: T[], defaultState = 0) => {
  const [currentState, setCurrentState] = React.useState(defaultState);

  return [states[currentState], setCurrentState] as const;
}