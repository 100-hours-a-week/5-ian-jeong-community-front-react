import { useState, useRef } from "react";


const useFetch = () => {
    const [fetchResult, setFetchResult] = useState(null);
  
    const fetchData = async (url, reqData) => {
        setFetchResult(null);

        await fetch(url, reqData)
            .then(async (response) => {
                if (response.status !== 200) {
                    setFetchResult(response.status);
                    return;
                } 

                const responseJson = await response.json();
                setFetchResult(responseJson.result);
            })
            .catch(error => {
                console.error(`${url} fetch error:`, error);
            });
    }

    return {
        fetchResult: fetchResult,
        fetchData: fetchData
    };
  }

export default useFetch;