import {useNavigate} from "react-router-dom";

import {
    Footer,
    HeaderTop,
    SearchBar,
    SignPopup,
} from "@components";

import "./Error.style.scss";

import errorImage from "@assets/images/content-images/error-image.png";


export default function Error() {
    const navigate = useNavigate();


    return (
        <>
            <HeaderTop />
            <SearchBar />
            <div className="content">
                <div className="error">
                    <div className="error__left">
                        <h2 className="error__left-status">404</h2>
                        <img className="error__left-image" src={errorImage} alt="status"/>
                    </div>
                    <div className="error__right">
                        <h3 className="error__right-title">Ошибка</h3>
                        <h6 className="error__right-subtitle">Страница, которую вы ищете, не существует либо устарела.</h6>
                        <p className="error__right-text">
                            Вы можете вернуться 
                            <span onClick={() => window.history.length !== 1 ? navigate(-1) : navigate('/')}>назад</span>
                            , воспользоваться меню либо перейти 
                            <span onClick={() => navigate('/')}>на главную</span>.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />

            <SignPopup />
        </>
    );
}