import {browserName, osName} from "react-device-detect";
import {useParams} from "react-router-dom";
import {useMutation} from "react-query";
import {useEffect} from "react";

import {fetchTokens} from "@api";
import {Footer, Header, SearchBar} from "@components";

import "./AuthEmail.style.scss";

import authEmail from "@assets/images/content-images/email-success.jpg";


export default function AuthEmail() {
    const emailMutation = useMutation(fetchTokens, {onSuccess: (data) => onSuccessRequest(data)});

    const params = useParams();


    useEffect(() => {
        const data = {'uuid': params.uuid, 'browser': browserName, 'device': osName};
        emailMutation.mutate(data);      
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const onSuccessRequest = (data) => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
    }


    return (
        <>
            <Header/>
            <SearchBar/>
            <div className="content">
                {emailMutation.isSuccess ? (
                    <div className="content__email">
                        <h1 className="content__email-title">Почтовый адрес успешно подтверждён!</h1>
                        <img className="content__email-image" src={authEmail} alt="Success"/>
                        <p className="content__email-text">Остался последний шаг. Войдите в аккаунт.</p>
                    </div>
                ) : (
                    <div className="content__email">
                        <h1 className="content__email-title content__email-title--empty">Ссылка недействительна!</h1>
                        <p className="content__email-text">Срок действия ссылки истёк.</p>
                    </div>
                )}
            </div>
            <Footer/>
        </>
    );
}