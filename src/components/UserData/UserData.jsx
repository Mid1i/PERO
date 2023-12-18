import {useNavigate} from "react-router-dom";
import {useState, useContext} from "react";
import classNames from "classnames";
import axios from "axios";

import {fetchAuthSignOut, fetchEmail, globalAuthSignOut, updateUserData} from "@api";
import {onHandleError} from "@utils/helpers";
import {account} from "@utils/constants";
import {appContext} from "@services";

import "./UserData.style.scss";


export default function UserData({fullName = '', male, email = '', setDataPopup}) {
    const {setAuthStep, setAuthPopup, setErrorPopup} = useContext(appContext);
    const [data, setData] = useState({
        surname: fullName.split(' ')?.[0],
        name: fullName.split(' ')?.[1],
        patronymic: fullName.split(' ')?.[2],
        email: email,
        gender: male
    });
    
    const navigate = useNavigate();

    const onClickExitBtn = () => {
        axios.delete(fetchAuthSignOut, {headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}})
             .then(() => {
                localStorage.removeItem('cart');
                localStorage.removeItem('favourite');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                
                navigate('/');
                window.location.reload();
             })
             .catch(error => onHandleError(error, onClickExitBtn, setErrorPopup))

    }
    
    const onClickExitAllBtn = () => {
        axios.delete(globalAuthSignOut, {headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}})
             .then(() => setErrorPopup({'text': 'Вы успешно вышли со всех устройств'}))
             .catch(error => onHandleError(error, onClickExitAllBtn, setErrorPopup))
    }

    const onClickSaveBtn = () => {
        const userData = {
            'fullName': [data.surname, data.name, data.patronymic].join(' '),
            'male': data.gender
        };

        if (onCheckingInputs()) {
            axios.put(updateUserData, userData, {headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}})
                 .then(() => window.location.reload())
                 .catch(error => {
                    if (error.response.status === 500) {
                        onHandleError(error, onClickSaveBtn, setErrorPopup, 'updateUserData');
                    } else {
                        setErrorPopup({title: 'Ошибка', text: error.response.data.fullName});
                    }
                 })
        }
    }

    const onClickChangeBtn = () => {
        axios.post(fetchEmail(email), {'typeLink': 'RESET_PASSWORD'})
             .then(() => {
                setAuthStep(`changePassword ${email}`);
                setAuthPopup();
             })
             .catch(error => onHandleError(error))
    }

    const onCheckingInputs = () => {
        if (([data.surname, data.name, data.patronymic].join(' ') !== fullName || data.gender !== male) && ![data.surname, data.name, data.patronymic].includes('')) {
            return true;
        }
        return false;
    }
    

    const genderInputsRender = (id, label, onChangeInputs) => {
        return (
            <div className="user-gender__wrapper">
                <input
                    autoComplete="none"
                    className="user-gender__wrapper-input"
                    checked={(id === 'male' && data.gender) || (id === 'female' && !data.gender) ? true : false}
                    id={id} 
                    name="gender"
                    onChange={onChangeInputs}
                    type="radio"
                    required
                />
                <label className="user-gender__wrapper-label" htmlFor={id}>{label}</label>
            </div>
        );
    }
    

    return (
        <>
            <div className="user-data__top">
                <h6 className="user-data__top-title user-data__top-title--main">
                    <span>Мои данные</span>
                    <svg fill="none" onClick={setDataPopup} height="23" viewBox="0 0 22 23" width="22">
                        <path d="M21 21.125L1 1.75004M21 1.75L1.00003 21.125" stroke="#1F1F21" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </h6>
                <div className="user-data__top-wrapper input-wrapper">
                    {account.map(input => (
                        <div className="input-wrapper__item" key={input.id}>
                            <input
                                className="input-wrapper__item-input"
                                id={input.id}
                                onChange={(event) => setData({...data, [input.id]: event.target.value})}
                                placeholder={input.label}
                                required
                                type="text"
                                value={data[input.id]}
                            />
                            <label 
                                className={classNames('input-wrapper__item-label', !!data[input.id] && "active")} 
                                htmlFor={input.id}
                            >
                                {input.label}</label>
                        </div>
                    ))}
                </div>
                <div className="user-data__top-email mobile-email">
                    <input
                        className="mobile-email__input"
                        id="email"
                        readOnly
                        type="text"
                        value={data.email}
                    />
                    <label className="mobile-email__label" htmlFor="email">Email</label>
                    <span className="mobile-email__text">Подтверждён</span>
                </div>
                <h5 className="user-data__top-title">Пол</h5>
                <div className="user-data__top-gender user-gender">
                    {genderInputsRender('male', 'Мужской', () => setData({...data, 'gender': true}))}
                    {genderInputsRender('female', 'Женский', () => setData({...data, 'gender': false}))}
                </div>
                <h5 className="user-data__top-title">E-mail</h5>
                <div className="user-data__top-email user-email">
                    <svg className="user-email__icon" height="15" viewBox="0 0 20 15" width="20">
                        <path d="M20 1.875C20 0.84375 19.1 0 18 0H2C0.9 0 0 0.84375 0 1.875V13.125C0 14.1563 0.9 15 2 15H18C19.1 15 20 14.1563 20 13.125V1.875ZM18 1.875L10 6.5625L2 1.875H18ZM18 13.125H2V3.75L10 8.4375L18 3.75V13.125Z" fill="#212121"/>
                    </svg>
                    <p className="user-email__text">{data.email}</p>
                    <svg className="user-email__icon" fill="none" height="19" viewBox="0 0 19 19" width="19">
                        <path d="M6.00001 9.33334L8.50001 11.8333L13.5 6.83334M9.33334 17.6667C10.4279 17.6681 11.5119 17.4532 12.5232 17.0343C13.5344 16.6154 14.4529 16.0008 15.2258 15.2258C16.0008 14.4529 16.6154 13.5344 17.0343 12.5232C17.4532 11.5119 17.6681 10.4279 17.6667 9.33334C17.6681 8.23879 17.4532 7.15475 17.0343 6.14352C16.6154 5.13229 16.0008 4.2138 15.2258 3.44084C14.4529 2.66585 13.5344 2.05126 12.5232 1.63238C11.5119 1.2135 10.4279 0.998589 9.33334 1.00001C8.23879 0.998612 7.15475 1.21353 6.14352 1.63241C5.13229 2.05129 4.2138 2.66587 3.44084 3.44084C2.66587 4.2138 2.05129 5.13229 1.63241 6.14352C1.21353 7.15475 0.998612 8.23879 1.00001 9.33334C0.998589 10.4279 1.2135 11.5119 1.63238 12.5232C2.05126 13.5344 2.66585 14.4529 3.44084 15.2258C4.2138 16.0008 5.13229 16.6154 6.14352 17.0343C7.15475 17.4532 8.23879 17.6681 9.33334 17.6667Z" stroke="#0FA958" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="user-email__confirming">Подтверждён</span>
                </div>
            </div>
            <div className="user-data__btns">
                <div className="user-data__left">
                    <button 
                        className="user-data__btns-save" 
                        disabled={!onCheckingInputs() ? true : false}
                        onClick={onClickSaveBtn}
                    >
                        Сохранить
                    </button>
                    <button
                        className="user-data__btns-change" 
                        onClick={onClickChangeBtn}
                    >
                        Изменить пароль
                    </button>
                </div>
                <div className="user-data__right">
                    <button className="user-data__right-exit" onClick={onClickExitBtn}>Выйти</button>
                    <button className="user-data__right-all" onClick={onClickExitAllBtn}>Выйти со всех устройств</button>
                </div>
            </div>
        </>
    );
}