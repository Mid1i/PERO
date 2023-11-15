import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {useContext, useEffect, useReducer, useState} from "react";
import {useNavigate} from "react-router-dom";
import {isMobile} from "react-device-detect";
import {RWebShare} from "react-web-share";
import classNames from "classnames";
import Slider from "react-slick";

import {imageImport, toFormatPrice, toFormatBrand, toFormatBrandForRequest, toFormatTitle} from "@utils/helpers";
import {settings} from "@utils/constants/slider";
import {appContext} from "@services/Context";
import {imagesURL} from "@utils/constants";
import {isPWA} from "@utils/helpers";
import {useNoScroll} from "@hooks";

import "./SneakerInfo.style.scss";


export default function Sneaker({brand, color, description, id, images, name, male, preview, price, sizes}) {
    const {cartItems, isRegisteredUser, isInFavourite, onAddToFavourite, onAddToCart, successPopup, setErrorPopup, setSuccessPopup, setIsMale} = useContext(appContext);
    const [popupImage, setPopupImage] = useReducer(prev => !prev, false);
    const [currentImage, setCurrentImage] = useState(preview);
    const [sizeWarning, setSizeWarning] = useState(false);
    const [chooseSize, setChooseSize] = useState(false);
    const [currentSize, setCurrentSize] = useState('');
    const [zoomImage, setZoomImage] = useState(false);
    
    const navigate = useNavigate();
    const brandsImages = imageImport();
    const itemImages = [preview, ...images];

    useNoScroll([popupImage, successPopup]);


    useEffect(() => {setCurrentImage(preview);}, [preview]);

    useEffect(() => {document.title = `${'кроссовки'.indexOf(name.toLowerCase()) ? 'Кроссовки' : 'Кеды'} ${toFormatBrand(brand).toUpperCase()} — купить в интернет-магазине PERO`;}, [name, brand]);


    const onBuyItem = () => {
        if (currentSize !== '') {
            if ((!isRegisteredUser && cartItems.reduce((totalAmount, {amount}) => totalAmount + amount, 0) < 10)) {
                onAddToCart(currentSize);
                setChooseSize(false);

                setSuccessPopup();
                if (isMobile) window.setTimeout(() => {setSuccessPopup();}, 2000);
            } else if (isRegisteredUser) {
                onAddToCart(currentSize);
                setChooseSize(false);
            } else {
                setErrorPopup('Количество товаров в корзине не должно превшать 10');
            }
        } else {
            setChooseSize(true);
        }
    }

    const onClickBackBtn = () => {
        if (window.history.length !== 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    }

    const onClickGenderText = () => {
        setIsMale(male);
        navigate('/catalog');
    }

    const onClickSize = (sizeId) => {
        if (sizeId === currentSize) {
            setCurrentSize('');
        } else {
            setCurrentSize(sizeId);
        }
    }
    
    const onCheckingSizes = (sizeId, quantity) => {
        for (let i = 0; cartItems[i]; i++) {
            if (cartItems[i].id === sizeId) {
                if (quantity - cartItems[i].amount === 1 && !sizeWarning) setSizeWarning(true);
                if (quantity - cartItems[i].amount === 0 && sizeWarning) setSizeWarning(false);
                return quantity - cartItems[i].amount;
            } 
        }

        if (quantity === 1 && !sizeWarning) setSizeWarning(true);
        if (quantity === 0 && sizeWarning) setSizeWarning(false);
        return quantity;
    }
    

    return (
        <>
            <div className="content__product product">
                <div className="product__top">
                    <div className="product__top-left product-left">
                        {isPWA() && (
                            <span className="product-left__back" onClick={onClickBackBtn}>
                                <svg className="product-left__back-icon" width="6" height="11" viewBox="0 0 6 11">
                                    <path d="M5.77056 10.7579C5.91747 10.6028 6 10.3925 6 10.1732C6 9.95392 5.91747 9.74361 5.77056 9.58853L1.89154 5.49501L5.77056 1.40148C5.91331 1.24551 5.99229 1.03662 5.99051 0.819787C5.98872 0.602957 5.90631 0.395541 5.76101 0.242213C5.61572 0.0888856 5.41917 0.00191451 5.21371 3.0311e-05C5.00824 -0.00185388 4.81029 0.0815009 4.66249 0.232141L0.229439 4.91034C0.0825293 5.06542 0 5.27572 0 5.49501C0 5.71429 0.0825293 5.9246 0.229439 6.07968L4.66249 10.7579C4.80945 10.9129 5.00873 11 5.21653 11C5.42432 11 5.62361 10.9129 5.77056 10.7579Z" fill="#E47F46"/>
                                </svg>
                                <p className="product-left__back-text">Назад</p>
                            </span>
                        )}
                        <span className="product-left__heart" onClick={() => onAddToFavourite(id)}>
                            <svg className={classNames("product-left__heart-icon", isInFavourite(id) && "liked")} height="20" viewBox="0 0 20 20" width="20">
                                <path d="M17.3595 12.0614V12.1435C17.3455 12.157 17.3311 12.1709 17.3164 12.1852C17.1609 12.3359 16.9501 12.5449 16.6991 12.7959C16.1964 13.2987 15.5231 13.9799 14.7894 14.7237C14.5543 14.9621 14.3129 15.2069 14.0689 15.4544C12.7901 16.7515 11.4381 18.1229 10.5217 19.0333C10.2164 19.3222 9.78364 19.3222 9.47832 19.0333C8.38513 17.9473 6.64849 16.2066 5.17101 14.7214C4.43121 13.9777 3.75686 13.2986 3.2614 12.7984C3.0136 12.5482 2.81092 12.3432 2.66729 12.1973C2.65804 12.1879 2.64913 12.1789 2.64055 12.1701V12.0801L2.45655 11.8684C1.38323 10.6339 0.75 8.97826 0.75 7.2103V7.09585V6.99152C0.845755 3.53047 3.38374 0.864447 6.16916 0.864447C6.59028 0.864447 7.15113 1.03258 7.71455 1.38153C8.25273 1.71485 8.74106 2.18156 9.06933 2.72379C9.22657 3.11563 9.58858 3.41094 10.0498 3.41094C10.5262 3.41094 10.8969 3.0957 11.0451 2.68446C11.3242 2.11042 11.803 1.62291 12.3452 1.27506C12.9088 0.913557 13.4661 0.75 13.8308 0.75C16.7016 0.75 19.154 3.39976 19.25 6.99116V7.2103C19.25 9.10564 18.6095 10.7434 17.5653 11.8444L17.3595 12.0614Z" fill="none" stroke="white" strokeWidth="1.5"/>
                            </svg>
                        </span>
                        <img 
                            alt={name} 
                            className="product-left__image"
                            loading="lazy"
                            onClick={setPopupImage}
                            title={name}
                            src={`${imagesURL}/unscaled/${currentImage}`} 
                        />
                        {itemImages.length > 3 ? (
                            <Slider {...settings} className="product-left__images-slider images-slider" slidesToShow={3}>
                                {itemImages.map((image, index) => (
                                    <div className="images-slider__item" key={index}>
                                        <img 
                                            alt={name}
                                            className="images-slider__item-image"
                                            onClick={() => setCurrentImage(image)}
                                            src={image}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <div className="product-left__images-scroll images-scroll">
                                {itemImages.map((image, index) => (
                                    <div className="images-slider__item" key={index}>
                                        <img 
                                            alt={name}
                                            className="images-slider__item-image"
                                            onClick={() => setCurrentImage(image)}
                                            src={`${imagesURL}/unscaled/${image}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="product__top-right product-right">
                        <div className="product-right__title">
                            <h1 className="product-right__title-text">{name}</h1>
                            {isPWA() && (
                                <RWebShare data={{url: window.location.href}}>
                                    <svg className="product-right__title-icon" height="20" viewBox="0 0 18 20" width="18">
                                        <path d="M14.3333 6.4C15.8061 6.4 17 5.19117 17 3.7C17 2.20883 15.8061 1 14.3333 1C12.8606 1 11.6667 2.20883 11.6667 3.7C11.6667 5.19117 12.8606 6.4 14.3333 6.4Z" fill="black"/>
                                        <path d="M3.66666 12.7C5.13941 12.7 6.33331 11.4912 6.33331 10C6.33331 8.50884 5.13941 7.30001 3.66666 7.30001C2.1939 7.30001 1 8.50884 1 10C1 11.4912 2.1939 12.7 3.66666 12.7Z" fill="black"/>
                                        <path d="M14.3333 19C15.8061 19 17 17.7912 17 16.3C17 14.8088 15.8061 13.6 14.3333 13.6C12.8606 13.6 11.6667 14.8088 11.6667 16.3C11.6667 17.7912 12.8606 19 14.3333 19Z" fill="black"/>
                                        <path d="M5.96883 11.359L12.0399 14.941M12.031 5.059L5.96883 8.641M17 3.7C17 5.19117 15.8061 6.4 14.3333 6.4C12.8606 6.4 11.6667 5.19117 11.6667 3.7C11.6667 2.20883 12.8606 1 14.3333 1C15.8061 1 17 2.20883 17 3.7ZM6.33331 10C6.33331 11.4912 5.13941 12.7 3.66666 12.7C2.1939 12.7 1 11.4912 1 10C1 8.50884 2.1939 7.30001 3.66666 7.30001C5.13941 7.30001 6.33331 8.50884 6.33331 10ZM17 16.3C17 17.7912 15.8061 19 14.3333 19C12.8606 19 11.6667 17.7912 11.6667 16.3C11.6667 14.8088 12.8606 13.6 14.3333 13.6C15.8061 13.6 17 14.8088 17 16.3Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </RWebShare>
                            )}
                        </div>
                        <h4 className="product-right__subtitle">
                            <span className="product-right__subtitle-text">By</span>
                            <img 
                                alt={brand}
                                className="product-right__subtitle-image"
                                loading="lazy"
                                onClick={() => navigate(`/catalog/?brands=${toFormatBrandForRequest(brand)}`)}
                                src={brandsImages.filter(value => value.includes(toFormatBrand(brand).replace(' ', '-')))} 
                                title={toFormatTitle(brand)}
                            />
                            <span className="product-right__subtitle-text">{toFormatBrand(brand)}</span>
                        </h4>
                        <p className="product-right__article">{`Арт. ${id}`}</p>
                        <p className="product-right__color">{`Цвет: ${color}`}</p>
                        <h5 className={classNames("product-right__text", chooseSize && "active")}>{chooseSize ? 'Выберите размер:' : 'Размер:'}</h5>
                        <div className="product-right__sizes product-sizes">
                            {sizes.map(({sizeId, size, quantity}) => (onCheckingSizes(sizeId, quantity) > 0 && (
                                <button 
                                    className={classNames("product-sizes__size", sizeId === currentSize && "active")}
                                    key={sizeId} 
                                    onClick={() => onClickSize(sizeId)} 
                                >
                                    {size}
                                    {onCheckingSizes(sizeId, quantity) === 1 && (
                                        <svg className="product-sizes__size-icon" fill="none" height="10" viewBox="0 0 10 10" width="10">
                                            <path d="M5 3V5.4M5 7.00379L5.00381 6.99956M5 9C7.20912 9 9 7.20912 9 5C9 2.79086 7.20912 1 5 1C2.79086 1 1 2.79086 1 5C1 7.20912 2.79086 9 5 9Z" stroke="#ED0A34" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </button>
                            )))}
                        </div>
                        <div className="product-right__warning">
                            {sizeWarning && (
                                <>
                                    <svg className="product-right__warning-icon" fill="none" height="10" viewBox="0 0 10 10" width="10">
                                        <path d="M5 3V5.4M5 7.00379L5.00381 6.99956M5 9C7.20912 9 9 7.20912 9 5C9 2.79086 7.20912 1 5 1C2.79086 1 1 2.79086 1 5C1 7.20912 2.79086 9 5 9Z" stroke="#ED0A34" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p className="product-right__warning-text">Последний размер</p>
                                </>
                            )}
                        </div>
                        {isPWA() ? (
                            <>
                                <p className="product-right__mobile-text">{`${toFormatPrice(price)} ₽`}</p>
                                <button className="product-right__mobile-btn" onClick={onBuyItem}>Купить</button>
                            </>
                        ) : (
                            <div className="product-right__price">
                                <p className="product-right__price-text">{`${toFormatPrice(price)} ₽`}</p>
                                <button className="product-right__price-btn" onClick={onBuyItem}>Купить</button>
                            </div>
                        )}
                        <div className="product-right__nav">
                            <p className="product-right__nav-text" onClick={onClickGenderText}>{`${male ? 'Мужские' : 'Женские'} кроссовки`}</p>
                            <p className="product-right__nav-text" onClick={() => navigate(`/catalog/?brands=${brand}`)}>{`Кроссовки ${toFormatTitle(brand)}`}</p>
                            <p className="product-right__nav-text" onClick={() => navigate(`/catalog/?colors=${color}`)}>{`${color.slice(-2) === 'ый' ? `${color.slice(0, -2)}ые` : color} кроссовки`}</p>
                        </div>
                    </div>
                </div>
                <h4 className="product__title">Описание товара:</h4>
                <p className="product__description">{description}</p>
            </div>

            <div className={classNames("content__blackout blackout product-zoom", popupImage && "active")}>
                <svg className="product-zoom__icon" onClick={setPopupImage} height="14" viewBox="0 0 15 14" width="15">
                    <path d="M13.8725 0C14.1716 0 14.4584 0.110039 14.6698 0.305919C14.8812 0.501858 15 0.767573 15 1.04463C15 1.32169 14.8812 1.5874 14.6698 1.78334L9.04639 6.99369L14.6834 12.2167C14.8889 12.4137 15.0025 12.6777 15 12.9516C14.9974 13.2256 14.8788 13.4876 14.6697 13.6814C14.4606 13.8751 14.1778 13.985 13.8821 13.9873C13.5864 13.9897 13.3016 13.8844 13.0889 13.6941L7.50681 8.52205L1.92473 13.6941C1.71326 13.89 1.42648 14 1.12745 14C0.828428 14 0.541647 13.89 0.330173 13.6941C0.118764 13.4981 1.84946e-07 13.2324 1.84946e-07 12.9554C1.84946e-07 12.6783 0.118764 12.4126 0.330173 12.2167L5.95361 7.00631L0.316557 1.78334C0.111138 1.58628 -0.00252673 1.32235 4.26297e-05 1.04839C0.00261199 0.774434 0.121208 0.512371 0.330291 0.318646C0.539375 0.124922 0.822216 0.0150364 1.11789 0.0126557C1.41357 0.0102751 1.69843 0.11559 1.91111 0.305919L7.49319 5.47795L13.0753 0.305919C13.2867 0.110039 13.5735 0 13.8725 0Z" fill="white"/>
                </svg>
                {window.innerWidth < 1024 ? (
                    <div className="product-zoom__wrapper">
                        <TransformWrapper centerOnInit={true}>
                            <TransformComponent contentStyle={{display: "flex", justifyContent: "center"}}>
                                <img alt={name} className="product-zoom__wrapper-image" loading="lazy" src={`${imagesURL}/scaled/${currentImage}`}/>
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                ) : (
                    <img 
                        alt={name}
                        className={classNames("product-zoom__wrapper-image", zoomImage && "zoom")}
                        loading="lazy"
                        onClick={() => setZoomImage(!zoomImage)}
                        src={`${imagesURL}/scaled/${currentImage}`} 
                    />
                )}
                <h6 className="product-zoom__title">{name}</h6>
            </div>
            
            <div className={classNames("content__blackout blackout", successPopup && "active")}>
                <div className={classNames("content__blackout-success success-popup", successPopup && "active")}>
                    {isMobile ? <p className="success-popup__text">Товар добавлен в корзину</p> : (
                        <>
                            <div className="success-popup__top">
                                <h4 className="success-popup__top-title">Товар успешно добавлен в корзину</h4>
                                <svg className="success-popup__top-icon" onClick={setSuccessPopup} height="20" viewBox="0 0 20 20" width="20">
                                    <path d="M19 19L1 1.00003M19 1L1.00002 19" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div className="success-popup__content">
                                <img alt={name} className="success-popup__content-image" src={`${imagesURL}/unscaled/${preview}`}/>
                                <p className="success-popup__content-text content-text">
                                    <span className="content-text__name">{name}</span>
                                    <span className="content-text__size">{`Размер: ${sizes.filter(item => item.sizeId === currentSize)[0]?.size}`}</span>
                                </p>
                                <p className="success-popup__content-amount">1</p>
                                <p className="success-popup__content-price">{`${toFormatPrice(price)} ₽`}</p>
                            </div>
                            <div className="success-popup__btns">
                                <button className="success-popup__btns-continue" onClick={setSuccessPopup}>Продолжить покупки</button>
                                <button className="success-popup__btns-cart" onClick={() => navigate('/cart')}>В корзину</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
