import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import {useContext} from "react";

import {appContext} from "@services/Context";
import {toFormatPrice} from "@utils/helpers";
import {imagesURL} from "@utils/constants";

import "./SneakerCard.style.scss";


export default function SneakerCard({id, preview, name, price, page = 'home'}) {
    const {isInFavourite, onAddToFavourite} = useContext(appContext);
    const navigate = useNavigate();
    
    return (
        <div title={name} className={classNames("goods__content-item goods-item", page === 'catalog' && "goods-item--catalog")}>
            <span className="goods-item__icon" onClick={() => onAddToFavourite(id)}>
                <svg className={classNames(isInFavourite(id) && "liked")} height="15" viewBox="0 0 15 15" width="15">
                    <path d="M12.8321 8.97129V9.02824C12.7173 9.14003 12.5673 9.28877 12.3917 9.46436C12.0142 9.84193 11.5088 10.3533 10.9586 10.9111C10.7821 11.09 10.601 11.2737 10.4179 11.4594C9.45958 12.4314 8.44734 13.4582 7.76085 14.1402C7.60483 14.2866 7.39517 14.2866 7.23914 14.1402C6.41957 13.326 5.11847 12.0219 4.01119 10.9088C3.45639 10.3511 2.95073 9.84188 2.57926 9.46684C2.40474 9.29065 2.26685 9.15104 2.16791 9.05074V8.98995L1.98391 8.77831C1.2091 7.88711 0.75 6.68927 0.75 5.40773V5.32189V5.24625C0.820827 2.72948 2.66225 0.835836 4.62687 0.835836C4.89873 0.835836 5.28546 0.946742 5.68719 1.19555C6.06507 1.42959 6.40552 1.75496 6.6344 2.12813C6.78088 2.47648 7.11097 2.74571 7.53731 2.74571C7.98019 2.74571 8.31919 2.4552 8.45642 2.08728C8.64831 1.69721 8.9788 1.35875 9.36017 1.11412C9.76204 0.856332 10.1452 0.75 10.3731 0.75C12.3982 0.75 14.1789 2.62741 14.25 5.24592V5.40773C14.25 6.78804 13.7836 7.96803 13.0379 8.75427L12.8321 8.97129Z" fill="none" stroke="white" strokeWidth="1.5"/>
                </svg>
            </span>
            <div onClick={() => navigate(`/catalog/product/${id}`)}>
                <div className="goods-item__image">
                    <img alt={name} className="goods-item__image-preview" loading="lazy" src={`${imagesURL}/unscaled/${preview}`}/>
                </div>
                <h6 className="goods-item__title">{name}</h6>
                <p className="goods-item__price">{`${toFormatPrice(price)} ₽`}</p>
            </div> 
        </div>
    );
}
