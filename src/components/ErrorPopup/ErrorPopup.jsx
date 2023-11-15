import classNames from "classnames";
import {useContext} from "react";

import {appContext} from "@services";
import {useNoScroll} from "@hooks";
 
import "./ErrorPopup.style.scss";


export default function ErrorPopup() {
    const {errorPopup, setErrorPopup} = useContext(appContext);

    useNoScroll(errorPopup);


    return (
        <>
            <div className={classNames("error__blackout blackout", !!errorPopup && "active")}>
                <div className={classNames("error__blackout-popup error-popup", !!errorPopup && "active")}>
                    <svg className="error-popup__icon" onClick={() => setErrorPopup('')} height="20" viewBox="0 0 20 20" width="20">
                        <path d="M18.1865 20L10.0064 11.8123L1.82637 20L0 18.1748L8.19293 10L0 1.82519L1.82637 0L10.0064 8.18766L18.1865 0.0128538L20 1.82519L11.8199 10L20 18.1748L18.1865 20Z" fill="#FFFFFF"/>
                    </svg>
                    <p className="error-popup__text">{errorPopup}</p>
                </div>
            </div>
        </>
    );
}