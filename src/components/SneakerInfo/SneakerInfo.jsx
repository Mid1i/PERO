import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {RWebShare} from "react-web-share";
import classNames from "classnames";

import {imageImport, toFormatPrice, toFormatBrand, toFormatBrandForRequest} from "@utils/helpers";
import {appContext} from "@services/Context";

import "./SneakerInfo.style.scss";

import {backArrow, blackCross, blueCheck, sneakerHeartDefault, sneakerHeartLiked, shareIcon, whiteCross} from "@assets/images";


export default function Sneaker({brand, color, description, id, images, name, preview, price, sizes}) {
    const {isInFavourites, onAddToFavourites, onAddToCart} = useContext(appContext);

    const [popupImage, setPopupImage] = useState(false);
    const [zoomImage, setZoomImage] = useState(false);
    const [currentImage, setCurrentImage] = useState(preview);
    const [currentSize, setCurrentSize] = useState('');
    
    const brandsImages = imageImport();
    
    const itemImages = [preview, ...images];

    const navigate = useNavigate();


    useEffect(() => {
        popupImage ? document.body.classList.add("no-scroll") : document.body.classList.remove("no-scroll");
    }, [popupImage])


    const onBuyItem = () => currentSize !== "" ? onAddToCart(currentSize) : sizesBlockRender();

    const sizesBlockRender = () => {
        return (
            <div className="sizes-block">
                <img src={blackCross} alt="close" className="sizes-block__icon"/>
                <h4 className="sizes-block__title">Выберите размер</h4>
                <div className="sizes-block__items">
                    {sizes.map(({sizeId, size}) => (
                            <button 
                                className={classNames(sizeId === currentSize && "active")}
                                key={sizeId} 
                                onClick={() => setCurrentSize(sizeId)} 
                                >
                                    {size}</button>
                        )
                    )}
                </div>
            </div>
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
                            alt={isInFavourites(id) ? 'dislike' : 'like'}
                            className="product-left__icon" 
                            onClick={() => onAddToFavourites(id)}
                            src={isInFavourites(id) ? sneakerHeartLiked : sneakerHeartDefault} 
                        />
                        <img 
                            alt={name} 
                            className="product-left__image"
                            loading="lazy"
                            onClick={() => setPopupImage(prev => !prev)}
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
                        <h4 className="product-right__subtitle" onClick={() => navigate(`/catalog/?brands=${toFormatBrandForRequest(brand)}`)}>
                            <span>By</span>
                            <img 
                                alt={brand}
                                loading="lazy"
                                onClick={() => navigate(`/catalog/?brands=${toFormatBrandForRequest(brand)}`)}
                                src={brandsImages.filter(value => value.includes(toFormatBrand(brand).replace(' ', '-')))} 
                            />
                            <span>{toFormatBrand(brand)}</span>
                            <div className="product-right__subtitle-original">
                                <img src={blueCheck} alt="original"/>
                                <p className="product-right__subtitle-original--text">Оригинальный товар</p>
                            </div>
                        </h4>
                        <p className="product-right__article">{`Арт. ${id}`}</p>
                        <p className="product-right__color">{`Цвет: ${color}`}</p>
                        <h5 className="product-right__text">Размер:</h5>
                        <div className="product-right__sizes">
                            {sizes.map(({sizeId, size}) => (
                                    <button 
                                        className={classNames(sizeId === currentSize && "active")}
                                        key={sizeId} 
                                        onClick={() => setCurrentSize(sizeId)} 
                                    >
                                        {size}</button>
                                )
                            )}
                        </div>
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
        </>
    );
}
