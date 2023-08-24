import {useContext, useEffect} from "react";
import classNames from "classnames";

import {appContext} from "@services/Context";
import {sign} from "@utils/constants";

import "./SignPopup.style.scss";

import {blackCross} from "@assets/images";
import peroLogo from "@assets/images/logo/peroID-logo.svg";


export default function SignPopup() {
    const {regPopup, setRegPopup} = useContext(appContext);


    useEffect(() => {
        if (regPopup) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [regPopup])
    
    
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
                    <form className="sign-popup__content-form reg-form">
                        {sign.map((item, id) => (
                            <div className="reg-form__wrapper" key={id}>
                                <input 
                                    className="reg-form__wrapper-input"
                                    id={item.id}
                                    name={item.id}
                                    placeholder={item.label}
                                    required
                                    type={item.type}
                                />
                                <label className="reg-form__wrapper-label" htmlFor={item.id}>{item.label}</label>
                            </div>
                        ))}
                        <div className="reg-form__gender">
                            <div className="reg-form__gender-wrapper">
                                <label htmlFor="male">Я мужчина</label>
                                <input id="male" name="gender" type="radio" value="true"/>
                            </div>
                            <div className="reg-form__gender-wrapper">
                                <label htmlFor="female">Я женщина</label>
                                <input id="female" name="gender" type="radio" value="false"/>
                            </div>
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