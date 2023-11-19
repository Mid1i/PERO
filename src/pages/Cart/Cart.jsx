import {useContext, useEffect, useState} from "react";
import {TailSpin} from "react-loader-spinner";
import axios from "axios";

import {toFormatAmountText, toFormatPrice, isPWA} from "@utils/helpers";
import {fetchCartOpenProducts, fetchCartProducts} from "@api";
import {useUserRequest} from "@hooks";
import {appContext} from "@services";
import classNames from "classnames";
import {
    AuthPopup,
    ErrorPopup,
    EmptyContent,
    Error,
    Footer,
    Header,
    PageUp,
    SearchBar,
    SneakerCartCard,
    SneakerSlider
} from "@components";

import "./Cart.style.scss";



export default function Cart() {
    const {cartItems, isMale, isRegisteredUser, setCartItems, setErrorPopup} = useContext(appContext);
    const [requestData, setRequestData] = useState({
        data: null,
        error: null,
        status: 'loading'
    })

    const {requestData: {data: cartData, status: cartStatus}} = useUserRequest(fetchCartProducts, localStorage.getItem('accessToken'), isRegisteredUser, setErrorPopup); 
    

    useEffect(() => {
        document.title = 'Оформление заказа';

        if (!isRegisteredUser && cartItems.length !== 0) {
            axios.get(fetchCartOpenProducts(cartItems))
                 .then(response => setRequestData({data: response.data.content, error: null, status: 'complete'}))
                 .catch(error => setRequestData({data: null, error: error, status: 'error'}))
        }
    }, [cartItems]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (cartStatus === 'complete') setCartItems(cartData);
    }, [cartStatus]) // eslint-disable-line react-hooks/exhaustive-deps


    const onFormTitle = () => {
        if (isRegisteredUser) {
            return `${onFormTotalAmount()} ${toFormatAmountText(onFormTotalAmount())}`;
        } else if (requestData.status === 'complete') {
            return `${onFormTotalAmount()} ${toFormatAmountText(onFormTotalAmount())}`;
        }
    }

    const onFormTotalAmount = () => {
        if (isRegisteredUser) {
            return cartItems.reduce((totalAmount, {cartQuantity}) => totalAmount + cartQuantity, 0);
        } else if (requestData.status === 'complete') {
            return cartItems.reduce((totalAmount, {amount}) => totalAmount + amount, 0);
        } else {
            return 0;
        }
    }
    
    const onFormTotalPrice = () => {
        if (isRegisteredUser) {
            return cartItems.reduce((totalPrice, {cartPrice, price}) => totalPrice + cartPrice, 0);
        } else {
            return requestData.data.reduce((totalPrice, {sizeId, price}) => totalPrice + ((cartItems.find(item => item.id === sizeId)?.amount || 0) * price), 0);
        }
    }

    const loadingRender = () => {
        return (
            <div className="loader">
                <TailSpin ariaLabel='loading' color="#E47F46" height={100} width={100}/>
            </div>
        );
    }

    
    return (
        <>
            <Header/>
            <SearchBar/>
            <div className="content">
                {cartItems.length !== 0 && (
                    <h4 className="content__amount">
                        <span className="content__amount-title">Корзина</span>
                        <span className="content__amount-number">{(onFormTotalAmount() > 0) && onFormTitle()}</span>
                    </h4>
                )}
                <div className="content__cart">
                    {(requestData.status !== 'error' || isRegisteredUser) ? (
                        <>
                            <div className="content__cart-goods cart-goods">
                            {(requestData.status === 'loading' && !isRegisteredUser && cartItems.length !== 0) ? loadingRender() : (
                                cartItems.length === 0 ? (
                                    <EmptyContent title='В корзине нет товаров' text='Для выбора вещей перейдите в каталог.'/>
                                ) : (
                                    !isRegisteredUser ? (
                                        requestData.data.map((item, index) => (
                                            cartItems.find(sneaker => sneaker.id === item.sizeId) && (
                                                <SneakerCartCard 
                                                    amount={isRegisteredUser ? item.cartQuantity : cartItems.find(sneaker => sneaker.id === item.sizeId).amount}
                                                    key={index}
                                                    {...item} 
                                                />
                                            )
                                        ))
                                    ) : (
                                        cartItems.map((item, index) => (
                                                <SneakerCartCard 
                                                    amount={isRegisteredUser ? item.cartQuantity : cartItems.find(sneaker => sneaker.id === item.sizeId).amount}
                                                    key={index}
                                                    {...item} 
                                                />
                                            )
                                        )
                                    )
                                )
                            )}
                            </div>
                            {((requestData.status === 'complete' || isRegisteredUser) && cartItems.length !== 0) && (
                                <div className="content__cart-order cart-order">
                                    <h4 className="cart-order__title">Сумма заказа</h4>
                                    <p className="cart-order__amount">
                                        <span className="cart-order__amount-left">Товаров в заказе</span>
                                        <span className="cart-order__amount-right">{onFormTotalAmount()}</span>
                                    </p>
                                    <p className="cart-order__amount">
                                        <span className="cart-order__amount-left">Товары на сумму</span>
                                        <span className="cart-order__amount-right">{`${toFormatPrice(onFormTotalPrice())} ₽`}</span>
                                    </p>
                                    <h1 className="cart-order__total">
                                        <span className="cart-order__total-left">Итого:</span>
                                        <span className="cart-order__total-right">{`${toFormatPrice(onFormTotalPrice())} ₽`}</span>
                                    </h1>
                                    <button className={classNames("cart-order__btn", isPWA() && "mobile")}>Оформить заказ</button>
                                    {isPWA() && (
                                        <>
                                            <p className="cart-order__mobile-text">{`${toFormatPrice(onFormTotalPrice())} ₽`}</p>
                                            <button className="cart-order__mobile-btn">Оформить</button>
                                        </>
                                    )}
                                </div>
                            )}
                        </>
                    ) : <Error status={requestData.error?.response?.status || 502}/>}
                </div>
                {cartItems.length !== 0 && <SneakerSlider male={isMale} title='Рекомендуем:'/>}
            </div>
            <Footer activePage='cart'/>

            <AuthPopup/>
            <ErrorPopup/>
            <PageUp/>
        </>
    );
}