import {useContext} from "react";

import {toFormatEmail, toFormatTime, toFormatTimeText} from "@utils/helpers"; 
import {authContext} from "@services";

import "./EmailConfirming.style.scss";


export default function EmailConfirming() {
    const {emailMutation, inputsValue, timer} = useContext(authContext);


    return(
        <>
            <h3 className="auth-popup__title auth-popup__title--success">Подтверждение почтового адреса</h3>
            <p className="auth-popup__text">Ссылка для подтверждения отправлена на <span>{`${toFormatEmail(inputsValue?.email)}`}</span>. Перейдите по ссылке из письма в течение 24 часов.</p>
            <button 
                className="auth-popup__btn" 
                disabled={timer > 0 ? true : false}
                onClick={() => emailMutation.mutate(inputsValue?.email)}
            >
                {`Отправить ещё раз ${timer > 0 ? `через ${toFormatTime(timer)} ${toFormatTimeText(timer)}` : ''}`}
            </button>
        </>
    );
}