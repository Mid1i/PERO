import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { appContext } from "@services/Context";
import { toFormatPrice, toFormatTitle } from "@utils/helpers";

import "./Card.styles.scss";

import heartDefault from "@assets/images/icons/heart-default.svg";
import heartLiked from "@assets/images/icons/heart-liked.svg";

function Card({ item }) {
    const { addToFavourites, isInFavourites } = useContext(appContext);
    const navigate = useNavigate();
    
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
            <div onClick = { () => navigate(`/catalog/product/${item.id}`) }>
                <img src={ item.img } alt="product" width={ 260 } height={ 280 } className="goods-item__image" loading="lazy" />
                <h6 className="goods-item__title">{ `${toFormatTitle(item.brand)} - ${item.name}` }</h6>
                <p className="goods-item__price">{ `${toFormatPrice(item.price)} ₽`}</p>
            </div>
        </div>
    )
}

export default Card;