import {useEffect, useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

import {catalogContext} from "@services/Context"; 

import "./MainFilters.style.scss";

import {checkIcon, listArrow, whiteCross} from "@assets/images";


export default function MainFilters({id, title, elements, values = elements}) {
    const {emptyLink, formLink, onChangeLink, openedFilters, params, setOpenedFilters} = useContext(catalogContext); 

    const [filters, setFilters] = useState([]);

    const navigate = useNavigate();
   

    useEffect(() => {
        setFilters(params[id] ? String(params[id]).split(",")
                                                  .filter(item => values.includes(item)) 
            : []);

        onChangeLink(id, params[id] ? String(params[id]).split(",")
                                                        .filter(item => values.includes(item))
                                                        .join(",") 
            : "");
    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        !!emptyLink && setFilters([]);
    }, [emptyLink])


    const onChangeFilter = (element) => {
        if (filters.find(obj => obj === element)) {
            setFilters(prev => prev.filter(obj => obj !== element));
            filters.length === 1 ? onChangeLink(id, '') : onChangeLink(id, filters.filter(obj => obj !== element).join(','));
        } else {
            setFilters(prev => [...prev, element]);
            onChangeLink(id, [...filters, element].join(','));
        }
    }

    const onCancelFilters = () => {
        setOpenedFilters('');

        setFilters([]);
        onChangeLink(id, '');

        navigate(`/catalog/?${formLink().split('&').filter(obj => !(obj.includes(id))).join('&')}`);
    }

    const onCloseFilters = () => navigate(`/catalog/?${formLink()}`);

    const onOpenFiltersList = () => openedFilters === id ? setOpenedFilters('') : setOpenedFilters(id);


    return (
        <div className="filter">
            <div className="filter__btn btn" onClick={() => onOpenFiltersList()}>
                <h6 className="filter__btn-title filter-title">
                    <span className="filter-title__left">{title}</span>
                    {filters.length !== 0 && <span className="filter-title__right">{filters.length}</span>}   
                </h6>
                <img 
                    alt={filters.length === 0 ? 'more' : 'cancel'} 
                    className="filter__icon"
                    onClick={() => filters.length !== 0 && onCancelFilters()} 
                    src={filters.length === 0 ? listArrow : whiteCross} 
                />
            </div>

            <div className={classNames("filter__list", openedFilters === id && "active")}>
                <ul className="filter__list-wrapper list-wrapper">
                    {elements.map((filter, index) => (
                            <li 
                                className={classNames("list-wrapper__el", filters.find(obj => obj === values[index]) && "active")}
                                onClick={() => onChangeFilter(values[index])} 
                                key={index}
                            >
                                <p className={classNames("list-wrapper__el-text", id === 'sizes' && "list-wrapper__el-text--num")}>{filter}</p>
                                {!!filters.find(obj => obj === values[index]) && <img 
                                                                                    className="list-wrapper__el-icon"
                                                                                    alt=""
                                                                                    src={checkIcon} 
                                                                                    />
                                }
                            </li>
                        )
                    )}
                </ul>
                <div className="filter__list-link" onClick={() => onCloseFilters()}>
                    <button className="filter__list-btn">Применить</button>
                </div>
            </div>
        </div>
    );
}
