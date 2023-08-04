import React from 'react';
import { Link } from "react-router-dom";

import { appContext } from "@services/Context";
import { imageImport } from '@utils/helpers';
import { brands } from "@utils/constants";

import mainLogo  from "@assets/images/logo/shop-logo.png";

import "./Header.styles.scss";

function Header({ className="header", pageToLink="/catalog/", pageToLinkName="Каталог" }) {
    const { isBurgerOpen, setBurgerOpen } = React.useContext(appContext);
    const images = imageImport();

    return (
        <header className={ className }>
            <div className="header__left">
                <Link to="/">
                    <img src={ mainLogo } width={ 140 } height={ 65 } alt="logo" />
                </Link>

                <p className="header__left-gender">
                    <span className="js-gender">Мужчинам</span>
                    <span>/</span>
                    <span>Женщинам</span>
                </p>
            </div>

            <div className={ isBurgerOpen ? "header__burger active" : "header__burger" } onClick={ () => setBurgerOpen(!isBurgerOpen) }>
                <span className="header__burger-span"></span>
            </div>

            <nav className="header__navigation">
                <ul className="header__navigation-list nav-list">
                    <li className="nav-list__el">
                        <Link to={ pageToLink }>{ pageToLinkName }</Link>
                    </li>
                    <li className="nav-list__el">Избранное</li>
                    <li className="nav-list__el">Профиль</li>
                    <li className="nav-list__el">
                        <svg width="19" height="20" fill="none">
                            <path fill="#000" d="M0 .857C0 .63.086.412.238.251A.793.793 0 0 1 .814 0h.605c1.03 0 1.649.73 2.001 1.41.236.452.406.976.54 1.452a1.3 1.3 0 0 1 .108-.005h13.558c.9 0 1.551.908 1.304 1.82l-1.983 7.325a3.152 3.152 0 0 1-1.071 1.647 2.885 2.885 0 0 1-1.797.634H7.626a2.89 2.89 0 0 1-1.809-.643 3.155 3.155 0 0 1-1.068-1.667l-.824-3.168L2.558 3.95l-.001-.01c-.17-.647-.328-1.254-.564-1.707-.227-.44-.41-.519-.573-.519H.814a.793.793 0 0 1-.576-.25A.88.88 0 0 1 0 .856ZM7.051 20c.576 0 1.128-.24 1.535-.67.406-.428.635-1.01.635-1.616a2.35 2.35 0 0 0-.635-1.616 2.115 2.115 0 0 0-1.535-.67c-.575 0-1.127.241-1.534.67a2.35 2.35 0 0 0-.635 1.616c0 .607.228 1.188.635 1.617.407.428.959.669 1.534.669Zm7.594 0c.575 0 1.127-.24 1.534-.67a2.35 2.35 0 0 0 .636-1.616 2.35 2.35 0 0 0-.636-1.616 2.116 2.116 0 0 0-1.534-.67c-.575 0-1.127.241-1.534.67a2.35 2.35 0 0 0-.636 1.616c0 .607.229 1.188.636 1.617.407.428.959.669 1.534.669Z"/>
                        </svg>
                        <span>Корзина</span>
                    </li>
                </ul>
            </nav>

            <div className="header__blackout" style={ isBurgerOpen ? { visibility: "visible", opacity: 1 } : { visibility: "hidden", opacity: 0 } }>
                <div className="header__mobile" style={ isBurgerOpen ? { right: "0%" } : { right: "-100%" } }>
                    <h4 className="header__mobile-title">Бренды</h4>
                    <ul className="header__mobile-list mobile-nav">
                        { brands.map((item, i) => { 
                            return (
                                <li className="mobile-nav__el" key={ i }>
                                    <img src={ images.filter(obj => obj.includes(item)) } alt={ item } width={ 65 } height={ 65 } />
                                </li>
                            )}
                        )}
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;