import {useContext, useEffect, useState} from "react";
import {useMutation} from "react-query";
import classNames from "classnames";

import {appContext} from "@services/Context";
import {sign} from "@utils/constants";

import "./SignPopup.style.scss";

import {fetchRegUser} from "@api";
import {blackCross} from "@assets/images";
import peroLogo from "@assets/images/logo/peroID-logo.svg";


export default function SignPopup() {
    const {regPopup, setRegPopup} = useContext(appContext);
    const mutation = useMutation(fetchRegUser, {onError: (error) => onErrorHandling(error.response)});

    const [inputError, setInputError] = useState({});
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [value, setValue] = useState({'passwordCheck': ''});


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
    
    const onSubmitForm = (event) => {
        event.preventDefault();

        if (passwordCheck) {
            const data = value;
            delete data['passwordCheck'];
            
            setInputError({...inputError, 'passwordCheck': ''});
            setPasswordCheck(false);

            mutation.mutate(data);

            if (mutation.isSuccess) {
                console.log(111);
            }
        }
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
    
    
    return (
        <div className={classNames("blackout sign-popup__blackout", regPopup && "active")}>
            <div className={classNames("sign-popup", regPopup && "active")}>
                <div className="sign-popup__top">
                    <img src={peroLogo} alt="peroID" width={45} height={30}/>
                    <img src={blackCross} alt="close" width={28} height={28} onClick={() => setRegPopup(prev => !prev)}/>
                </div>
                <div className="sign-popup__content">
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
                                    type={item.type}
                                    value={isEmptyValue(item.id)}
                                />
                                <label 
                                    className={classNames(
                                                    "reg-form__wrapper-label", 
                                                    !!inputError[item.id] && "active",
                                                    (passwordCheck && item.id === 'passwordCheck') && "success-password"
                                               )} 
                                    htmlFor={item.id}
                                >
                                    {(item.id === 'passwordCheck' && passwordCheck) ? 'Пароли совпадают' : (
                                        !!inputError[item.id] ? inputError[item.id] : item.label)
                                    }
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
                </div>
            </div>
        </div>
    )
}