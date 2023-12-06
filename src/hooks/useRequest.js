import {useEffect, useState} from "react";
import axios from "axios";


export default function useRequest(url, keys = '') {
    const [requestData, setRequestData] = useState({
        amount: 0,
        data: null,
        error: null,
        status: 'loading'
    });

    const headers = !!localStorage.getItem("accessToken") ? {headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}} : {};

    useEffect(() => {
        axios.get(url, headers)
             .then(response => setRequestData({amount: response.data.amount, data: response.data.page?.content || response.data, error: null, status: 'complete'}))
             .catch(error => setRequestData({amount: 0, data: null, error: error?.response, status: 'error'}))      
    }, [url, keys]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return {requestData};
}