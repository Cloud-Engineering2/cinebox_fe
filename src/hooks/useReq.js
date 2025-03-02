import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const useReq = (initialUrl, initalOption) => {
    const [url, setUrl] = useState(initialUrl);
    const [option, setOption] = useState(initalOption);

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);

        console.log("=========== start fetchData ==========");
        console.log("url : " + url);

        try {
            const response = await axios(url, option);
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            setError(error);
        }

        setIsLoading(false);
    };

    const doRequest = (newUrl, newOption) => {
        setUrl(newUrl);
        setOption(newOption);
    };

    useEffect(() => {
        if (url && option) {  // ✅ 둘 다 존재할 때만 실행
            fetchData();
        }
    }, [url, option]);

    return { data, isLoading, error, doRequest };
};

export default useReq;