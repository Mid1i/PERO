import {useNavigate} from "react-router-dom";

import {errors} from "@utils/constants/errors";

import "./Error.style.scss";

import errorImage from "@assets/images/content-images/error-image.png";


export default function Error({status}) {
    const navigate = useNavigate();


    return (
        <>
            <div className="error">
                <div className="error__left">
                    <h2 className="error__left-status">{status}</h2>
                    <img className="error__left-image" src={errorImage} alt="status"/>
                </div>
                <div className="error__right">
                    <h3 className="error__right-title">Ошибка</h3>
                    <h6 className="error__right-subtitle">{errors.find(error => error.id === status)?.title || 'Сервер не отвечает.'}</h6>
                    {(errors.find(error => error.id === status)) ? (
                        <p className="error__right-text">
                            Вы можете вернуться 
                            <span onClick={() => window.history.length !== 1 ? navigate(-1) : navigate('/')}>назад</span>
                            , воспользоваться меню либо перейти 
                            <span onClick={() => navigate('/')}>на главную</span>.
                        </p>
                    ) : <p className="error__right-text">Попробуйте воспользоваться сайтом чуть позже.</p>}
                </div>
            </div>
        </>
    );
}