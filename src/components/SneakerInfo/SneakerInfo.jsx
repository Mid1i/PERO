import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {RWebShare} from "react-web-share";
import classNames from "classnames";

import {imageImport, toFormatPrice, toFormatBrand, toFormatBrandForRequest, toFormatTitle} from "@utils/helpers";
import {appContext} from "@services/Context";

import "./SneakerInfo.style.scss";

import {backArrow, blackCross, sneakerHeartDefault, sneakerHeartLiked, shareIcon, whiteCross} from "@assets/images";


export default function Sneaker({brand, color, description, id, images, name, preview, price, sizes}) {
    const {isInFavorites, onAddToFavorites, onAddToCart} = useContext(appContext);

    const [popupImage, setPopupImage] = useState(false);
    const [popupSizes, setPopupSizes] = useState(false);
    const [popupSuccess, setPopupSuccess] = useState(false);
    const [zoomImage, setZoomImage] = useState(false);
    const [currentImage, setCurrentImage] = useState(preview);
    const [currentSize, setCurrentSize] = useState('');
    
    const brandsImages = imageImport();
    
    const itemImages = [preview, ...images];

    const navigate = useNavigate();


    useEffect(() => {
        setCurrentImage(preview);
    }, [preview])

    useEffect(() => {
        if (popupImage || popupSizes || popupSuccess) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [popupImage, popupSizes, popupSuccess])


    const onBuyItem = () => {
        if (currentSize !== '') {
            onAddToCart(currentSize);
            setPopupSuccess(prev => !prev);
        } else {
           setPopupSizes(prev => !prev);
        }
    }

    const onCloseSuccess = () => {
        setPopupSuccess(prev => !prev);
        setCurrentSize('');
    }

    const onClickSize = (isBuy, sizeId) => {
        if (isBuy) {
            onAddToCart(currentSize);
            setCurrentSize(sizeId);
            setPopupSizes(prev => !prev);
            setPopupSuccess(prev => !prev);
        } else if (sizeId === currentSize) {
            setCurrentSize('');
        } else {
            setCurrentSize(sizeId);
        }
    }

    const sizesRender = (isBuy) => {
        return (
            sizes.map(({sizeId, size}) => (
                <button 
                    className={classNames(sizeId === currentSize && "active")}
                    key={sizeId} 
                    onClick={() => onClickSize(isBuy, sizeId)} 
                >
                    {size}</button>)
            )
        )
    }
    
    return (
        <>
            <div className="product">
                <div className="product__top">
                    <div className="product__top-left product-left">
                        <img
                            alt='back'
                            className="product-left__back-icon" 
                            onClick = {() => window.history.length !== 1 ? navigate(-1) : navigate('/')} 
                            src={backArrow} 
                        />
                        <img 
                            alt={isInFavorites(id) ? 'dislike' : 'like'}
                            className="product-left__icon" 
                            onClick={() => onAddToFavorites(id)}
                            src={isInFavorites(id) ? sneakerHeartLiked : sneakerHeartDefault} 
                        />
                        <img 
                            alt={name} 
                            className="product-left__image"
                            loading="lazy"
                            onClick={() => setPopupImage(prev => !prev)}
                            title={name}
                            src={currentImage} 
                        />
                        <div className="product-left__images">
                            {itemImages.map((image, index) => (
                                    <div className="product-left__images-wrapper" key={index}>
                                        <img 
                                            alt={name}
                                            onClick={() => setCurrentImage(image)}
                                            src={image}
                                        />
                                    </div>
                                ) 
                            )}
                        </div>
                    </div>
                    <div className="product__top-right product-right">
                        <div className="product-right__title">
                            <h1 className="product-right__title-left">{name}</h1>
                            <RWebShare data={{url: window.location.href}}>
                                <button className="product-right__title-right">
                                    <img src={shareIcon} alt="share"/>
                                </button>
                            </RWebShare>
                        </div>
                        <h4 className="product-right__subtitle">
                            <span>By</span>
                            <img 
                                alt={brand}
                                loading="lazy"
                                onClick={() => navigate(`/catalog/?brands=${toFormatBrandForRequest(brand)}`)}
                                src={brandsImages.filter(value => value.includes(toFormatBrand(brand).replace(' ', '-')))} 
                                title={toFormatBrand(brand)}
                            />
                            <span>{toFormatBrand(brand)}</span>
                        </h4>
                        <p className="product-right__article">{`Арт. ${id}`}</p>
                        <p className="product-right__color">{`Цвет: ${color}`}</p>
                        <h5 className="product-right__text">Размер:</h5>
                        <div className="product-right__sizes">{sizesRender(false)}</div>
                        <div className="product-right__price">
                            <p className="product-right__price-text">{`${toFormatPrice(price)} ₽`}</p>
                            <button className="product-right__price-btn btn" onClick={() => onBuyItem()}>Купить</button>
                        </div>
                    </div>
                </div>
                <h4 className="product__title">О товаре:</h4>
                <div className="product__description">{description}</div>
            </div>

            <div className={classNames("blackout modal", popupImage && "active")}>
                <img 
                    alt="close" 
                    className="modal__icon" 
                    onClick={() => setPopupImage(prev => !prev)} 
                    src={whiteCross}
                /> 
                {window.innerWidth < 767 ? (
                    <div className="modal__img-wrapper">
                        <TransformWrapper centerOnInit={ true } >
                            <TransformComponent contentStyle={{display: "flex", justifyContent: "center"}}>
                                <img 
                                    alt={name} 
                                    className="modal__img"
                                    loading="lazy"
                                    src={currentImage} 
                                />
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                ) : (
                    <img 
                        alt={name}
                        className={classNames("modal__img", zoomImage && "zoom")}
                        loading="lazy"
                        onClick={() => setZoomImage(!zoomImage)}
                        src={currentImage} 
                    />
                )}
                <h6 className="modal__title">{name}</h6>
            </div>

            <div className={classNames("blackout sizes-block__blackout", (popupSizes || popupSuccess) && "active")}>
                <div className={classNames("sizes-block", popupSizes && "active")}>
                    <div className="size-block__wrapper">
                        <div className="effect"></div>
                        <div className="sizes-block__top">
                            <h4 className="sizes-block__top-title">Выберите размер</h4>
                            <img 
                                alt="close" 
                                height={20}                               
                                onClick={() => setPopupSizes(prev => !prev)} 
                                src={blackCross} 
                                width={20} 
                            />
                        </div>
                        <div className="sizes-block__items">{sizesRender(true)}</div>
                    </div>
                </div>

                <div className={classNames("success", popupSuccess && "active")}>
                    <div className="success__wrapper">
                        <div className="effect"></div>
                        <div className="success__top">
                            <h4 className="success__top-title">Товар добавлен в корзину</h4>
                            <img 
                                alt="close" 
                                height={20}
                                onClick={() => onCloseSuccess()} 
                                src={blackCross} 
                                width={20} 
                            />
                        </div>
                        <div className="success__middle">
                            <h6 className="success__middle-title">{`${toFormatTitle(brand)} - ${name}`}</h6>
                            <p className="success__middle-price">{`${toFormatPrice(price)} ₽`}</p>
                        </div>
                        <p className="success__article">{`Арт. ${id}`}</p>
                        <p className="success__size">{`Размер: ${sizes.find(obj => obj.sizeId === currentSize)?.size}`}</p>
                        <div className="success__btns">
                            <button 
                                className="success__btns-continue btn" 
                                onClick={() => onCloseSuccess()}
                            >
                                Продолжить покупки</button>
                            <button 
                                className="success__btns-cart"
                                onClick={() => onCloseSuccess()}
                            >
                                В корзину</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
