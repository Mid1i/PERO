import {useNavigate} from "react-router-dom";

import "./LeftNavPanel.style.scss";


export default function LeftNavPanel() {
    const navigate = useNavigate();


    return (
        <div className="info__left-panel left-panel">
            <h6 className="left-panel__title">Pero</h6>
            <ul className="left-panel__list">
                <li className="left-panel__list-el" onClick={() => navigate('/contacts')}>Контакты</li>
                <li className="left-panel__list-el" onClick={() => navigate('/shops')}>Магазины</li>
                <li className="left-panel__list-el" onClick={() => navigate('/about')}>О нас</li>
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