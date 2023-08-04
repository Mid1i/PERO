import React from "react";
import { Link } from "react-router-dom";

import { appContext } from "@services/Context";
import { toFormatPrice, toFormatBrand } from "@utils/helpers";

import "./Card.styles.scss";

import heartDefault from "@assets/images/icons/heart-default.svg";
import heartLiked from "@assets/images/icons/heart-liked.svg";

function Card({ item }) {
    const { addToFavourites, isInFavourites } = React.useContext(appContext);
    
    //TODO: исправить бренд New Balance
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
            <Link to={ `/catalog/product/${item.id}` } >
                <img src={ item.img } alt="product" width={ 260 } height={ 280 } className="goods-item__image" />
                <h6 className="goods-item__title">{ `${toFormatBrand(item.brand)} - ${item.name}` }</h6>
                <p className="goods-item__price">{ `${toFormatPrice(item.price)} ₽`}</p>
            </Link>
        </div>
    )
}

export default Card;