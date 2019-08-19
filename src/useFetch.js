import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setResponse(data);
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setError(error);
        setIsLoading(false)
      }
    };
    fetchData();
  }, []);

  return { response, error, isLoading };
};

export default useFetch;