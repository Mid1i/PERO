import {useNavigate} from "react-router-dom";

import {errors} from "@utils/constants/errors";

import "./Error.style.scss";

import errorImage from "@assets/images/content-images/error-image.png";


export default function Error({status}) {
    const navigate = useNavigate();

    const findErrorTitle = () => errors.find(error => error.id === status);

    const onClickBackButton = () => {
        if (window.history.length !== 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    }

    const setErrorTitle = () => {
        if (findErrorTitle()) {
            return errors.find(error => error.id === status).title;
        } else {
            return 'Сервер не отвечает.';
        }
    }


    return (
        <>
            <div className="error">
                <div className="error__left">
                    <h2 className="error__left-status">{status}</h2>
                    <img className="error__left-image" src={errorImage} alt="status"/>
                </div>
                <div className="error__right">
                    <h3 className="error__right-title">Ошибка</h3>
                    <h6 className="error__right-subtitle">{setErrorTitle()}</h6>
                    {findErrorTitle() ? (
                        <p className="error__right-text">
                            Вы можете вернуться 
                            <span onClick={() => onClickBackButton()}>назад</span>
                            , воспользоваться меню либо перейти 
                            <span onClick={() => navigate('/')}>на главную</span>.
                        </p>
                    ) : <p className="error__right-text">Попробуйте воспользоваться сайтом чуть позже.</p>}
                </div>
            </div>
        </>
    );
}