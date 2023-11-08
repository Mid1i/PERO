import {Link, useNavigate} from "react-router-dom";
import classNames from "classnames";

import {footerTitles as titles, footerElements} from "@utils/constants";
import {isPWA, toFormatBrandForRequest} from "@utils/helpers";
import FooterMobile from "./FooterMobile/FooterMobile";

import "./Footer.style.scss";

import peroLogo from "@assets/images/logo/pero-logo.svg";
import telegramLogo from "@assets/images/social-media/telegram.svg";


export default function Footer({className='footer', activePage, footerRef}) {
    const navigate = useNavigate();

    const onClickFooterElement = (id, element, elementId) => {
        if (id === 2) {
            navigate(`/catalog/?brands=${toFormatBrandForRequest(element)}`);
        } else {
            const link = footerElements[id - 1].links[elementId];
            navigate(link);
        }
    }

    const onClickFooterTitle = (title) => {
        const links = {
            'О магазине': '/about',
            'Бренды': '/brands',
            'Помощь': '/help'
        };
        
        navigate(links[title]);
    }


    return (
        <footer className={classNames(className, isPWA() && "footer--mobile")} ref={footerRef}>
            {isPWA() ? <FooterMobile activePage={activePage}/> : (
                <div className="footer__wrapper">
                    <div className="footer__wrapper-top footer-top">
                        {titles.map(({id, title}) => (
                                <div className="footer-top__item" key={id}>
                                    <h5 className="footer-top__item-title" onClick={() => onClickFooterTitle(title)}>{title}</h5>
                                    <ul className="footer-top__item-list footer-list">
                                        {footerElements[id - 1].elements.map((element, index) => (
                                            <li 
                                                className="footer-list__el" 
                                                onClick={() => onClickFooterElement(id, element, index)} 
                                                key={index}
                                            >
                                                {element}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )
                        )}
                        <div className="footer-top__item footer-top__item--last">
                            <h5 className="footer-top__item-title">Остались вопросы?</h5>
                            <p className="footer-top__item-text">Мы с радостью на них ответим</p>
                            <Link to='https://t.me/pero_nn_bot'>
                                <button className="footer-top__item-btn footer-btn">
                                    <span className="footer-btn__text">Задать вопрос</span>
                                    <svg className="footer-btn__icon" height="30" viewBox="0 0 30 30" width="30">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.8749 2.7753C12.7253 2.59249 13.5926 2.50031 14.4624 2.5003C17.9398 2.48329 21.2538 3.974 23.5481 6.58713C25.8424 9.20027 26.8917 12.6794 26.4249 16.1253C25.6749 21.8753 19.9999 26.5253 14.1999 26.5253H5.87492C5.16726 26.5256 4.51145 26.1542 4.14774 25.5471C3.78403 24.9401 3.76587 24.1867 4.09992 23.5628L4.43742 22.9128C4.77332 22.2867 4.74949 21.529 4.37492 20.9253C2.27705 17.6273 1.91687 13.5142 3.4096 9.90182C4.90234 6.2894 8.06091 3.63036 11.8749 2.7753ZM14.0999 24.6378C19.1957 24.5574 23.5294 20.8981 24.4624 15.8878C24.8862 12.9841 24.0133 10.0409 22.0749 7.8378C20.1549 5.64064 17.3803 4.37864 14.4624 4.3753C13.7234 4.37671 12.9864 4.45208 12.2624 4.6003C9.04385 5.31642 6.37465 7.55314 5.10646 10.5968C3.83828 13.6404 4.12958 17.1107 5.88742 19.9003C6.63528 21.0752 6.68791 22.563 6.02492 23.7878L5.68742 24.4253C5.65994 24.467 5.65994 24.5211 5.68742 24.5628C5.73742 24.6378 5.81242 24.6378 5.81242 24.6378H14.0999Z" fill="#FFFFFF"/>
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="footer__wrapper-bottom footer-bottom">
                        <p className="footer-bottom__left">© Pero, 2023</p>
                        <div className="footer-bottom__right">
                            <img className="footer-bottom__right-icon" src={peroLogo} alt="pero"/>
                            <Link to='https://t.me/pero_nn_bot'>
                                <img className="footer-bottom__right-icon" src={telegramLogo} alt="tg:pero"/>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    )
}
