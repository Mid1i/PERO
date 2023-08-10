import {useNavigate} from "react-router-dom";
import {useContext} from "react";

import {appContext} from "@services/Context";
import {toFormatPrice, toFormatTitle} from "@utils/helpers";

import "./SneakerCard.style.scss";

import {cardHeartDefault as heartDefault, cardHeartLiked as heartLiked} from "@assets/images";

//TODO: изменить верстку слайдера

export default function SneakerCard({id, preview, brand, name, price}) {
    const {isInFavourites, onAddToFavourites} = useContext(appContext);
    const navigate = useNavigate();
    
    
    return (
        <div className="goods__content-item goods-item">
            <img 
                alt={isInFavourites(id) ? 'dislike' : 'like'} 
                className="goods-item__icon"
                onClick={() => onAddToFavourites(id)} 
                src={isInFavourites(id) ? heartLiked : heartDefault}
            />
            <div onClick = {() => navigate(`/catalog/product/${id}`)}>
                <img 
                    alt="product" 
                    className="goods-item__image" 
                    loading="lazy"
                    src={preview} 
                />
                <h6 className="goods-item__title">{`${toFormatTitle(brand)} - ${name}`}</h6>
                <p className="goods-item__price">{`${toFormatPrice(price)} ₽`}</p>
            </div> 
        </div>
    )
}
