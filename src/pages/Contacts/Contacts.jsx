import {Link} from "react-router-dom";
import {useEffect} from "react";

import {useScroll} from "@hooks";
import {
    Footer, 
    LeftNavPanel,
    HeaderTop, 
    SearchBar, 
    SignPopup
} from "@components";

import "./Contacts.style.scss";

import tgIcon from "@assets/images/social-media/telegram.svg";
import gitIcon from "@assets/images/social-media/github.svg";
import peroIcon from "@assets/images/logo/pero-logo.svg";

import banner from "@assets/images/content-images/info-page/banner-image.jpg";


export default function About() {
    useScroll();
    
    useEffect(() => {
        document.title = 'Контакты компании Pero - PERO';
    }, [])


    const developersBlock = (title, nickname, gitLink, tgLink) => {
        return (
            <div className="link-blocks__item links-item">
                <h6 className="links-item__title">{title}</h6>
                <Link to={gitLink} className="links-item__github">{`Github - ${nickname}`}</Link>
                <Link to={tgLink} className="links-item__telegram">{`Telegram - ${nickname}`}</Link>
                <div className="links-item__hrefs">
                    <Link to={gitLink}>
                        <img src={gitIcon} className="links-item__hrefs-git" alt="git:dev"/>
                    </Link>
                    <Link to={tgLink}>
                        <img src={tgIcon} className="links-item__hrefs-tg" alt="tg:dev"/>
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <>
            <HeaderTop />
            <SearchBar />
            <div className="content content--contacts">
                <img src={banner} alt="banner" className="content__banner"/>
                <div className="contacts">
                    <LeftNavPanel />
                    <div className="contacts__right">
                        <h5 className="contacts__right-title">Контакты</h5>
                        <div className="contacts__right-blocks link-blocks">
                            {developersBlock('Frontend Dev.', 'Mid1i', 'https://github.com/Mid1i', 'https://t.me/Mid1i')}
                            {developersBlock('Backend Dev.', 'h0riz4n', 'https://github.com/h0riz4n', 'https://t.me/h0riz4n')}
                            <div className="contacts__blocks-item links-item">
                                <h6 className="links-item__title">PERO</h6>
                                <p className="links-item__text">Лендинг франшизы PERO.</p>
                                <div className="links-item__hrefs">
                                    <Link to=''>
                                        <img src={peroIcon} className="links-item__hrefs-pero" alt="site:pero"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="contacts__blocks-item links-item">
                                <h6 className="links-item__title">Служба поддержки клиентов</h6>
                                <p className="links-item__text">Работает для покупателей интернет-магазина с 9:00 до 22:00 по московскому времени, без выходных.</p>
                                <div className="links-item__hrefs">
                                    <Link to='https://t.me/pero_nn_bot'>
                                        <img src={tgIcon} className="links-item__hrefs-tg" alt="tg:pero"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <SignPopup />
        </>
    );
}