import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { catalogContext } from "@services/Context"; 

import "./MainFilters.styles.scss";

import listArrow from "@assets/images/icons/list-arrow.svg";
import crossIcon from "@assets/images/icons/cross.svg";


function MainFilters({ id, title, elements, values = elements }) {
    const { params, openedFilters, setOpenedFilters, formLink, onChangeLink } = useContext(catalogContext); 

    const [filters, setFilters] = useState([]);
   

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
    }

    useEffect(() => {
        setFilters(params[id] ? String(params[id]).split(',')
                                .filter(obj => values.find(el => obj === el)) 
        : []);

        onChangeLink(id, params[id] ? String(params[id]).split(',')
                                            .filter(obj => values.find(el => obj === el)).join(',')
        : "")
    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="filter">
            <div onClick={ () => openedFilters === id ? setOpenedFilters("") : setOpenedFilters(id) } className="filter__wrapper btn">
                <h6 className="filter__title">
                    <span>{ title }</span>
                    <span>{ setTitle() }</span>    
                </h6>
                { filters.length !== 0 ? <Link to={ `/catalog/?${cancelLink()}` } className="filter__icon" onClick={ () => cancelFilters() } >
                                            <img src={ crossIcon } alt={ 'cancel'} />
                                         </Link>
                    : <img src={ listArrow } alt={ 'more'} /> }
            </div>

            <ul className={ openedFilters === id ? "filter__list active" : "filter__list" } style={{width: "100%"}}>
                { elements.map((item, i) => {
                    return (
                        
                            <li 
                                className={ filters.find(obj => obj === values[i]) ? "filter__list-el active" : "filter__list-el"} 
                                onClick={ () => onChangeFilter(values[i])}
                                key = { i }
                            >{ item }</li>   
                    )
                })}

                <Link to={ `/catalog/?${formLink()}` } >
                    <button className="filter__list-btn btn" onClick={ () => onCloseFilters() }>Применить</button>
                </Link>
            </ul>
        </div>
    )
}

export default MainFilters;