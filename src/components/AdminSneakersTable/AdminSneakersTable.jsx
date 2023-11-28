import {useContext, useState, useReducer} from "react";
import classNames from "classnames";

import {adminTableHeader} from "@utils/constants/admin";
import {adminFilters, filters} from "@utils/constants";
import {adminContext} from "@services";
import {
    AdminBoolFilters,
    AdminPriceFilters, 
    AdminFilters, 
    SearchBar
} from "@components";

import "./AdminSneakersTable.style.scss";


export default function AdminSneakersTable({totalAmount='', popularAmount='', activeAmount=''}) {
    const {colors, onFormLink, statusColors, sortingValues, setFilterValues, setSortingValues} = useContext(adminContext);
    const [isOpenFilters, setIsOpenFilters] = useReducer(prev => !prev, false);
    const [isOpenSort, setIsOpenSort] = useState('');
    

    const onOpenSortingList = (id) => {
        if (isOpenSort === id) {
            setIsOpenSort('');
        } else {
            setIsOpenSort(id);
        }
    }

    const onChangeSorting = (id, value) => {
        if (isInSortingValues(value)) {
            setSortingValues({...sortingValues, [id]: ''});
        } else {
            setSortingValues({...sortingValues, [id]: value});
        }
    }

    const onCancelFilters = () => {
        setIsOpenFilters();
        setFilterValues({});
    }

    const onCloseFilters = () => {
        setIsOpenFilters();
    }

    const isInSortingValues = (value) => {
        for (let key in sortingValues) {
            if (sortingValues[key] === value) return true;
        }

        return false;
    }
    

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
                    <button className="admin-btns__item admin-btns__item--filters" onClick={setIsOpenFilters}>
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
            <div className={classNames("admin__blackout blackout", isOpenFilters && "active")}>
                <div className={classNames("admin__blackout-items filters-items", isOpenFilters && "active")}>
                    <div className="filters-items__top">
                        <svg
                            className="filters-items__top-icon"
                            onClick={onCloseFilters}
                            height="14" 
                            viewBox="0 0 15 14" 
                            width="15" 
                        >
                            <path d="M7.02799 14C6.84933 14.0002 6.67729 13.9324 6.54733 13.8102L0.198888 7.48326C-0.0662958 7.21853 -0.0662958 6.78983 0.198888 6.52519L6.54733 0.198281C6.81287 -0.0660936 7.24312 -0.0660936 7.50866 0.198281C7.63835 0.324186 7.71145 0.496911 7.71145 0.677319C7.71145 0.857726 7.63835 1.03045 7.50866 1.15635L1.64996 7.01326L7.49959 12.8431C7.62928 12.969 7.70238 13.1417 7.70238 13.3221C7.70238 13.5025 7.62928 13.6752 7.49959 13.8011C7.3767 13.9295 7.20602 14.0015 7.02799 14Z" fill="black"/>
                            <path d="M14.3196 7.68947H0.715834C0.340188 7.68947 0.0356445 7.38632 0.0356445 7.0124C0.0356445 6.63847 0.340188 6.33533 0.715834 6.33533H14.3196C14.6953 6.33533 14.9998 6.63847 14.9998 7.0124C14.9998 7.38632 14.6953 7.68947 14.3196 7.68947Z" fill="black"/>
                            <path d="M7.02799 14C6.84933 14.0002 6.67729 13.9324 6.54733 13.8102L0.198888 7.48326C-0.0662958 7.21853 -0.0662958 6.78983 0.198888 6.52519L6.54733 0.198281C6.81287 -0.0660936 7.24312 -0.0660936 7.50866 0.198281C7.63835 0.324186 7.71145 0.496911 7.71145 0.677319C7.71145 0.857726 7.63835 1.03045 7.50866 1.15635L1.64996 7.01326L7.49959 12.8431C7.62928 12.969 7.70238 13.1417 7.70238 13.3221C7.70238 13.5025 7.62928 13.6752 7.49959 13.8011C7.3767 13.9295 7.20602 14.0015 7.02799 14Z" fill="black"/>
                            <path d="M14.3196 7.68947H0.715834C0.340188 7.68947 0.0356445 7.38632 0.0356445 7.0124C0.0356445 6.63847 0.340188 6.33533 0.715834 6.33533H14.3196C14.6953 6.33533 14.9998 6.63847 14.9998 7.0124C14.9998 7.38632 14.6953 7.68947 14.3196 7.68947Z" fill="black"/>
                        </svg>
                        <h4 className="filters-items__top-title">Фильтры</h4>
                        <p className={classNames("filters-items__top-cancel", onFormLink() !== '' && "active")} onClick={onCancelFilters}>Сбросить</p>
                    </div>
                    <div className="filters-items__section">
                        {(statusColors === 'complete') && (
                            <>
                                {filters.map((filter, index) => (
                                    <AdminFilters                                
                                        {...filter}
                                        elements={filter.id === 'colors' ? colors : filter.elements}
                                        key={index}
                                    />
                                ))}
                                <AdminPriceFilters/>
                                {adminFilters.map((filter, index) => (
                                    <AdminBoolFilters                                
                                        {...filter}
                                        key={index}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                    <button className="filters-items__btn" onClick={onCloseFilters}>
                        {onFormLink() === '' ? 'Показать все товары' : 'Применить'}
                    </button>
                </div>
            </div>
            <div className="admin__right-table admin__table">
                <div className="admin__table-header table-header">
                    {adminTableHeader.map(({id, title, elements, values}, index) => (
                        <div className={
                            classNames("table-header__item", id === 'name' && "table-header__item--name")} 
                            key={index}
                        >
                            <h4 className="table-header__item-title" onClick={() => onOpenSortingList(id)}>{title}</h4>
                            {id !== 'id' && (
                                <>
                                    <svg 
                                        className={classNames("table-header__item-icon", isOpenSort === title && "active")}
                                        onClick={() => onOpenSortingList(id)}
                                        height="7" 
                                        viewBox="0 0 10 7" 
                                        width="10"
                                    >
                                        <path d="M9.22727 0L4.77748 0L0.770514 0C0.0848331 0 -0.258008 1.06248 0.227683 1.68532L3.92752 6.42983C4.52035 7.19006 5.48459 7.19006 6.07742 6.42983L7.48449 4.62545L9.77724 1.68532C10.2558 1.06248 9.91295 0 9.22727 0Z" fill="white"/>
                                    </svg>
                                    <ul className={classNames("table-header__item-list table-list", isOpenSort === id && "active", id === 'isPopular' && 'table-list--popular')}>
                                        {values.map((value, index) => (
                                            <li className="table-list__el" onClick={() => onChangeSorting(id, value)} key={index}>
                                                {isInSortingValues(value) ? (
                                                    <svg className="table-list__el-icon" fill="none" height="16" viewBox="0 0 16 16" width="16">
                                                        <circle cx="8" cy="8" r="7.5" stroke="#1F1F21"/>
                                                        <circle cx="7.99999" cy="7.99999" r="4.44444" fill="#1F1F21"/>
                                                    </svg>
                                                ) : (
                                                    <svg className="table-list__el-icon" fill="none" height="16" viewBox="0 0 16 16" width="16">
                                                        <circle cx="8" cy="8" r="7.5" stroke="#1F1F21"/>
                                                    </svg>
                                                )}
                                                <span className="table-list__el-text">{elements[index]}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}