import {useEffect} from "react";

import {isPWA} from "@utils/helpers";
import {
    Footer,
    InstallSlider,
    HeaderTop,
    SearchBar,
    SignPopup,
    SneakerCart,
    SneakerSlider
} from "@components";

import "./Cart.style.scss";


export default function Cart() {
    useEffect(() => {
        document.title = 'Оформление заказа';
    }, [])

    
    return (
        <>
            <HeaderTop />
            <SearchBar />
            <div className="content">
                <div className="cart">
                    <h4 className="cart__title">
                        <span>Корзина</span>
                        <span>3 товара</span>
                    </h4>
                    <div className="cart__sections">
                        <div className="cart__sections-items items">
                            <SneakerCart />
                        </div>
                        <div className="cart__sections-order order">
                            <h4 className="order__title">Сумма заказа</h4>
                            <p className="order__check">
                                <span>3 товара на сумму</span>
                                <span>82 197 ₽</span>
                            </p>
                            <h2 className="order__total">
                                <span>Итого:</span>
                                <span>82 197 ₽</span>
                            </h2>
                            <button className="order__btn btn">Оформить заказ</button>
                        </div>
                    </div>
                </div>
                <SneakerSlider title='Рекомендуем:' mobileDevice={isPWA() ? true : false}/>
            </div>
            <Footer />

            <InstallSlider />
            <SignPopup />
        </>
    );
}