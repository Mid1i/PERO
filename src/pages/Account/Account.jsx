import classNames from "classnames";
import {useEffect, useState} from "react";

import {account} from "@utils/constants";
import {
    Brands,
    Footer,
    HeaderTop,
    SearchBar,
    SignPopup
} from "@components";

import "./Account.style.scss";

import {changePassword, emailIcon, greenCheckIcon} from "@assets/images";


export default function Account() {
    const [value, setValue] = useState({
        surname: 'Иванов',
        name: 'Иван',
        patronymic: 'Иванович',
        email: 'example@mail.ru',
        password: 'misha2003',
        gender: true
    });


    useEffect(() => {
        document.title = 'Мои данные';
    }, [])  


    const genderInputsRender = (id, label, onChangeInputs) => {
        return (
            <div className="account-gender__wrapper">
                <input
                    autoComplete="none"
                    id={id} 
                    name="gender"
                    onChange={onChangeInputs}
                    type="radio"
                    required
                />
                <label htmlFor={id}>{label}</label>
            </div>
        );
    }


    return (
        <>
            <HeaderTop />
            <SearchBar />
            <Brands />
            <div className="content">
                <div className="account">
                    <div className="account__left">
                        <h6 className="account__left-title active">Мои данные</h6>
                        <h6 className="account__left-title">Мои заказы</h6>
                    </div>
                    <div className="account__right">
                        <div className="account__right-info">
                            <h6 className="account__right-title">Мои данные</h6>
                            <div className="account__right-data account-data">
                                <div className="account-data__top">
                                    {account.map(input => (
                                        <div className="account-data__top-wrapper" key={input.id}>
                                            <input
                                                id={input.id}
                                                className="account-data__top-input"
                                                onChange={(event) => setValue({...value, [input.id]: event.target.value})}
                                                placeholder={input.label}
                                                required
                                                type="text"
                                                value={value[input.id]}
                                            />
                                            <label 
                                                className={classNames(
                                                    "account-data__top-label", 
                                                    !!value[input.id] && "active"
                                                )} 
                                                htmlFor={input.id}
                                            >
                                                {input.label}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className="account__right-gender account-gender">
                                    <h5 className="account-gender__title">Пол</h5>
                                    {genderInputsRender('male', 'Мужской', () => setValue({...value, 'male': true}))}
                                    {genderInputsRender('female', 'Женский', () => setValue({...value, 'male': false}))}
                                </div>
                            </div>
                            <div className="account__right-data account-data">
                                <div className="account__data-email account-email">
                                    <h5 className="account-email__title">Email</h5>
                                    <div className="account-email__wrapper">
                                        <img className="account-email__icon" src={emailIcon} alt="email"/>
                                        <input
                                            className="account-email__input"
                                            onChange={(event) => setValue({...value, 'email': event.target.value})}
                                            placeholder="email"
                                            required
                                            type="email"
                                            value={value['email']}
                                        />
                                        <img className="account-email__icon-confirm" src={greenCheckIcon} alt="confirm"/>
                                        <p className="account-email__text">Подтверждён</p>
                                    </div>
                                </div>
                                <div className="account__data-password account-password">
                                    <h5 className="account-password__title">Пароль</h5>
                                    <div className="account-password__wrapper">
                                        <p className="account-password__text">{'·'.repeat(value['password'].length)}</p>
                                        <img className="account-password__icon" src={changePassword} alt="change"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="account__right-btns">
                            <button className="account__btns-confirm btn">Сохранить</button>
                            <div className="account__btns-right">
                                <button className="account__btns-exit">Выйти</button>
                                <button className="account__btns-exit">Выйти со всех устройств</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer activePage='profile'/>

            <SignPopup />
        </>
    );
}