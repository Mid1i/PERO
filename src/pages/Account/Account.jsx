import {useEffect} from "react";

import {
    Brands,
    Footer,
    HeaderTop,
    SearchBar,
    SignPopup,
    UserData
} from "@components";

import "./Account.style.scss";


export default function Account() {
    useEffect(() => {
        document.title = 'Мои данные';
    }, [])


    return (
        <>
            <HeaderTop />
            <SearchBar />
            <Brands />
            <div className="content content--account">
                <div className="account">
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

            <SignPopup />
        </>
    );
}