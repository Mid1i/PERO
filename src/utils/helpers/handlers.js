import axios from "axios";

import {refreshTokens} from "@api";


export const onHandleError = (error, func, errorFunc, extraCondition = '') => {
    if (error.response.status === 500) {
        axios.put(refreshTokens, {}, {headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`}})
             .then(response => {
                 localStorage.setItem('accessToken', response.data.accessToken);
                 localStorage.setItem('refreshToken', response.data.refreshToken);

                 if (extraCondition === 'userRequest') {
                    func(response.data.accessToken)
                 } else {
                    func();
                 }
             })
             .catch(() => errorFunc({'title': 'Возникла ошибка', 'text': 'Пожалуйста, перезайдите в аккаунт'}))
    } else if (error.response.status === 429) {
        errorFunc({'title': 'Слишком много запросов', 'text': 'Пожалуйста, повторите попытку через минуту.'});
    } else if (extraCondition !== 'updateUserData') {
        errorFunc({'text': error.response.data});
    }
}