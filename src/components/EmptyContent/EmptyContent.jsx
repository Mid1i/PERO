import {Link} from "react-router-dom";

import "./EmptyContent.style.scss";


export default function EmptyContent({title, text=false, btn=false}) {
    return (
        <div className="empty">
            <h2 className="empty__title">{title}</h2>
            {!!text && <p className="empty__text">{text}</p>}
            {!!btn && (
                <Link to="/">
                    <button className="empty__btn btn">На главную</button>
                </Link>
            )}
        </div>
    );
}
