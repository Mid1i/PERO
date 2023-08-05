import { Link } from "react-router-dom";

import "./EmptyContent.styles.scss";

function EmptyContent({ title, text=false, btn=false }) {
    return (
        <div className="empty">
            <h2 className="empty__title">{ title }</h2>
            { text ? <p className="empty__text">{ text }</p> : null }
            { btn ?
                <Link to="/">
                    <button className="empty__btn btn">
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                            <path d="M14.7144 7L1.00007 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>На главную</span>
                    </button>
                </Link>
            : null }
        </div>
    )
}

export default EmptyContent;