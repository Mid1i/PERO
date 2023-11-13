import {browserName, osName} from "react-device-detect";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import classNames from "classnames";
import axios from "axios";

import {account} from "@utils/constants";
import {fetchAuthSignOut} from "@api";
import {appContext} from "@services";

import "./UserData.style.scss";

import {changePassword, emailIcon, greenCheckIcon} from "@assets/images";


export default function UserData() {
    const {token} = useContext(appContext);
    const [value, setValue] = useState({
        surname: 'Иванов',
        name: 'Иван',
        patronymic: 'Иванович',
        email: 'example@mail.ru',
        password: 'misha2003',
        gender: true
    });

    const navigate = useNavigate();

    const onClickExitBtn = () => {
        localStorage.removeItem('cart');
        localStorage.removeItem('favourite');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        axios.delete(fetchAuthSignOut, {headers: {'X-Browser': browserName, 'X-Device': osName, 'Authorization': `Bearer ${token}`}});
        navigate('/');
        window.location.reload();
    }


    const genderInputsRender = (id, label, onChangeInputs) => {
        return (
            <div className="data-block__wrapper-gender">
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
            <div className="account__content-data account-data">
                <h6 className="account-data__title">Мои данные</h6>
                <div className="account-data__block data-block">
                    <div className="data-block__wrapper data-block__wrapper--name">
                        {account.map(input => (
                            <div className="data-block__wrapper-item" key={input.id}>
                                <input
                                    id={input.id}
                                    onChange={(event) => setValue({...value, [input.id]: event.target.value})}
                                    placeholder={input.label}
                                    required
                                    type="text"
                                    value={value[input.id]}
                                />
                                <label 
                                    className={classNames(!!value[input.id] && "active")} 
                                    htmlFor={input.id}
                                >
                                    {input.label}</label>
                            </div>
                        ))}
                    </div>
                    <div className="data-block__wrapper data-block__wrapper--gender">
                        <h5 className="data-block__wrapper-title data-title">Пол</h5>
                        {genderInputsRender('male', 'Мужской', () => setValue({...value, 'male': true}))}
                        {genderInputsRender('female', 'Женский', () => setValue({...value, 'male': false}))}
                    </div>
                </div>
                <div className="account-data__block data-block">
                    <div className="data-block__wrapper">
                        <h5 className="data-block__wrapper-title data-title">E-mail</h5>
                        <div className="data-block__wrapper-stroke">
                            <img src={emailIcon} alt="email"/>
                            <input
                                onChange={(event) => setValue({...value, 'email': event.target.value})}
                                placeholder="email"
                                required
                                type="email"
                                value={value['email']}
                            />
                            <img src={greenCheckIcon} alt="confirm"/>
                            <span>Подтверждён</span>
                        </div>
                    </div>
                    <div className="data-block__wrapper">
                        <h5 className="data-block__wrapper__title data-title">Пароль</h5>
                        <div className="data-block__wrapper-stroke">
                            <p>{'·'.repeat(value['password'].length)}</p>
                            <img src={changePassword} alt="change"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="account__content-btns account-btns">
                <button className="account-btns__confirm btn">Сохранить</button>
                <div className="account-btns__exit">
                    <button onClick={onClickExitBtn}>Выйти</button>
                </div>
            </div>           
        </>
    );
}