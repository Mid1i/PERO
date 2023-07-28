import "./Product.styles.scss";

import heartDefault from "@assets/images/icons/heart-default.svg";

function Product({ title, price, imageURL }) {
    return (
        <div className="goods__content-item goods-item">
            <img src={ heartDefault } alt="dislike" width={ 40 } height={ 40 } className="goods-item__icon" />
            <img src={ imageURL } alt="product" width={ 260 } eight={ 280 } className="goods-item__image" />
            <h6 className="goods-item__title">{ title }</h6>
            <p className="goods-item__price">{ `${price} ₽`}</p>
        </div>
    )
}

export default Product;