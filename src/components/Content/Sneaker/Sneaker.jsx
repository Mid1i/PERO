import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RWebShare } from "react-web-share";

import { toFormatPrice, toFormatBrand, imageImport } from "@utils/helpers";
import { appContext } from "@services/Context";

import "./Sneaker.styles.scss";

import heartDefault from "@assets/images/icons/product-heart-default.svg";
import heartLiked from "@assets/images/icons/product-heart-liked.svg";
import sizesCross from "@assets/images/icons/sizes-cross.svg";
import arrowBack from "@assets/images/icons/back-arrow.svg";
import shareIcon from "@assets/images/icons/share.svg";
import crossIcon from "@assets/images/icons/cross.svg";


function Sneaker({ item }) {
    const { isInFavourites, onAddToFavourites, onAddToCart } = useContext(appContext);

    const [openedImage, setOpenedImage] = useState(false);
    const [zoomImage, setZoomImage] = useState(false);
    const [size, setSize] = useState("");
    
    const images = imageImport();
    const navigate = useNavigate();


    useEffect(() => {
        if (openedImage) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [openedImage])

    function onBuyItem() {
        if (size !== "") {
            onAddToCart(size);
        } else {
            chooseSize();
        }
    }

    function chooseSize() {
        return (
            <div className="sizes-block">
                <img src={ sizesCross } alt="close" width={ 20 } height={ 20 } className="sizes-block__icon" />
                <h4 className="sizes-block__title">Выберите размер</h4>
                <div className="sizes-block__items">
                    { item.sizes.map((obj, i) => { 
                        return (
                            <button onClick={ () => setSize(obj.sizeId) } key={ i } className={ obj.sizeId === size ? "active" : "" }>{ obj.size }</button>
                        )}
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
                            src={ arrowBack } 
                            alt="back" 
                            width={ 50 } 
                            height={ 50 } 
                            className="product-left__back-icon" 
                            onClick = { () => window.history.length !== 1 ? navigate(-1) : navigate('/') } 
                        />
                        <h4 className="product-left__title">Описание товара</h4>
                        <img 
                            onClick={ () => onAddToFavourites(item.id) }
                            src={ isInFavourites(item.id) ? heartLiked : heartDefault } 
                            alt={ isInFavourites(item.id) ? "dislike" : "like" }  
                            width={ 50 } 
                            height={ 50 } 
                            className="product-left__icon" 
                        />
                        <img 
                            src = { item.img } 
                            alt = { item.name } 
                            width = { 600 } 
                            height = { 650 } 
                            loading="lazy"
                            className = "product-left__image" 
                            onClick = { () => setOpenedImage(true) }
                        />
                    </div>
                    <div className="product__top-right product-right">
                        <div className="product-right__title">
                            <h1 className="product-right__title-left">{ item.name }</h1>
                            <RWebShare data = {{ url: window.location.href }}>
                                <button className="product-right__title-right">
                                    <img src={ shareIcon } alt="share" />
                                </button>
                            </RWebShare>
                        </div>
                        <h4 className="product-right__subtitle">
                            <span>By</span>
                            <img 
                                src={ images.filter(obj => obj.includes(toFormatBrand(item.brand).replace(' ', '-'))) } 
                                alt={ item.brand } 
                                width={ 40 } 
                                height={ 40 } 
                                loading="lazy"
                            />
                            <span>{ toFormatBrand(item.brand) }</span>
                        </h4>
                        <p className="product-right__article">{ `Арт. ${item.id}` }</p>
                        <p className="product-right__color">{ `Цвет: ${item.color}` }</p>
                        <h5 className="product-right__text">Размер:</h5>
                        <div className="product-right__sizes">
                            { item.sizes.map((obj, i) => { 
                                return (
                                    <button onClick={ () => setSize(obj.sizeId) } key={ i } className={ obj.sizeId === size ? "active" : "" }>{ obj.size }</button>
                                )}
                            )}
                        </div>
                        <div className="product-right__price">
                            <p className="product-right__price-text">{ `${toFormatPrice(item.price)} ₽` }</p>
                            <button className="product-right__price-btn btn" onClick={ () => onBuyItem() }>Купить</button>
                        </div>
                    </div>
                </div>
                <h4 className="product__title">О товаре:</h4>
                <div className="product__description">{ item.description }</div>
            </div>

            <div className="modal" style={ openedImage ? {visibility: "visible", opacity: 1} : {visibility: "hidden", opacity: 0} }>
                <img 
                    src = { crossIcon } 
                    alt = "close" 
                    width = { 30 } 
                    height = { 30 } 
                    className = "modal__icon" 
                    onClick = { () => setOpenedImage(false) } 
                /> 
                { window.innerWidth < 767 ?  <div className="modal__img-wrapper">
                                                <TransformWrapper centerOnInit={ true } >
                                                    <TransformComponent contentStyle={{display: "flex", justifyContent: "center"}}>
                                                        <img 
                                                            src={ item.img } 
                                                            alt={ item.name } 
                                                            loading="lazy"
                                                            className="modal__img"
                                                        />
                                                    </TransformComponent>
                                                </TransformWrapper>
                                            </div>
                : <img 
                    loading="lazy"
                    src={ item.img } 
                    alt={ item.name } 
                    className={ zoomImage ? "modal__img zoom" : "modal__img" }
                    onClick={() => setZoomImage(!zoomImage)}
                /> }
                
                <h6 className="modal__title">{ item.name }</h6>
            </div>
        </>
    )
}

export default Sneaker;