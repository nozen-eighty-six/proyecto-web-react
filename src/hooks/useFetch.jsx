import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getData = async (url) => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw {
            err: true,
            status: response.status,
            statusText: !response.statusText
              ? "Ocurrio un error"
              : response.statusText,
          };
        }

        const data = await response.json();
        //console.log(data);
        setIsPending(false);
        setData(data);
        setError(false);
      } catch (error) {
        console.log(error);
        setIsPending(true);
        setError(error);
      }
    };

    getData(url);
  }, [url]);

  return { data, isPending, error};
};
