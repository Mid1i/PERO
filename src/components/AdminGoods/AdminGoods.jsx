import {SearchBar} from "@components";

import "./AdminGoods.style.scss";


export default function AdminGoods({totalAmount='', popularAmount='', activeAmount=''}) {
    return (
        <div className="admin__right">
            <header className="admin__right-header admin__header">
                <div className="admin__header-left admin-statuses">
                    <div className="admin-statuses__btn">
                        <span className="admin-statuses__btn-text">Все</span>
                        <span className="admin-statuses__btn-number">{totalAmount}</span>
                    </div>
                    <div className="admin-statuses__btn">
                        <span className="admin-statuses__btn-text">Активные</span>
                        <span className="admin-statuses__btn-number">{activeAmount}</span>
                    </div>
                    <div className="admin-statuses__btn">
                        <span className="admin-statuses__btn-text">Популярные</span>
                        <span className="admin-statuses__btn-number">{popularAmount}</span>
                    </div>
                </div>
                <div className="admin__header-right admin-btns">
                    <button className="admin-btns__item admin-btns__item--filters">
                        <svg className="admin-btns__item-icon" fill="none" height="14" viewBox="0 0 18 14" width="18">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.44125 2.33524C2.67368 1.6524 3.10471 1.0611 3.67492 0.642851C4.24514 0.224603 4.92647 0 5.625 0C6.32353 0 7.00486 0.224603 7.57508 0.642851C8.14529 1.0611 8.57632 1.6524 8.80875 2.33524H16.875C17.1734 2.33524 17.4595 2.4581 17.6705 2.67681C17.8815 2.89551 18 3.19214 18 3.50143C18 3.81072 17.8815 4.10735 17.6705 4.32605C17.4595 4.54475 17.1734 4.66762 16.875 4.66762H8.80875C8.57632 5.35046 8.14529 5.94176 7.57508 6.36001C7.00486 6.77825 6.32353 7.00286 5.625 7.00286C4.92647 7.00286 4.24514 6.77825 3.67492 6.36001C3.10471 5.94176 2.67368 5.35046 2.44125 4.66762H1.125C0.826631 4.66762 0.540484 4.54475 0.329505 4.32605C0.118527 4.10735 0 3.81072 0 3.50143C0 3.19214 0.118527 2.89551 0.329505 2.67681C0.540484 2.4581 0.826631 2.33524 1.125 2.33524H2.44125ZM5.625 2.33524C5.32663 2.33524 5.04048 2.4581 4.8295 2.67681C4.61853 2.89551 4.5 3.19214 4.5 3.50143C4.5 3.81072 4.61853 4.10735 4.8295 4.32605C5.04048 4.54475 5.32663 4.66762 5.625 4.66762C5.92337 4.66762 6.20952 4.54475 6.4205 4.32605C6.63147 4.10735 6.75 3.81072 6.75 3.50143C6.75 3.19214 6.63147 2.89551 6.4205 2.67681C6.20952 2.4581 5.92337 2.33524 5.625 2.33524Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.19125 9.33238C9.42368 8.64954 9.85471 8.05824 10.4249 7.63999C10.9951 7.22175 11.6765 6.99714 12.375 6.99714C13.0735 6.99714 13.7549 7.22175 14.3251 7.63999C14.8953 8.05824 15.3263 8.64954 15.5588 9.33238H16.875C17.1734 9.33238 17.4595 9.45525 17.6705 9.67395C17.8815 9.89265 18 10.1893 18 10.4986C18 10.8079 17.8815 11.1045 17.6705 11.3232C17.4595 11.5419 17.1734 11.6648 16.875 11.6648H15.5588C15.3263 12.3476 14.8953 12.9389 14.3251 13.3571C13.7549 13.7754 13.0735 14 12.375 14C11.6765 14 10.9951 13.7754 10.4249 13.3571C9.85471 12.9389 9.42368 12.3476 9.19125 11.6648H1.125C0.826631 11.6648 0.540484 11.5419 0.329505 11.3232C0.118527 11.1045 0 10.8079 0 10.4986C0 10.1893 0.118527 9.89265 0.329505 9.67395C0.540484 9.45525 0.826631 9.33238 1.125 9.33238H9.19125ZM12.375 9.33238C12.0766 9.33238 11.7905 9.45525 11.5795 9.67395C11.3685 9.89265 11.25 10.1893 11.25 10.4986C11.25 10.8079 11.3685 11.1045 11.5795 11.3232C11.7905 11.5419 12.0766 11.6648 12.375 11.6648C12.6734 11.6648 12.9595 11.5419 13.1705 11.3232C13.3815 11.1045 13.5 10.8079 13.5 10.4986C13.5 10.1893 13.3815 9.89265 13.1705 9.67395C12.9595 9.45525 12.6734 9.33238 12.375 9.33238Z" fill="white"/>
                        </svg>
                        <span className="admin-btns__item-text">Фильтры</span>
                    </button>
                    <button className="admin-btns__item">
                        <svg className="admin-btns__item-icon" fill="none" height="20" viewBox="0 0 20 20" width="20">
                            <path d="M10 0V20M0 10H20" stroke="white" strokeWidth="2"/>
                        </svg>
                        <span className="admin-btns__item-text">Добавить</span>
                    </button>
                </div>
            </header>
            <SearchBar page='admin'/>
        </div>
    );
}