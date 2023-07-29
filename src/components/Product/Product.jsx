import React from "react";
import appContext from "@services/context";

import "./Product.styles.scss";

import heartDefault from "@assets/images/icons/heart-default.svg";
import heartLiked from "@assets/images/icons/heart-liked.svg";

function Product({ item }) {
    const { addToFavourites, isInFavourites } = React.useContext(appContext);
    
    return (
        <div className="goods__content-item goods-item">
            <img 
                onClick={ () => addToFavourites(item) } 
                src={ isInFavourites(item) ? heartLiked : heartDefault } 
                alt={ isInFavourites(item) ? "dislike" : "like" } 
                width={ 40 } 
                height={ 40 } 
                className="goods-item__icon" 
            />
            <img src={ item.img } alt="product" width={ 260 } height={ 280 } className="goods-item__image" />
            <h6 className="goods-item__title">{ item.name }</h6>
            <p className="goods-item__price">{ `${item.price} ₽`}</p>
        </div>
    )
}

export default Product;