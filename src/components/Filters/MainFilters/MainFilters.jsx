import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { catalogContext } from "@services/Context"; 

import "./MainFilters.styles.scss";

import listArrow from "@assets/images/icons/list-arrow.svg";
import crossIcon from "@assets/images/icons/cross.svg";
import checkIcon from "@assets/images/icons/check-icon.svg";


function MainFilters({ id, title, elements, values = elements }) {
    const { emptyLink, params, openedFilters, setOpenedFilters, formLink, onChangeLink } = useContext(catalogContext); 

    const [filters, setFilters] = useState([]);

    const navigate = useNavigate();
   

    function onChangeFilter(element) {
        if (filters.find(obj => obj === element)) {
            setFilters(prev => prev.filter(obj => obj !== element));
            (filters.length === 1) ? onChangeLink(id, "") : onChangeLink(id, filters.filter(obj => obj !== element).join(","));
        } else {
            setFilters(prev => [...prev, element]);
            onChangeLink(id, [...filters, element].join(","));
        }
    }

    function cancelFilters() {
        setFilters([]);
        onChangeLink(id, "");

        navigate(`/catalog/?${cancelLink()}`);
    }

    function setTitle() {
        if (filters.length !== 0) {
            return filters.length;
        } else {
            return "";
        }
    }

    function cancelLink() {
        const link = formLink();
        
        return link.split('&').filter(obj => !(obj.includes(id))).join('&');
    }

    function onCloseFilters() {
        setOpenedFilters("");
        formLink(); 

        navigate(`/catalog/?${formLink()}`);
    }

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
        emptyLink && setFilters([]);
    }, [emptyLink])


    return (
        <div className="filter">
            <div className="filter__btn btn" onClick={ () => openedFilters === id ? setOpenedFilters("") : setOpenedFilters(id) }>
                <h6 className="filter__btn-title filter-title">
                    <span className="filter-title__left">{ title }</span>
                    <span className="filter-title__right">{ setTitle() }</span>    
                </h6>
                { filters.length === 0 ? <img src={ listArrow } alt={ 'more'} className="filter__icon" />
                    : <img src={ crossIcon } alt={ 'cancel'} onClick={ () => cancelFilters() } className="filter__icon" />
                }
            </div>

            <div className={ openedFilters === id ? "filter__list active" : "filter__list" }>
                <ul className="filter__list-wrapper list-wrapper">
                    { elements.map((item, i) => <li className={ filters.find(obj => obj === values[i]) ? "list-wrapper__el active" : "list-wrapper__el"} onClick={ () => onChangeFilter(values[i])} key = { i }>
                                                    <p className="list-wrapper__el-text">{ item }</p>
                                                    { filters.find(obj => obj === values[i]) ? <img 
                                                                                                    src = { checkIcon } 
                                                                                                    alt = "" 
                                                                                                    width = { 18 } 
                                                                                                    height = { 13 } 
                                                                                                    className = "list-wrapper__el-icon"
                                                                                               />
                                                        : null }
                                                </li>)
                    }
                </ul>
                <div className="filter__list-link" onClick={ () => onCloseFilters() }>
                    <button className="filter__list-btn">Применить</button>
                </div>
            </div>
        </div>
    )
}

export default MainFilters;