import {useContext, useReducer} from "react";
import classNames from "classnames";

import {loginInputs as inputs} from "@utils/constants";
import {isEmptyValue} from "@utils/helpers"; 
import {authContext} from "@services";

import "./Login.style.scss";


export default function Login() {
    const {inputsError, inputsValue, onSubmitForm, setRegisteredUser, setInputsValue, setInputsError} = useContext(authContext);
    const [visiblePassword, setVisiblePassword] = useReducer(prev => !prev, false);


    const onCheckingVisibility = (id, type) => {
        if (id !== 'password') {
            return type;
        } else if (visiblePassword) {
            return 'text';
        } else {
            return 'password';
        }
    }

    const onClickChangeStep = () => {
        setRegisteredUser(prev => !prev);
        setInputsValue({});
        setInputsError({});
    }


    return (
        <>
            <p className="auth-popup__title">Добро пожаловать в <span>Pero</span></p>
            <p className="auth-popup__subtitle">
                <span className="auth-popup__subtitle-text">Ещё нет аккаунта?</span>
                <span className="auth-popup__subtitle-btn" onClick={onClickChangeStep}>Зарегистрируйтесь</span>
            </p>
            <p className="auth-popup__error">{inputsError?.exist || inputsError?.confirm || ''}</p>
            <form autoComplete="off" className="auth-popup__form" onSubmit={onSubmitForm}>
                {inputs.map((item, index) => (
                    <div className="auth-popup__form-wrapper auth-form" key={index}>
                        <input 
                            {...item}
                            className="auth-form__input"
                            onChange={(event) => setInputsValue({...inputsValue, [item.id]: event.target.value})}
                            type={onCheckingVisibility(item.id, item.type)}
                            value={isEmptyValue(inputsValue, item.id)}
                            required
                        />
                        <label 
                            className={classNames("auth-form__label", 
                                !!inputsError?.[item.id] && "auth-form__label--error",
                                !!inputsValue?.[item.id] && "auth-form__label--active"
                            )} 
                            htmlFor={item.id}
                        >
                            {inputsError?.[item.id] || item.placeholder}
                        </label>
                        {item.type === 'password' && (
                            <svg className="auth-form__icon" onClick={setVisiblePassword} height="18" viewBox="0 0 25 18" width="25">
                                <path d="M24.8326 8.1271C24.0329 6.74015 19.6347 -0.21958 12.1626 0.00533048C5.25288 0.180261 1.25447 6.25285 0.167402 8.1271C0.057735 8.31705 0 8.53252 0 8.75185C0 8.97119 0.057735 9.18666 0.167402 9.37661C0.954589 10.7386 5.16542 17.4984 12.525 17.4984H12.8374C19.7471 17.3234 23.758 11.2509 24.8326 9.37661C24.9423 9.18666 25 8.97119 25 8.75185C25 8.53252 24.9423 8.31705 24.8326 8.1271ZM12.7749 14.9994C7.38953 15.1243 3.87843 10.5137 2.77886 8.75185C4.02837 6.74015 7.28957 2.62929 12.2876 2.50434C17.648 2.36689 21.1716 6.99005 22.2836 8.75185C20.9966 10.7636 17.7729 14.8744 12.7749 14.9994Z" fill="#E47F46"/>
                                <path d="M12.5 4.3786C11.635 4.3786 10.7895 4.63509 10.0703 5.11563C9.35114 5.59617 8.79061 6.27918 8.45961 7.07829C8.1286 7.8774 8.042 8.75671 8.21074 9.60504C8.37949 10.4534 8.796 11.2326 9.40761 11.8442C10.0192 12.4558 10.7985 12.8724 11.6468 13.0411C12.4951 13.2098 13.3744 13.1232 14.1735 12.7922C14.9727 12.4612 15.6557 11.9007 16.1362 11.1815C16.6167 10.4623 16.8732 9.61681 16.8732 8.75186C16.8732 7.592 16.4125 6.47965 15.5923 5.6595C14.7722 4.83935 13.6598 4.3786 12.5 4.3786ZM12.5 10.6261C12.1293 10.6261 11.7669 10.5162 11.4587 10.3102C11.1505 10.1043 10.9102 9.81158 10.7684 9.46911C10.6265 9.12663 10.5894 8.74978 10.6617 8.38621C10.7341 8.02264 10.9126 7.68868 11.1747 7.42656C11.4368 7.16444 11.7708 6.98594 12.1343 6.91362C12.4979 6.8413 12.8747 6.87842 13.2172 7.02028C13.5597 7.16213 13.8524 7.40236 14.0584 7.71058C14.2643 8.0188 14.3742 8.38117 14.3742 8.75186C14.3742 9.24895 14.1768 9.72567 13.8253 10.0772C13.4738 10.4287 12.9971 10.6261 12.5 10.6261Z" fill="#E47F46"/>
                            </svg>
                        )}
                    </div>)
                )}
                <button className="auth-popup__form-btn" type="submit">Войти</button>
            </form>
        </>
    );
}