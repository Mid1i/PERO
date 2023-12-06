import {useEffect, useState} from "react";
import axios from "axios";

import {onHandleError} from "@utils/helpers/handlers";


export default function useUserRequest(url, token, isRegistered, setErrorPopup) {
    const [requestData, setRequestData] = useState({
        amount: 0,
        data: null,
        error: null,
        status: 'loading'
    });
    
    const fetchData = (acessToken) => {
        axios.get(url, {headers: {'Authorization': `Bearer ${acessToken}`}})
             .then(response => setRequestData({amount: response.data?.amount, data: response.data?.content || response.data?.page?.content || response.data, error: null, status: 'complete'}))
             .catch(error => {
                if (error.response.status === 500) {
                    onHandleError(error, fetchData, setErrorPopup, 'userRequest');
                } else {
                    setRequestData({data: null, error: error, status: 'error'});
                }
            })
    }

    
    useEffect(() => {if (isRegistered) fetchData(token);}, [isRegistered]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return {requestData};
}
