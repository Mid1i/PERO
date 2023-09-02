import "./SneakerCart.style.scss";

import image from "@assets/images/content-images/1.jpg";
import {addBtn, substractBtn} from "@assets/images";


export default function SneakerCart() {
    return (
        <div className="items__item cart-item">
            <img className="cart-item__img" src={image} alt={'title'}/>
            <div className="cart-item__data">
                <h4 className="cart-item__data-title">
                    <span>Air Max 270 Men's Shoe</span>
                    <span>27 399 ₽</span>
                </h4>
                <p className="cart-item__data-article">Арт. 3</p>
                <p className="cart-item__data-size">Размер: 42</p>
                <div className="cart-item__data-amount amount">
                    <button className="amount__substract">
                        <img src={substractBtn} alt="substract"/>
                    </button>
                    <span className="amount__counter">1</span>
                    <button className="amount__add">
                        <img src={addBtn} alt="add"/>
                    </button>
                </div>
                <div className="cart-item__data-btns cart-btns">
                    <button className="cart-btns__delete">
                        <svg viewBox="0 0 12 16">
                            <path d="M0.857143 14.2222C0.857143 15.2 1.62857 16 2.57143 16H9.42857C10.3714 16 11.1429 15.2 11.1429 14.2222V3.55556H0.857143V14.2222ZM12 0.888889H9L8.14286 0H3.85714L3 0.888889H0V2.66667H12V0.888889Z" fill="white"/>
                        </svg>
                    </button>
                    <button className="cart-btns__favorite">
                        <svg viewBox="0 0 19 16">
                            <path d="M18.5403 3.27888C18.2455 2.63724 17.8204 2.0558 17.2889 1.56709C16.757 1.07693 16.1298 0.6874 15.4415 0.419693C14.7277 0.140996 13.9622 -0.0016576 13.1894 1.45314e-05C12.1051 1.45314e-05 11.0472 0.279111 10.1279 0.806293C9.90796 0.932404 9.69903 1.07092 9.50109 1.22184C9.30315 1.07092 9.09421 0.932404 8.87428 0.806293C7.95496 0.279111 6.89709 1.45314e-05 5.81282 1.45314e-05C5.03206 1.45314e-05 4.27549 0.140597 3.56071 0.419693C2.87012 0.688453 2.24771 1.07505 1.71327 1.56709C1.18103 2.05524 0.75586 2.63683 0.461858 3.27888C0.156152 3.94665 0 4.65576 0 5.38554C0 6.07398 0.149554 6.79136 0.446463 7.52115C0.694987 8.13103 1.05128 8.76365 1.50654 9.40247C2.22792 10.4134 3.21981 11.4678 4.45144 12.5366C6.49241 14.3084 8.51359 15.5323 8.59936 15.5819L9.1206 15.8961C9.35153 16.0346 9.64844 16.0346 9.87937 15.8961L10.4006 15.5819C10.4864 15.5302 12.5054 14.3084 14.5485 12.5366C15.7802 11.4678 16.7721 10.4134 17.4934 9.40247C17.9487 8.76365 18.3072 8.13103 18.5535 7.52115C18.8504 6.79136 19 6.07398 19 5.38554C19.0022 4.65576 18.846 3.94665 18.5403 3.27888Z" fill="white"/>
                        </svg>
                        <span>В избранное</span>
                    </button>
                </div>
            </div>
        </div>
    );
}