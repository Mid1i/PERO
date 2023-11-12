import {useEffect, useState} from "react";
import axios from "axios";


export default function useRequest(url, keys = '') {
    const [requestData, setRequestData] = useState({
        data: null,
        error: null,
        status: 'loading'
    });


    useEffect(() => {
        axios.get(url)
             .then(response => setRequestData({data: response.data.page?.content || response.data, error: null, status: 'complete'}))
             .catch(error => setRequestData({data: null, error: error?.response, status: 'error'}))
    }, [url, keys]);
    
    return {requestData};
}