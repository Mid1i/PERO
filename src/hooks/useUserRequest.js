import {useEffect, useState} from "react";
import axios from "axios";


export default function useUserRequest(url, token, isRegistered) {
    const [requestData, setRequestData] = useState({
        data: null,
        error: null,
        status: 'loading'
    });


    useEffect(() => {
        if (isRegistered) {
            axios.get(url, {headers: {'Authorization': `Bearer ${token}`}})
                .then(response => {setRequestData({data: response.data.content, error: null, status: 'complete'})})
                .catch(error => {setRequestData({data: null, error: error, status: 'error'})})
        }
    }, [url, token, isRegistered]);
    
    return {requestData};
}
