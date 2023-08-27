import {useContext, useEffect, useState} from "react";
import {useMutation} from "react-query";
import classNames from "classnames";

import {sign} from "@utils/constants";
import {blackCross} from "@assets/images";
import {appContext} from "@services/Context";
import {fetchEmail, fetchRegUser} from "@api";
import {toFormatEmail, toFormatTime} from "@utils/helpers"; 
import peroLogo from "@assets/images/logo/peroID-logo.svg";

import "./SignPopup.style.scss";
import confirmImage from "@assets/images/content-images/email-confirm.png";


export default function SignPopup() {
    const {regPopup, setRegPopup} = useContext(appContext);

    const regUserMutation = useMutation(fetchRegUser, {
        onSuccess: () => onSuccessHandling(),
        onError: (error) => onErrorHandling(error.response)
    });

    const againRegMutation = useMutation(fetchEmail, {
        onSuccess: () => onSuccessHandling()
    });

    const [inputError, setInputError] = useState({});
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [value, setValue] = useState({'passwordCheck': ''});
    const [timer, setTimer] = useState(4);


    useEffect(() => {
        if (regPopup) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [regPopup])

    useEffect(() => {
        if (value.password !== value.passwordCheck && value.passwordCheck !== '') {
            setInputError({...inputError, 'passwordCheck': 'Пароли не совпадают'});
            setPasswordCheck(false);
        } else if (value.password === value.passwordCheck) {
            setInputError({...inputError, 'passwordCheck': ''});
            setPasswordCheck(true);
        } else {
            setInputError({...inputError, 'passwordCheck': ''});
            setPasswordCheck(false);
        }  
    }, [value]) // eslint-disable-line react-hooks/exhaustive-deps


    const isEmptyValue = (id) => {
        if (value[id]) {
            return value[id];
        } else {
            return '';
        }
    }

    const onErrorHandling = (error) => {
        if (error.status === 400 && typeof error.data === 'object') {
            setInputError({...error.data});
        } else if (typeof error.data === 'string') {
            setInputError({'exist': error.data});
        }
    }

    const onSuccessHandling = () => {
        setPasswordCheck(true);
        setTimer(4);

        window.setInterval(() => {
            if (timer > 0) {
                setTimer(prev => prev - 1);
            }
        }, 1000);
    }
    
    const onSubmitForm = (event) => {
        event.preventDefault();

        if (passwordCheck) {
            const data = value;
            delete data['passwordCheck'];
            
            setInputError({...inputError, 'passwordCheck': ''});
            setPasswordCheck(false);

            regUserMutation.mutate(data);
        }
    }

    const onCloseRegPopup = () => {
        setRegPopup(prev => !prev);
        setPasswordCheck(false);
    }


    const genderInputsRender = (id, label, onChangeInputs) => {
        return (
            <div className="reg-form__gender-wrapper">
                <label htmlFor={id}>{label}</label>
                <input
                    autoComplete="none"
                    id={id} 
                    name="gender"
                    onChange={onChangeInputs}
                    type="radio"
                    required
                />
            </div>
        );
    }

    const inputsRender = () => {
        return (
            <>
                <h3 className="sign-popup__content-title">Добро пожаловать в <span>Pero</span></h3>
                <h4 className="sign-popup__content-subtitle">Уже есть аккаунт? <span>Войдите</span></h4>
                <p className="sign-popup__content-error">{inputError?.exist || ''}</p>
                <form onSubmit={onSubmitForm} className="sign-popup__content-form reg-form" autoComplete="off">
                    {sign.map((item, index) => (
                        <div className="reg-form__wrapper" key={index}>
                            <input 
                                className="reg-form__wrapper-input"
                                id={item.id}
                                name={item.id}
                                onChange={(event) => setValue({...value, [item.id]: event.target.value})}
                                placeholder={item.label}
                                required
                                title={item.title}
                                type={item.type}
                                value={isEmptyValue(item.id)}
                            />
                            <label 
                                className={classNames("reg-form__wrapper-label", !!inputError[item.id] && "active")} 
                                htmlFor={item.id}
                            >
                                {!!inputError[item.id] ? inputError[item.id] : item.label}
                            </label>
                        </div>
                    ))}
                    <div className="reg-form__gender">
                        {genderInputsRender('male', 'Я мужчина', () => setValue({...value, 'male': true}))}
                        {genderInputsRender('female', 'Я женщина', () => setValue({...value, 'male': false}))}
                    </div>
                    <button 
                        className="reg-form__btn btn"
                        type="submit"
                    >Зарегистрироваться</button>
                </form>
            </>
        );
    }

    const successRegRender = () => {
        return (
            <>
                <h3 className="sign-popup__content-title sign-popup__content-title--success">Подтверждение почтового адреса</h3>
                <p className="sign-popup__content-text">
                    <span>Ссылка для подтверждения отправлена на </span>
                    <span>{`${toFormatEmail(value.email)}`}</span> 
                    <span>. Перейдите по ссылке из письма в течение 24 часов.</span>
                </p>
                <img className="sign-popup__content-image" src={confirmImage} alt="confirm email"/>
                <button 
                    className="sign-popup__content-btn btn" 
                    disabled={timer > 0 ? true : false}
                    onClick={() => againRegMutation.mutate(value.email)}
                >
                    <span>{`Отправить ещё раз ${timer > 0 ? 'через ' : ''}`}</span>
                    <span>{`${toFormatTime(timer)}`}</span>
                </button>
            </>
        );
    }
    
    
    return (
        <div className={classNames("blackout sign-popup__blackout", regPopup && "active")}>
            <div className={classNames("sign-popup", regPopup && "active")}>
                <div className="sign-popup__wrapper">
                    <div className="effect"></div>
                    <div className="sign-popup__top">
                        <img src={peroLogo} alt="peroID" width={45} height={30}/>
                        <img src={blackCross} alt="close" width={28} height={28} onClick={() => onCloseRegPopup()}/>
                    </div>
                    <div className="sign-popup__content">
                        {(regUserMutation.isSuccess && passwordCheck) ? successRegRender() : inputsRender()}
                    </div>
                </div>
            </div>
        </div>
    )
}