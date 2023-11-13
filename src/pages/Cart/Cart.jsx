import {useContext, useEffect, useState} from "react";
// import axios from "axios";

import {toFormatPrice, isPWA} from "@utils/helpers";
// import {fetchCartOpenProducts} from "@api";
// import {appContext} from "@services";
import classNames from "classnames";
import {
    AuthPopup,
    Footer,
    Header,
    PageUp,
    SearchBar,
    SneakerCartCard,
    SneakerSlider
} from "@components";

import "./Cart.style.scss";



export default function Cart() {
    // const {cartItems, isRegisteredUser} = useContext(appContext);



    useEffect(() => {
        document.title = 'Оформление заказа';
        // axios.get(fetchCartOpenProducts(cartItems))
        //      .then()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const onFormTitle = () => {
        // if (!isLoading && !isError && data.pages[0].amount !== 0) {
        //     return `${data.pages[0].amount} ${toFormatAmountText(data.pages[0].amount)}`;
        // }
        return '3 товара'
    }

    
    return (
        <>
            <Header/>
            <SearchBar/>
            <div className="content">
                <h4 className="content__amount">
                    <span className="content__amount-title">Корзина</span>
                    <span className="content__amount-number">{onFormTitle()}</span>
                </h4>
                <div className="content__cart">
                    <div className="content__cart-goods cart-goods">
                        <SneakerCartCard/>
                        <SneakerCartCard/>
                        <SneakerCartCard/>
                    </div>
                    <div className="content__cart-order cart-order">
                        <h4 className="cart-order__title">Сумма заказа</h4>
                        <p className="cart-order__amount">
                            <span className="cart-order__amount-left">Товаров в заказе</span>
                            <span className="cart-order__amount-right">3</span>
                        </p>
                        <p className="cart-order__amount">
                            <span className="cart-order__amount-left">Товары на сумму</span>
                            <span className="cart-order__amount-right">{`${toFormatPrice('82999')} ₽`}</span>
                        </p>
                        <h1 className="cart-order__total">
                            <span className="cart-order__total-left">Итого:</span>
                            <span className="cart-order__total-right">{`${toFormatPrice('82999')} ₽`}</span>
                        </h1>
                        <button className={classNames("cart-order__btn", isPWA() && "mobile")}>Оформить заказ</button>
                        {isPWA() && (
                            <>
                                <p className="cart-order__mobile-text">{`${toFormatPrice('82999')} ₽`}</p>
                                <button className="cart-order__mobile-btn">Оформить</button>
                            </>
                        )}
                    </div>
                </div>
                <SneakerSlider title='Рекомендуем:'/>
            </div>
            <Footer activePage='cart'/>

            <AuthPopup/>
            <PageUp/>
        </>
    );
}