import {useEffect, useState} from "react";
import axios from "axios";

import {refreshTokens} from "@api";


export default function useUserRequest(url, token, isRegistered, setErrorPopup) {
    const [requestData, setRequestData] = useState({
        data: null,
        error: null,
        status: 'loading'
    });

    const fetchData = (acessToken) => {
        axios.get(url, {headers: {'Authorization': `Bearer ${acessToken}`}})
             .then(response => {setRequestData({data: response.data?.content || response.data?.page?.content || response.data, error: null, status: 'complete'})})
             .catch(error => {
                if (error.response.status === 500) {
                    axios.put(refreshTokens, {}, {headers: {'X-Authorization': `${localStorage.getItem('refreshToken')}`}})
                         .then(response => {
                             localStorage.setItem('accessToken', response.data.accessToken);
                             localStorage.setItem('refreshToken', response.data.refreshToken);
                             fetchData(response.data.accessToken);
                         })
                         .catch(() => setErrorPopup({title: 'Возникла ошибка', text: 'Пожалуйста, перезайдите в аккаунт'}))
                } else {
                    setRequestData({data: null, error: error, status: 'error'});
                }
            })
    }


    useEffect(() => {if (isRegistered) fetchData(token);}, [isRegistered]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return {requestData};
}
