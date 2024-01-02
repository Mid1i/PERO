import {osName, osVersion, browserName, browserVersion} from "react-device-detect";
import {useContext, useEffect, useState} from "react";
import classNames from "classnames";
import axios from "axios";

import {fetchEmail, fetchLogin, fetchRegistration} from "@api";
import {appContext, authContext} from "@services";
import {isPWA} from "@utils/helpers";
import {useNoScroll} from "@hooks";

import {AuthMobile, EmailConfirming, Login, Registration, ResetPassword} from ".";

import "./AuthPopup.style.scss";


export default function AuthPopup() {
    const [requestData, setRequestData] = useState({error: null, status: 'loading'});
    const {authStep, authPopup, isRegisteredUser, setAuthStep, setAuthPopup} = useContext(appContext);
    const [requestStatus, setRequestStatus] = useState('complete');
    const [inputsValue, setInputsValue] = useState({});
    const [inputsError, setInputsError] = useState({});
    const [authBanner, setAuthBanner] = useState(true);
    const [timer, setTimer] = useState(59);
    
    useNoScroll(authPopup);

    useEffect(() => {
        if (authStep.includes('changePassword')) {
            const email = authStep.split(' ')[1];
            setInputsValue({...inputsValue, 'email': email});
            setAuthStep('emailReset');
            startTimer();
        }
    }, [authStep]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (inputsValue.password !== inputsValue.passwordCheck && inputsValue.passwordCheck) {
            setInputsError({...inputsError, 'passwordCheck': 'Пароли не совпадают'});
        } else {
            setInputsError({...inputsError, 'passwordCheck': ''});
        }
    }, [inputsValue]) // eslint-disable-line react-hooks/exhaustive-deps

    const startTimer = () => {
        setTimer(59);

        const countdown = window.setInterval(() => {
            if (timer > 0) {
                setTimer(prev => prev - 1);
            } else {
                clearInterval(countdown);
            }
        }, 1000);
    }

    const onClickCloseBtn = () => {
        setAuthPopup();
        setAuthStep('login');
        setInputsValue({});
        setInputsError({});
    }

    const onClickBackBtn = () => {
        const clickTargets = {
            'resetPassword': 'login',
            'resendEmail': 'registration',
            'emailConfirming': 'registration',
            'emailReset': 'login'
        }

        setAuthStep(clickTargets[authStep]);
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
            axios.post(fetchEmail(inputsValue.email), {"typeLink": "CONFIRM_LINK"});
            setInputsError({'confirm': error.data});
            setAuthStep('emailConfirming');
        }
    }
    
    const onSubmitForm = (event) => {
        event.preventDefault();
        setRequestStatus('loading');
        const {passwordCheck, ...data} = inputsValue;

        if (authStep === 'login') {
            axios.post(fetchLogin, data, {headers: {'X-OS': `${osName} ${osVersion}`, 'X-Browser': `${browserName} ${browserVersion}`}}) 
                 .then((response) => {
                    setRequestData({...requestData, status: 'success'});
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    window.location.reload();
                 })
                 .catch(error => {
                    onErrorHandling(error.response);
                    setRequestStatus('error');
                 });
        } else if (authStep === 'resetPassword') {
            axios.post(fetchEmail(inputsValue.email), {"typeLink": 'RESET_PASSWORD'}) 
                 .then(() => {
                    setAuthStep('emailReset');
                    setRequestStatus('complete');
                    startTimer();
                 })
                 .catch(error => {
                    onErrorHandling(error.response);
                    setRequestStatus('error');
                 });
        } else if (authStep === 'resendEmail') {
            axios.post(fetchEmail(inputsValue.email), {typeLink: 'CONFIRM'})
                 .then(() => {
                    setAuthStep('emailConfirming');
                    setRequestStatus('complete');
                    startTimer();
                 })
                 .catch(error => {
                    if (error.response.status === 429) {
                        setRequestStatus('error');
                        setAuthStep('emailConfirming');
                        setTimer(error.response.headers['x-rate-limit-retry-after-seconds']); //Изменить время на получение из хэдера

                        const countdown = window.setInterval(() => {
                            if (timer > 0) {
                                setTimer(prev => prev - 1);
                            } else {
                                clearInterval(countdown);
                            }
                        }, 1000);
                    }
                 })
        } else if (inputsValue.password === passwordCheck && authStep === 'registration') {
            axios.post(fetchRegistration, data) 
                 .then(() => {
                    setRequestStatus('complete');
                    setAuthStep('emailConfirming');
                    startTimer();
                 })
                 .catch(error => {
                    onErrorHandling(error.response);
                    setRequestStatus('error');
                 });
        }
    }
    
    const contextData = {
        authStep,
        authBanner,
        inputsError, 
        inputsValue,
        onSubmitForm,
        onErrorHandling,
        requestStatus,
        setTimer,
        setAuthStep,
        setAuthBanner,
        setInputsError,
        setInputsValue,
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
                        {!['registration', 'login'].includes(authStep) ? (
                            <div className='auth-popup__top-back' onClick={onClickBackBtn}>
                                <svg fill="none" height="16" viewBox="0 0 8 16" width="8">
                                    <path d="M7.69408 15.6478C7.88996 15.4222 8 15.1163 8 14.7974C8 14.4784 7.88996 14.1725 7.69408 13.947L2.52205 7.99274L7.69408 2.03852C7.88441 1.81166 7.98972 1.50781 7.98734 1.19242C7.98496 0.877029 7.87508 0.575333 7.68135 0.352311C7.48763 0.129288 7.22557 0.00278502 6.95161 4.43776e-05C6.67765 -0.00269627 6.41372 0.118547 6.21666 0.33766L0.305919 7.14231C0.110039 7.36788 0 7.67378 0 7.99274C0 8.3117 0.110039 8.6176 0.305919 8.84317L6.21666 15.6478C6.4126 15.8733 6.67831 16 6.95537 16C7.23243 16 7.49814 15.8733 7.69408 15.6478Z" fill="#1F1F21"/>
                                </svg>
                                <p>Назад</p>
                            </div>
                        ) : (
                            <svg className="auth-popup__top-logo" fill="none" height="25" viewBox="0 0 45 25" width="45">
                                <path d="M26.7002 19.7917V0.537109H22.9043V19.7917H26.7002Z" fill="#1F1F21"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M34.6424 19.7917C35.895 19.7917 37.0376 19.5757 38.0701 19.1437C39.1111 18.7029 40.004 18.0813 40.7488 17.2791C41.5021 16.468 42.0818 15.4982 42.4881 14.3697C42.9028 13.2412 43.1102 11.9937 43.1102 10.6272V9.71476C43.1102 8.33944 42.9028 7.09195 42.4881 5.97229C42.0818 4.84382 41.5021 3.87404 40.7488 3.06295C39.9956 2.25186 39.1027 1.63032 38.0701 1.19832C37.046 0.757514 35.9161 0.537109 34.6805 0.537109H28.9676V19.7917H34.6424ZM32.7762 16.6972H34.6424C35.6411 16.6972 36.4832 16.4636 37.1688 15.9963C37.8543 15.5202 38.3706 14.8282 38.7176 13.9201C39.073 13.012 39.2508 11.9144 39.2508 10.6272V9.68831C39.2508 8.7009 39.1492 7.83251 38.9461 7.08313C38.7514 6.33375 38.4594 5.7034 38.0701 5.19206C37.6808 4.68072 37.2026 4.29721 36.6355 4.04154C36.0685 3.77706 35.4168 3.64482 34.6805 3.64482H32.7762V16.6972Z" fill="#1F1F21"/>
                                <path d="M0 25H45V22.9167H0V25Z" fill="#1F1F21"/>
                                <path d="M19 9.89583C19 15.3612 14.7467 19.7917 9.5 19.7917C4.25329 19.7917 0 15.3612 0 9.89583C0 4.43052 4.25329 0 9.5 0C14.7467 0 19 4.43052 19 9.89583Z" fill="#1F1F21"/>
                                <path d="M9.56539 17.4037C9.22383 16.4431 9.00418 15.7426 8.89207 15.2731C8.44971 13.424 8.42093 11.5855 8.79792 9.7334C8.86804 9.40478 9.24074 8.386 9.42716 8.02475C9.68003 7.52751 10.2506 6.50421 10.2619 6.51889C10.2667 6.52862 10.1906 6.69091 10.0866 6.88397C9.80775 7.41803 9.20646 9.09591 9.09205 9.65972C8.88643 10.7011 8.81649 11.5199 8.84585 12.5237C8.86431 13.0552 8.93059 13.7756 8.97025 13.8269C8.99574 13.86 9.2755 13.7571 9.4547 13.6438C9.592 13.5538 9.77762 13.3431 9.82399 13.2163C9.85374 13.135 9.84982 13.1229 9.77784 13.1142C9.73444 13.1073 9.70195 13.0935 9.70632 13.0815C9.71157 13.0671 9.84758 12.9578 10.0083 12.8382C10.4376 12.5202 10.5482 12.3779 10.7403 11.9325C10.8488 11.6817 10.8904 11.5452 10.8681 11.5375C10.8459 11.5299 10.7667 11.5295 10.6849 11.5363C10.2776 11.5656 10.2813 11.5669 10.4888 11.4903C10.8207 11.3704 11.0489 11.1232 11.1878 10.7321C11.2526 10.5551 11.2534 10.5527 11.1694 10.5884C10.9512 10.6829 10.9316 10.668 11.118 10.5464C11.2716 10.4459 11.3376 10.3798 11.3861 10.2699C11.4242 10.1888 11.4412 10.1192 11.4264 10.1141C11.4116 10.109 11.3459 10.1402 11.2767 10.181C11.2075 10.2218 11.0879 10.2749 11.0128 10.2975L10.8719 10.3404L11.0474 10.2259C11.4748 9.94768 11.6379 9.71845 11.7656 9.22115L11.842 8.9324L11.7283 8.95786C11.6651 8.97106 11.5479 9.00608 11.4739 9.03714C11.2784 9.11517 11.3054 9.0868 11.5838 8.90803C11.9275 8.68719 12.117 8.53436 12.2446 8.36827C12.3759 8.20345 12.4436 8.04099 12.3917 8.02311C12.3287 8.00139 11.6533 8.06753 11.3441 8.12525C11.1744 8.15562 11.0422 8.17469 11.0457 8.16512C11.0553 8.13882 11.4887 7.98117 11.8795 7.86003C12.2877 7.73681 12.3899 7.68584 12.4831 7.5564C12.5406 7.47925 12.6945 6.86444 12.7216 6.59639L12.7318 6.50024L12.2242 6.63233L12.3836 6.53913C12.6213 6.40291 12.8499 6.17739 12.9565 5.97716C13.009 5.87943 13.0396 5.79573 13.0285 5.7919C13.0173 5.78807 12.9113 5.82692 12.788 5.87868C12.5706 5.97074 12.1995 6.06096 12.1777 6.02922C12.1683 6.0206 12.2711 5.95639 12.4005 5.88789C13.0795 5.52674 13.1234 5.46377 13.0563 4.9855L13.0127 4.68234L12.9045 4.70429L12.7954 4.72863L12.8557 4.65515C12.9935 4.49528 13.0378 4.26009 12.9877 3.90622C12.9639 3.72027 12.941 3.53193 12.9447 3.48744L12.945 3.40675L12.4824 3.5301C11.9502 3.67254 11.6818 3.79008 11.3731 4.01764C11.2533 4.1056 11.1424 4.18049 11.1258 4.18016C11.1093 4.17983 11.1484 4.10714 11.2111 4.01564C11.2775 3.92542 11.3247 3.84204 11.3153 3.83342C11.2898 3.8004 10.7002 3.97423 10.5893 4.04912C10.4402 4.14855 10.3713 4.34832 10.3498 4.761C10.3385 4.94023 10.3248 5.09172 10.3165 5.09155C10.3074 5.09378 10.2711 4.93047 10.2359 4.72985C10.2017 4.52683 10.1623 4.34901 10.1519 4.33194C10.1292 4.30259 9.46728 4.63999 9.26841 4.7842C9.13853 4.87678 9.12603 4.94518 9.18075 5.20641C9.20378 5.30322 9.21265 5.38168 9.20348 5.38391C9.19345 5.38853 9.12218 5.32088 9.04699 5.24111C8.97269 5.15894 8.90425 5.09496 8.89879 5.09847C8.83943 5.12379 8.74271 5.21703 8.72433 5.26725C8.71209 5.30073 8.75361 5.44969 8.81258 5.59659C8.87527 5.74476 8.91421 5.85513 8.90113 5.84524C8.88805 5.83534 8.83573 5.79577 8.78254 5.75859C8.67137 5.67449 8.64105 5.67751 8.66233 5.7791C8.67382 5.85038 8.67294 5.85277 8.6093 5.79852C8.44452 5.65556 8.40441 5.62827 8.37604 5.63734C8.30556 5.65883 7.87965 6.20685 7.83241 6.33599C7.79829 6.42926 7.82194 6.5586 7.97979 7.10851C8.04588 7.33865 8.09977 7.55651 8.10235 7.5951C8.10447 7.65777 8.09423 7.65154 8.01842 7.53924C7.97573 7.47336 7.84832 7.26248 7.74161 7.0749C7.63577 6.88492 7.53885 6.72764 7.52402 6.72253C7.48695 6.70975 7.36872 6.93023 7.17567 7.37806C6.98349 7.82351 6.95624 8.03494 7.05061 8.34754C7.11063 8.54865 7.16465 8.62921 7.57821 9.11914C7.73183 9.30404 7.87149 9.48144 7.88411 9.51541C7.89673 9.54938 7.70687 9.39508 7.451 9.15878C7.19796 8.92615 6.98086 8.74361 6.96253 8.74807C6.92217 8.7557 6.83062 9.3597 6.82094 9.67145C6.80146 10.1926 6.90129 10.5017 7.22331 10.9223C7.35076 11.0874 7.45185 11.2219 7.44444 11.2194C7.44073 11.2181 7.32127 11.1338 7.17477 11.0322C6.92844 10.8611 6.91077 10.8523 6.88303 10.8939C6.79434 11.0223 6.86747 11.4272 7.02603 11.6784C7.07547 11.7601 7.11554 11.8331 7.11292 11.8403C7.11029 11.8475 7.03569 11.846 6.94888 11.8323C6.76239 11.8057 6.7436 11.8342 6.81628 12.0235C6.88201 12.1862 6.88463 12.1791 6.78474 12.1554C6.71168 12.1383 6.71668 12.1589 6.83513 12.3828C6.90677 12.5179 7.07559 12.7754 7.21154 12.9515C7.43638 13.2498 7.44508 13.2717 7.34282 13.2203L7.23315 13.1663L7.30746 13.2485C7.41184 13.3626 7.63789 13.532 7.89406 13.6876C8.31876 13.9417 8.3767 14.0344 8.47085 14.5758C8.70734 15.915 9.4157 17.9042 9.69004 17.9987C9.71599 18.0077 9.74348 18.001 9.74873 17.9866C9.75485 17.9699 9.67156 17.7069 9.56539 17.4037ZM10.3078 6.46198C10.2993 6.45097 10.3035 6.42817 10.3207 6.41527C10.3388 6.39997 10.3473 6.41097 10.3377 6.43728C10.3318 6.46487 10.3154 6.47538 10.3078 6.46198Z" fill="white"/>
                            </svg>
                        )}
                        {!isPWA() && (
                            <svg className="auth-popup__top-icon" onClick={onClickCloseBtn} height="28" viewBox="0 0 28 28" width="28">
                                <path d="M25.4611 28L14.009 16.5373L2.55691 28L0 25.4447L11.4701 14L0 2.55527L2.55691 0L14.009 11.4627L25.4611 0.0179953L28 2.55527L16.5479 14L28 25.4447L25.4611 28Z" fill="#1F1F21"/>
                            </svg>
                        )}
                    </div>
                    {authStep === 'login' && <Login/>}
                    {authStep === 'registration' && <Registration/>}
                    {['resetPassword', 'resendEmail'].includes(authStep) && <ResetPassword/>}
                    {['emailConfirming', 'emailReset'].includes(authStep) && <EmailConfirming/>}
                </div>
            </div>
        </authContext.Provider>
    )
}