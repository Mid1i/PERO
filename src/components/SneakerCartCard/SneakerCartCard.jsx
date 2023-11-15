import {toFormatPrice, isPWA} from "@utils/helpers";
import {useContext, useReducer} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import {useNoScroll} from "@hooks";

import {imagesURL} from "@utils/constants";
import {appContext} from "@services";


import "./SneakerCartCard.style.scss";


export default function SneakerCartCard({amount, id, preview, name, price, quantity, size, sizeId}) {
    const {isInFavourite, onAddToFavourite, onAddToCart, onSubstractFromCart, onRemoveFromCart} = useContext(appContext);
    const [actionsPopup, setActionsPopup] = useReducer(prev => !prev, false);

    const navigate = useNavigate();
    
    useNoScroll(actionsPopup);


    const onRemoveSneaker = () => {
        onRemoveFromCart(sizeId);
        setActionsPopup();
    }


    return (
        <div className={classNames("cart-goods__item", isPWA() && "mobile")}>
            <img 
                alt={name}
                className={classNames("cart-goods__item-image", isPWA() && "mobile")} 
                onClick={() => navigate(`/catalog/product/${id}`)}
                src={`${imagesURL}/unscaled/${preview}`}
            />
            <div className="cart-goods__item-data item-data">
                <div className="item-data__top">
                    <h2 className="item-data__top-title">{name}</h2>
                    <p className="item-data__top-price">{`${toFormatPrice(amount * price)} ₽`}</p>
                    {isPWA() && (
                        <svg className="item-data__top-icon" onClick={setActionsPopup} height="7" viewBox="0 0 26 7" width="26">
                            <path d="M3.32304 7C1.49089 7 0 5.43018 0 3.50024C0 1.56982 1.49089 0 3.32304 0C5.15518 0 6.64607 1.57039 6.64607 3.50024C6.64607 5.4297 5.15527 7 3.32304 7ZM3.32304 1.04921C2.03992 1.04921 0.996553 2.1488 0.996553 3.49976C0.996553 4.85072 2.03992 5.94982 3.32304 5.94982C4.60615 5.94982 5.64952 4.85082 5.64952 3.49976C5.64952 2.1487 4.60615 1.04921 3.32304 1.04921Z" fill="#1F1F21"/>
                            <path d="M13.1303 7C11.2981 7 9.80725 5.43018 9.80725 3.50024C9.80725 1.56982 11.2981 0 13.1303 0C14.963 0 16.4533 1.57039 16.4533 3.50024C16.4533 5.4297 14.963 7 13.1303 7ZM13.1303 1.04921C11.8472 1.04921 10.8038 2.1488 10.8038 3.49976C10.8038 4.85072 11.8472 5.94982 13.1303 5.94982C14.4129 5.94982 15.4568 4.85082 15.4568 3.49976C15.4568 2.1487 14.4129 1.04921 13.1303 1.04921Z" fill="#1F1F21"/>
                            <path d="M22.677 7C20.8443 7 19.354 5.43018 19.354 3.50024C19.354 1.56982 20.8443 0 22.677 0C24.5097 0 26.0001 1.57039 26.0001 3.50024C26.0002 5.4297 24.5097 7 22.677 7ZM22.677 1.04921C21.3945 1.04921 20.3506 2.1488 20.3506 3.49976C20.3506 4.85072 21.3945 5.94982 22.677 5.94982C23.9596 5.94982 25.0035 4.85082 25.0035 3.49976C25.0035 2.1487 23.9597 1.04921 22.677 1.04921Z" fill="#1F1F21"/>
                        </svg>
                    )}
                </div>
                <p className="item-data__size">{`Размер: ${size}`}</p>
                {!isPWA() && (
                    <div className="item-data__counters">
                        <button 
                            className="item-data__counters-minus" 
                            disabled={(amount === 1) ? true : false}
                            onClick={() => onSubstractFromCart(sizeId, amount)}
                        >
                            <svg height="2" viewBox="0 0 13 2" width="13">
                                <path d="M0 1H13" stroke="#1F1F21" strokeWidth="1.5"/>
                            </svg>
                        </button>
                        <span className="item-data__counters-number">{amount}</span>
                        <button 
                            className="item-data__counters-plus" 
                            disabled={(amount === quantity || amount === 10) ? true : false}
                            onClick={() => onAddToCart(sizeId)} 
                        >
                            <svg height="13" viewBox="0 0 13 13" width="13">
                                <path d="M6.5 0V13M0 6.5H13" stroke="#1F1F21" strokeWidth="1.5"/>
                            </svg>
                        </button>
                    </div>
                )}
                <div className={classNames("item-data__btns", isPWA() && "mobile")}>
                    <p className="item-data__btns-price">{`${toFormatPrice(amount * price)} ₽`}</p>
                    {!isPWA() && (
                        <>
                            <button className="item-data__btns-delete" onClick={() => onRemoveFromCart(sizeId)}>
                                <svg height="16" viewBox="0 0 12 16" width="12">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.5 1.86667C4.5 1.79594 4.52634 1.72811 4.57322 1.6781C4.62011 1.6281 4.6837 1.6 4.75 1.6H7.25C7.3163 1.6 7.37989 1.6281 7.42678 1.6781C7.47366 1.72811 7.5 1.79594 7.5 1.86667V3.2H4.5V1.86667ZM9 1.86667V3.2H11.25C11.4489 3.2 11.6397 3.28429 11.7803 3.43431C11.921 3.58434 12 3.78783 12 4C12 4.21217 11.921 4.41566 11.7803 4.56569C11.6397 4.71571 11.4489 4.8 11.25 4.8H0.75C0.551088 4.8 0.360322 4.71571 0.21967 4.56569C0.0790175 4.41566 0 4.21217 0 4C0 3.78783 0.0790175 3.58434 0.21967 3.43431C0.360322 3.28429 0.551088 3.2 0.75 3.2H3V1.86667C3 0.836267 3.784 0 4.75 0H7.25C8.216 0 9 0.836267 9 1.86667ZM2.496 7.12C2.48851 7.01354 2.46111 6.90976 2.41543 6.81477C2.36975 6.71978 2.30671 6.6355 2.23002 6.5669C2.15333 6.4983 2.06455 6.44677 1.9689 6.41534C1.87325 6.38391 1.77266 6.37322 1.67308 6.3839C1.5735 6.39458 1.47692 6.42641 1.38905 6.47752C1.30118 6.52863 1.22379 6.59799 1.16144 6.6815C1.09908 6.765 1.05303 6.86098 1.02599 6.96377C0.998953 7.06656 0.991476 7.17408 1.004 7.28L1.664 14.32C1.70738 14.7804 1.90952 15.2072 2.23121 15.5176C2.5529 15.828 2.97121 15.9999 3.405 16H8.595C9.495 16 10.247 15.2736 10.336 14.3189L10.996 7.27893C11.01 7.07114 10.9475 6.86572 10.8217 6.70635C10.6959 6.54698 10.5168 6.44623 10.3225 6.42553C10.1281 6.40483 9.93388 6.46581 9.78103 6.5955C9.62819 6.72519 9.5288 6.91336 9.504 7.12L8.844 14.16C8.8378 14.2258 8.80888 14.2868 8.76286 14.3312C8.71685 14.3755 8.65702 14.4001 8.595 14.4H3.405C3.34298 14.4001 3.28315 14.3755 3.23714 14.3312C3.19112 14.2868 3.1622 14.2258 3.156 14.16L2.496 7.12Z" fill="#F7F7F7"/>
                                </svg>
                                <span>Удалить</span>
                            </button>
                            <button className="item-data__btns-favorite" onClick={() => onAddToFavourite(id)}>
                                <svg className={classNames(isInFavourite(id) && "liked")} height="16" viewBox="0 0 16 16" width="16">
                                    <path d="M13.9876 9.68902V9.75741C13.9672 9.77686 13.9456 9.79775 13.9227 9.81991C13.7989 9.93997 13.6307 10.1067 13.43 10.3074C13.0281 10.7094 12.4897 11.2541 11.9027 11.8492C11.7147 12.0398 11.5217 12.2356 11.3265 12.4336C10.3031 13.4716 9.22051 14.5697 8.48699 15.2984C8.20384 15.5672 7.79616 15.5672 7.51301 15.2984C6.63829 14.4295 5.24829 13.0362 4.06592 11.8477C3.47404 11.2527 2.93451 10.7093 2.53807 10.3091C2.33981 10.1089 2.17759 9.9448 2.06258 9.82801C2.0443 9.80945 2.02761 9.79247 2.01244 9.77703V9.70146L1.88977 9.56036C1.01502 8.55421 0.5 7.2063 0.5 5.76824V5.67668V5.59184C0.57712 2.78087 2.6406 0.591558 4.93532 0.591558C5.29567 0.591558 5.76244 0.734165 6.22429 1.02021C6.66878 1.2955 7.07342 1.68228 7.3453 2.13435C7.45607 2.41858 7.71429 2.62875 8.0398 2.62875C8.37502 2.62875 8.63887 2.40586 8.74381 2.10873C8.97634 1.62759 9.37476 1.2229 9.8222 0.935876C10.2841 0.639558 10.7486 0.5 11.0647 0.5C13.4296 0.5 15.4227 2.67847 15.5 5.5916V5.76824C15.5 7.30648 14.9801 8.64249 14.1248 9.54434L13.9876 9.68902Z" fill="none" stroke="white"/>
                                </svg>
                                <span className={classNames(isInFavourite(id) && "liked")}>{isInFavourite(id) ? 'В избранном' : 'В избранное'}</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className={classNames("cart-goods__item-blackout blackout", actionsPopup && "active")}>
                <div className={classNames("blackout__popup actions-popup", actionsPopup && "active")}>
                    <div className="actions-popup__top">
                        <div className="actions-popup__top-counters actions-counters">
                            <button 
                                className="actions-counters__minus" 
                                disabled={(amount > 1) ? false : true}
                                onClick={() => onSubstractFromCart(sizeId, amount)}
                            >
                                <svg height="2" viewBox="0 0 13 2" width="13">
                                    <path d="M0 1H13" stroke="#007AFF" strokeWidth="1.5"/>
                                </svg>
                            </button>
                            <span className="actions-counters__number">{amount}</span>
                            <button 
                                className="actions-counters__plus"
                                disabled={(amount === quantity || amount === 10) ? true : false}
                                onClick={() => onAddToCart(sizeId)}
                            >
                                <svg height="13" viewBox="0 0 13 13" width="13">
                                    <path d="M6.5 0V13M0 6.5H13" stroke="#007AFF" strokeWidth="1.5"/>
                                </svg>
                            </button>
                        </div>
                        <p className="actions-popup__top-favorite" onClick={() => onAddToFavourite(id)}>{isInFavourite(id) ? `Удалить из избранного` : 'Добавить в избранное'}</p>
                        <p className="actions-popup__top-delete" onClick={onRemoveSneaker}>Удалить</p>
                    </div>
                    <p className="actions-popup__close" onClick={setActionsPopup}>Закрыть</p>
                </div>
            </div>
        </div>
    );
}