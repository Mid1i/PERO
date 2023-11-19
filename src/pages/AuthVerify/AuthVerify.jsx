import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

import {fetchAuthVerify} from "@api";
import {AuthPopup, Footer, Header, SearchBar} from "@components";

import "./AuthVerify.style.scss";

import authEmail from "@assets/images/auth-images/email-confirming.jpg";


export default function AuthVerify() {
    const [requestStatus, setRequestStatus] = useState('error');

    const params = useParams();

    
    useEffect(() => {
        axios.put(fetchAuthVerify(params.uuid), {})
             .then(() => setRequestStatus('success'))
             .catch(() => setRequestStatus('error')) 
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
            <Header/>
            <SearchBar/>
            <div className="content">
                {requestStatus === 'success' ? (
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

            <AuthPopup/>
        </>
    );
}