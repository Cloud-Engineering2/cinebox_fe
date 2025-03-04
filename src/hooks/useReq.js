import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useReq = (initialUrl, initalOption) => {
    const [url, setUrl] = useState(initialUrl);
    const [option, setOption] = useState(initalOption);

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios(url, option);
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
        if (url && option) fetchData();
    }, [url, option]);

    return { data, isLoading, error, doRequest };
};

export default useReq;