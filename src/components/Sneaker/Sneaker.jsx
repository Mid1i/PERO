import React from "react";

import appContext from "@services/Context";

import "./Sneaker.styles.scss";

import heartDefault from "@assets/images/icons/product-heart-default.svg";
import heartLiked from "@assets/images/icons/product-heart-liked.svg";

function Sneaker({ item }) {
    const { toFormat, isInFavourites, addToFavourites } = React.useContext(appContext);
    
    const importAll = image => image.keys().map(image);
    const images = importAll(require.context('@assets/images/brands/', false, /\.svg$/));

    return (
        <div className="product">
            <div className="product__top">
                <div className="product__top-left product-left">
                    <img 
                        onClick={ () => addToFavourites(item) }
                        src={ isInFavourites(item) ? heartLiked : heartDefault } 
                        alt={ isInFavourites(item) ? "dislike" : "like" }  
                        width={ 50 } 
                        height={ 50 } 
                        className="product-left__icon" 
                    />
                    <img src={ item.img } alt="Nike Air Force" width={ 600 } height={ 650 } className="product-left__image" />
                </div>
                <div className="product__top-right product-right">
                    <h1 className="product-right__title">{ item.name }</h1>
                    <h4 className="product-right__subtitle">
                        <span>By</span>
                        <img 
                            src={ images.filter(obj => obj.includes(item.brand.toLowerCase())) } 
                            alt={ item.brand } 
                            width={ 40 } 
                            height={ 40 } 
                        />
                        <span>{ item.brand.toLowerCase() }</span>
                    </h4>
                    <p className="product-right__article">{ `Арт. ${item.id}` }</p>
                    <p className="product-right__color">{ `Цвет: ${item.color}` }</p>
                    <h5 className="product-right__text">Размер:</h5>
                    <div className="product-right__sizes">
                        { item.sizes.map((obj, i) => { 
                            return (
                                <button key={ i } >{ obj }</button>
                            )}
                        )}
                    </div>
                    <div className="product-right__price">
                        <p className="product-right__price-text">{ `${toFormat(item.price)} ₽` }</p>
                        <button className="product-right__price-btn btn">Купить</button>
                    </div>
                </div>
            </div>
            <h4 className="product__title">О товаре:</h4>
            <div className="product__description">{ item.description }</div>
            <h4 className="product__title">Смотрите также:</h4>
        </div>
    )
}

export default Sneaker;