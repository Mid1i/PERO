import {browserName, osName} from "react-device-detect";
import {useContext, useEffect, useState} from "react";
import {useMutation} from "react-query";
import classNames from "classnames";

import {fetchEmailConfirming, fetchLogin, fetchRegistration} from "@api";
import {appContext, authContext} from "@services/Context";
import {isPWA} from "@utils/helpers";
import {useNoScroll} from "@hooks";

import {AuthMobile, EmailConfirming, Login, Registration} from ".";

import "./AuthPopup.style.scss";


export default function AuthPopup() {
    const {authPopup, isRegisteredUser, setAuthPopup} = useContext(appContext);
    const [registeredUser, setRegisteredUser] = useState(false);
    const [inputsValue, setInputsValue] = useState({});
    const [inputsError, setInputsError] = useState({});
    const [authBanner, setAuthBanner] = useState(true);
    const [timer, setTimer] = useState(59);
    
    useNoScroll(authPopup);

    const registrationMutation = useMutation(fetchRegistration, {onSuccess: () => onSuccessHandling(), onError: error => onErrorHandling(error.response)});

    const loginMutation = useMutation(fetchLogin, {onSuccess: (data) => onSuccessHandling(data), onError: (error) => onErrorHandling(error.response)});
    
    const emailMutation = useMutation(fetchEmailConfirming, {onSuccess: () => onSuccessHandling()});


    useEffect(() => {
        if (inputsValue.password !== inputsValue.passwordCheck && inputsValue.passwordCheck) {
            setInputsError({...inputsError, 'passwordCheck': 'Пароли не совпадают'});
        } else {
            setInputsError({...inputsError, 'passwordCheck': ''});
        }
    }, [inputsValue]) // eslint-disable-line react-hooks/exhaustive-deps


    const onClickCloseBtn = () => {
        setAuthPopup();
        setInputsValue({});
        setInputsError({});
    }

    const onErrorHandling = (error) => {
        if (error.status === 400 || error.status === 401) {
            if (typeof error.data === 'object') {
                setInputsError({...error.data});
            } else {
                setInputsError({'exist': error.data});
            }
        }
        
        if (error.status === 401 && error.data === 'Необходимо подтвердить почту') {
            emailMutation.mutate(inputsValue.email);
            setInputsError({'confirm': error.data});
        }
    }

    const onSuccessHandling = (data) => {
        if (data) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            setAuthPopup();
        } else {
            setTimer(59);

            const countdown = window.setInterval(() => {
                if (timer > 0) {
                    setTimer(prev => prev - 1);
                } else {
                    clearInterval(countdown);
                }
            }, 1000);
        }
    }
    
    const onSubmitForm = (event) => {
        event.preventDefault();
        const {passwordCheck, ...data} = inputsValue;

        if (registeredUser) {
            delete data['passwordCheck'];
            const user = {'userData': data, 'browser': browserName, 'device': osName};
            loginMutation.mutate(user);
            if (loginMutation.isSuccess) window.location.reload();
        } else if (inputsValue.password === passwordCheck) {
            delete data['passwordCheck'];
            registrationMutation.mutate(data);
        }
    }
    
    const contextData = {
        authBanner,
        emailMutation, 
        inputsError, 
        inputsValue, 
        onSubmitForm, 
        onSuccessHandling, 
        onErrorHandling,
        registeredUser, 
        setAuthBanner,
        setInputsError,
        setInputsValue,
        setRegisteredUser,
        timer, 
    }

    
    return (
        <authContext.Provider value={{...contextData}}>
            {(isPWA() && !isRegisteredUser) && <AuthMobile/>}
            <div className={classNames("content__blackout blackout", (authPopup || (isPWA() && !isRegisteredUser)) && "active")}>
                <div className={classNames(
                    "content__blackout-auth auth-popup", 
                    authPopup && "active", 
                    (isPWA() && !isRegisteredUser) && "auth-popup--mobile"
                )}>
                    <div className="auth-popup__top">
                        <svg className="auth-popup__top-logo" height="24" viewBox="0 0 45 24" width="45">
                            <path d="M26.7002 19V0.515625H22.9043V19H26.7002Z" fill="#1F1F21"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M34.6424 19C35.895 19 37.0376 18.7926 38.0701 18.3779C39.1111 17.9548 40.004 17.3581 40.7488 16.5879C41.5021 15.8092 42.0818 14.8783 42.4881 13.7949C42.9028 12.7116 43.1102 11.514 43.1102 10.2021V9.32617C43.1102 8.00586 42.9028 6.80827 42.4881 5.7334C42.0818 4.65006 41.5021 3.71908 40.7488 2.94043C39.9956 2.16178 39.1027 1.5651 38.0701 1.15039C37.046 0.727214 35.9161 0.515625 34.6805 0.515625H28.9676V19H34.6424ZM32.7762 16.0293H34.6424C35.6411 16.0293 36.4832 15.805 37.1688 15.3564C37.8543 14.8994 38.3706 14.235 38.7176 13.3633C39.073 12.4915 39.2508 11.4378 39.2508 10.2021V9.30078C39.2508 8.35286 39.1492 7.51921 38.9461 6.7998C38.7514 6.0804 38.4594 5.47526 38.0701 4.98438C37.6808 4.49349 37.2026 4.12533 36.6355 3.87988C36.0685 3.62598 35.4168 3.49902 34.6805 3.49902H32.7762V16.0293Z" fill="#1F1F21"/>
                            <path d="M19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0C14.7467 0 19 4.25329 19 9.5Z" fill="#1F1F21"/>
                            <path d="M9.56539 16.7076C9.22383 15.7853 9.00418 15.1129 8.89207 14.6621C8.44971 12.8871 8.42093 11.1221 8.79792 9.34406C8.86804 9.02859 9.24074 8.05056 9.42716 7.70376C9.68003 7.22641 10.2506 6.24404 10.2619 6.25813C10.2667 6.26747 10.1906 6.42328 10.0866 6.60861C9.80775 7.12131 9.20646 8.73208 9.09205 9.27333C8.88643 10.273 8.81649 11.0591 8.84585 12.0228C8.86431 12.533 8.93059 13.2245 8.97025 13.2739C8.99574 13.3056 9.2755 13.2068 9.4547 13.098C9.592 13.0116 9.77762 12.8093 9.82399 12.6877C9.85374 12.6096 9.84982 12.598 9.77784 12.5897C9.73444 12.5831 9.70195 12.5697 9.70632 12.5582C9.71157 12.5445 9.84758 12.4395 10.0083 12.3246C10.4376 12.0194 10.5482 11.8828 10.7403 11.4552C10.8488 11.2144 10.8904 11.0834 10.8681 11.076C10.8459 11.0687 10.7667 11.0683 10.6849 11.0749C10.2776 11.103 10.2813 11.1042 10.4888 11.0307C10.8207 10.9156 11.0489 10.6783 11.1878 10.3028C11.2526 10.1329 11.2534 10.1306 11.1694 10.1649C10.9512 10.2555 10.9316 10.2413 11.118 10.1246C11.2716 10.0281 11.3376 9.96456 11.3861 9.85911C11.4242 9.78121 11.4412 9.71447 11.4264 9.70957C11.4116 9.70466 11.3459 9.73463 11.2767 9.77379C11.2075 9.81294 11.0879 9.86386 11.0128 9.88556L10.8719 9.92682L11.0474 9.81684C11.4748 9.54977 11.6379 9.32972 11.7656 8.85231L11.842 8.57511L11.7283 8.59954C11.6651 8.61222 11.5479 8.64584 11.4739 8.67565C11.2784 8.75057 11.3054 8.72333 11.5838 8.55171C11.9275 8.3397 12.117 8.19299 12.2446 8.03354C12.3759 7.87531 12.4436 7.71935 12.3917 7.70218C12.3287 7.68133 11.6533 7.74483 11.3441 7.80024C11.1744 7.8294 11.0422 7.8477 11.0457 7.83852C11.0553 7.81327 11.4887 7.66193 11.8795 7.54563C12.2877 7.42734 12.3899 7.37841 12.4831 7.25415C12.5406 7.18008 12.6945 6.58986 12.7216 6.33254L12.7318 6.24023L12.2242 6.36704L12.3836 6.27757C12.6213 6.1468 12.8499 5.93029 12.9565 5.73807C13.009 5.64426 13.0396 5.5639 13.0285 5.56022C13.0173 5.55654 12.9113 5.59384 12.788 5.64353C12.5706 5.73191 12.1995 5.81852 12.1777 5.78805C12.1683 5.77978 12.2711 5.71813 12.4005 5.65237C13.0795 5.30567 13.1234 5.24522 13.0563 4.78608L13.0127 4.49505L12.9045 4.51612L12.7954 4.53949L12.8557 4.46894C12.9935 4.31547 13.0378 4.08969 12.9877 3.74997C12.9639 3.57146 12.941 3.39065 12.9447 3.34794L12.945 3.27048L12.4824 3.38889C11.9502 3.52564 11.6818 3.63848 11.3731 3.85693C11.2533 3.94137 11.1424 4.01327 11.1258 4.01295C11.1093 4.01264 11.1484 3.94285 11.2111 3.85501C11.2775 3.7684 11.3247 3.68836 11.3153 3.68009C11.2898 3.64839 10.7002 3.81526 10.5893 3.88715C10.4402 3.98261 10.3713 4.17439 10.3498 4.57056C10.3385 4.74262 10.3248 4.88805 10.3165 4.88789C10.3074 4.89003 10.2711 4.73325 10.2359 4.54065C10.2017 4.34576 10.1623 4.17505 10.1519 4.15866C10.1292 4.13048 9.46728 4.45439 9.26841 4.59283C9.13853 4.68171 9.12603 4.74737 9.18075 4.99816C9.20378 5.09109 9.21265 5.16641 9.20348 5.16855C9.19345 5.17299 9.12218 5.10804 9.04699 5.03146C8.97269 4.95258 8.90425 4.89116 8.89879 4.89453C8.83943 4.91884 8.74271 5.00835 8.72433 5.05656C8.71209 5.0887 8.75361 5.2317 8.81258 5.37272C8.87527 5.51497 8.91421 5.62093 8.90113 5.61143C8.88805 5.60193 8.83573 5.56394 8.78254 5.52824C8.67137 5.44751 8.64105 5.45041 8.66233 5.54793C8.67382 5.61637 8.67294 5.61866 8.6093 5.56658C8.44452 5.42934 8.40441 5.40314 8.37604 5.41185C8.30556 5.43248 7.87965 5.95857 7.83241 6.08255C7.79829 6.17209 7.82194 6.29625 7.97979 6.82417C8.04588 7.04511 8.09977 7.25425 8.10235 7.2913C8.10447 7.35146 8.09423 7.34548 8.01842 7.23767C7.97573 7.17443 7.84832 6.97198 7.74161 6.7919C7.63577 6.60952 7.53885 6.45853 7.52402 6.45363C7.48695 6.44136 7.36872 6.65302 7.17567 7.08294C6.98349 7.51057 6.95624 7.71354 7.05061 8.01364C7.11063 8.20671 7.16465 8.28404 7.57821 8.75438C7.73183 8.93188 7.87149 9.10218 7.88411 9.13479C7.89673 9.16741 7.70687 9.01928 7.451 8.79243C7.19796 8.56911 6.98086 8.39387 6.96253 8.39814C6.92217 8.40547 6.83062 8.98531 6.82094 9.28459C6.80146 9.78487 6.90129 10.0816 7.22331 10.4854C7.35076 10.6439 7.45185 10.7731 7.44444 10.7706C7.44073 10.7694 7.32127 10.6885 7.17477 10.5909C6.92844 10.4267 6.91077 10.4182 6.88303 10.4582C6.79434 10.5814 6.86747 10.9701 7.02603 11.2113C7.07547 11.2897 7.11554 11.3598 7.11292 11.3667C7.11029 11.3736 7.03569 11.3722 6.94888 11.359C6.76239 11.3335 6.7436 11.3609 6.81628 11.5426C6.88201 11.6988 6.88463 11.6919 6.78474 11.6692C6.71168 11.6528 6.71668 11.6725 6.83513 11.8875C6.90677 12.0172 7.07559 12.2644 7.21154 12.4334C7.43638 12.7198 7.44508 12.7408 7.34282 12.6915L7.23315 12.6397L7.30746 12.7185C7.41184 12.8281 7.63789 12.9907 7.89406 13.1401C8.31876 13.3841 8.3767 13.473 8.47085 13.9928C8.70734 15.2784 9.4157 17.188 9.69004 17.2788C9.71599 17.2874 9.74348 17.2809 9.74873 17.2672C9.75485 17.2511 9.67156 16.9986 9.56539 16.7076ZM10.3078 6.2035C10.2993 6.19294 10.3035 6.17105 10.3207 6.15866C10.3388 6.14397 10.3473 6.15454 10.3377 6.17979C10.3318 6.20627 10.3154 6.21637 10.3078 6.2035Z" fill="#FFFFFF"/>
                            <path d="M0 24H45V22H0V24Z" fill="#1F1F21"/>
                        </svg>
                        {!isPWA() && (
                            <svg className="auth-popup__top-icon" onClick={onClickCloseBtn} height="28" viewBox="0 0 28 28" width="28">
                                <path d="M25.4611 28L14.009 16.5373L2.55691 28L0 25.4447L11.4701 14L0 2.55527L2.55691 0L14.009 11.4627L25.4611 0.0179953L28 2.55527L16.5479 14L28 25.4447L25.4611 28Z" fill="#1F1F21"/>
                            </svg>
                        )}
                    </div>
                    {(registeredUser && !inputsError.confirm) ? <Login/> : (
                        (!registeredUser && (!registrationMutation.isSuccess || inputsValue?.password !== inputsValue?.passwordCheck)) ? <Registration/> : (
                            <EmailConfirming/>
                        )
                    )}
                </div>
            </div>
        </authContext.Provider>
    )
}