import {useNavigate} from "react-router-dom";
import {useContext} from "react";

import {appContext} from "@services/Context";
import {toFormatPrice, toFormatTitle} from "@utils/helpers";

import "./SneakerCard.style.scss";


export default function SneakerCard({id, preview, brand, name, price}) {
    const {isInFavorites, onAddToFavorites} = useContext(appContext);
    const navigate = useNavigate();
    
    
    return (
        <div title={name} className="goods__content-item goods-item">
            <span className="goods-item__icon" onClick={() => onAddToFavorites(id)}>
                <svg viewBox="0 0 20 18" fill="none">
                    <path d="M19.516 3.586A5.876 5.876 0 0 0 18.2 1.714 6.135 6.135 0 0 0 16.254.459 6.27 6.27 0 0 0 13.884 0C12.742 0 11.967.423 11 1c-.232.138-.792.835-1 1-.208-.165-.768-.862-1-1-.968-.577-1.74-1-2.881-1a6.27 6.27 0 0 0-2.37.459 6.122 6.122 0 0 0-1.946 1.255A5.842 5.842 0 0 0 .486 3.586 5.682 5.682 0 0 0 0 5.89c0 .753.157 1.538.47 2.336.262.667.637 1.36 1.116 2.058.76 1.106 1.803 2.259 3.1 3.428a34.578 34.578 0 0 0 4.366 3.33l.549.344a.759.759 0 0 0 .798 0l.549-.343a35.033 35.033 0 0 0 4.366-3.331c1.297-1.17 2.34-2.322 3.1-3.428.48-.699.857-1.39 1.116-2.058.313-.798.47-1.583.47-2.336a5.642 5.642 0 0 0-.484-2.304Z" fill={isInFavorites(id) ? "#FE7575" : "#FFFFFF"}/>
                </svg>
            </span>
            <div onClick={() => navigate(`/catalog/product/${id}`)}>
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
    );
}
