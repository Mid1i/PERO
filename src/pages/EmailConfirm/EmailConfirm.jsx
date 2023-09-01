import {useEffect} from "react";
import {useMutation} from "react-query";
import {browserName, osName} from "react-device-detect";
import {useNavigate, useParams} from "react-router-dom";

import {fetchTokens} from "@api";
import { 
    Brands,
    EmptyContent,
    Footer, 
    HeaderTop,
    SearchBar,
} from "@components";

import "./EmailConfirm.style.scss";

import emailConfirm from "@assets/images/content-images/email-confirm--success.jpg";


export default function EmailConfirm() {
    const mutation = useMutation(fetchTokens, {
        onSuccess: (data) => onSuccessRequest(data)
    });

    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const data = {
            'uuid': params.uuid,
            'browser': browserName,
            'device': osName
        }

        mutation.mutate(data);      
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const onSuccessRequest = (data) => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        window.setTimeout(() => navigate('/'), 3000);
    }


    return (
        <>
            <HeaderTop />
            <SearchBar />
            <Brands />
            <div className="content content--confirm">
                {mutation.isSuccess ? (
                    <>
                        <h1 className="content__title">Ваш почтовый адрес успешно подтверждён!</h1>
                        <img className="content__image" src={emailConfirm} alt="success confirm"/>
                        <button className="content__btn btn" onClick={() => navigate('/')}>
                            <span>На главную</span>
                            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                                <path d="M16 6L1 6M16 6L9.57143 11M16 6L9.57143 1" stroke="#F8F8F8" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </>
                ) : (
                    <EmptyContent 
                        btn
                        text='Истёк срок действия ссылки для подтверждения почтового адреса' 
                        title='Ссылка недействительна' 
                    />
                )}
            </div>
            <Footer />
        </>
    );
}