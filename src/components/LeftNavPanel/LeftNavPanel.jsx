import classNames from "classnames";

import "./LeftNavPanel.style.scss";


export default function LeftNavPanel({activeElement='about'}) {
    return (
        <div className="info__left-panel left-panel">
            <h6 className="left-panel__title">Pero</h6>
            <ul className="left-panel__list">
                <li className={classNames("left-panel__list-el", activeElement === 'contacts' && "active")}>Контакты</li>
                <li className={classNames("left-panel__list-el", activeElement === 'shops' && "active")}>Магазины</li>
                <li className={classNames("left-panel__list-el", activeElement === 'about' && "active")}>О нас</li>
            </ul>
            <h6 className="left-panel__title">Помощь</h6>
            <ul className="left-panel__list">
                <li className="left-panel__list-el">Доставка и оплата</li>
                <li className="left-panel__list-el">Обмен и возврат</li>
                <li className="left-panel__list-el">Уход за обувью</li>
            </ul>
        </div>
    );
}