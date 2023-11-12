import {useContext} from "react";
import axios from "axios";

import {toFormatEmail, toFormatTime, toFormatTimeText} from "@utils/helpers"; 
import {authContext} from "@services";
import {fetchEmail} from "@api";

import "./EmailConfirming.style.scss";


export default function EmailConfirming() {
    const {inputsValue, timer, setTimer} = useContext(authContext);

    const onClickResendBtn = () => {
        axios.post(fetchEmail(inputsValue.email), {"typeLink": "CONFIRM_LINK"});
        setTimer(9);

        const countdown = window.setInterval(() => {
            if (timer > 0) {
                setTimer(prev => prev - 1);
            } else {
                clearInterval(countdown);
            }
        }, 1000);
    }


    return(
        <>
            <h3 className="auth-popup__title auth-popup__title--success">Подтверждение почтового адреса</h3>
            <p className="auth-popup__text">Ссылка для подтверждения отправлена на <span>{`${toFormatEmail(inputsValue?.email)}`}</span>. Перейдите по ссылке из письма в течение 24 часов.</p>
            <button 
                className="auth-popup__btn" 
                disabled={timer > 0 ? true : false}
                onClick={onClickResendBtn}
            >
                {`Отправить ещё раз ${timer > 0 ? `через ${toFormatTime(timer)} ${toFormatTimeText(timer)}` : ''}`}
            </button>
        </>
    );
}