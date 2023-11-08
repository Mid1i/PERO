import classNames from "classnames";
import {useEffect} from "react";

import {isPWA} from "@utils/helpers";
import {
    AuthPopup,
    Brands,
    Footer,
    Header,
    SearchBar,
    UserData
} from "@components";

import "./Account.style.scss";


export default function Account() {
    useEffect(() => {
        document.title = 'Мои данные';
    }, [])


    return (
        <>
            <Header/>
            <SearchBar />
            <Brands />
            <div className="content content--account">
                <div className={classNames("account", isPWA() && "account--mobile")}>
                    <div className="account__panel">
                        <h6 className="account__panel-title active">Мои данные</h6>
                        <h6 className="account__panel-title">Мои заказы</h6>
                    </div>
                    <div className="account__content">
                        <UserData />
                    </div>
                </div>
            </div>
            <Footer activePage='profile'/>

            <AuthPopup/>
        </>
    );
}