import React from 'react';
import { Link } from 'react-router-dom';

import { catalogContext } from "@services/Context"; 

import "./Filters.styles.scss";

import listArrow from "@assets/images/icons/list-arrow.svg";
import crossIcon from "@assets/images/icons/cross.svg";

//TODO: верстка фильтров + рефактор

function Filters({ id, title, elements, values = elements, isPrice = false }) {
    const { params, formLink, onChangeFiltersLink } = React.useContext(catalogContext); 
    
    const [isOpen, setIsOpen] = React.useState(false);

    const [filters, setFilters] = React.useState([]);

    const [startValue, setStartValue] = React.useState("");
    const [endValue, setEndValue] = React.useState("");
   
    const onClickFilter = (element, filterID = id) => {
        if (filterID === "fromPriceInput" || filterID === "toPriceInput") {
            filterID === "fromPriceInput" && setStartValue(element);
            filterID === "toPriceInput" && setEndValue(element);
            onChangeFiltersLink(filterID.replace("Input", ""), element);
            return;
        }

        if ((filterID === "sort" || filterID === "toPrice") & !(filters[0] === element)) {
            if (filters.length === 0 || filters.length === 1) {
                setFilters([element]);
                setEndValue(element);
                onChangeFiltersLink(filterID, element);
            } else {
                setEndValue("");
                onChangeFiltersLink(filterID, "");
            }
            return;
        }
        
        if (filters.find(obj => obj === element)) {
            setFilters(prev => prev.filter(obj => obj !== element));

            if (filters.length === 1) {
                onChangeFiltersLink(filterID, "");
                filterID === "toPrice" && setEndValue("");
            } else {
                onChangeFiltersLink(filterID, filters.filter(obj => obj !== element).join(","));
            }

        } else {
            setFilters(prev => [...prev, element]);
            onChangeFiltersLink(filterID, [...filters, element].join(","));
        }
    }

    const cancelFilters = () => {
        setFilters([]);
        onChangeFiltersLink(id, "");

        if (id === "toPrice") {
            setStartValue("");
            setEndValue("");
            onChangeFiltersLink("fromPrice", "");
        }
    }

    const setTitle = () => {
        if (id === "toPrice") {
            if (startValue !== "" & endValue !== "") {
                return 2;
            } 
            if (startValue === "" & endValue === "") {
                return "";
            }
            return 1; 
        } else {
            if (filters.length !== 0) {
                return filters.length;
            } else {
                return "";
            }
        }
    }

    const cancelLink = () => {
        const link = formLink();

        if (id === 'toPrice') {
            return link.split('&').filter(obj => !obj.includes(id) & !obj.includes('fromPrice')).join('&');
        } else {
            return link.split('&').filter(obj => !obj.includes(id)).join('&');
        }
    }

    React.useEffect(() => {
        setFilters(params[id] ? String(params[id]).split(',')
                                .filter(obj => values.find(el => obj === el)) 
        : []);

        onChangeFiltersLink(id, params[id] ? String(params[id]).split(',')
                                            .filter(obj => values.find(el => obj === el)).join(',')
        : "")

        if (params['fromPrice']) {
            setStartValue(params['fromPrice']);
        }

        if (params['toPrice']) {
            setEndValue(params['toPrice']);
        }
        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="filter">
            <div onClick={ () => setIsOpen(!isOpen) } className="filter__wrapper btn">
                <h6 className="filter__title">
                    <span>{ title }</span>
                    <span>{ setTitle() }</span>    
                </h6>
                { (filters.length !== 0 || startValue !== "" || endValue !== "") ? 
                    <Link to={ `/catalog/?${cancelLink()}` } className="filter__icon">
                        <img src={ crossIcon } alt={ 'cancel'} onClick={ () => cancelFilters() } />
                    </Link>
                :   
                    <img src={ listArrow } alt={ 'more'} onClick={ () => setIsOpen(!isOpen) } />
                }
            </div>

            <ul className={ isOpen ? "filter__list active" : "filter__list" } style={ isPrice ? {width: 300} : {width: "100%"}}>
                { isPrice ? 
                    <div className="filter__list-price">
                        <input 
                            type="text" 
                            placeholder="От" 
                            value={ startValue } 
                            onChange={ (event) => onClickFilter(event.target.value, 'fromPriceInput') }
                        />
                        <span>—</span>
                        <input 
                            type="text" 
                            placeholder="До" 
                            value={ endValue } 
                            onChange={ (event) => onClickFilter(event.target.value, 'toPriceInput') }
                        />
                    </div>
                    : null }
                { elements.map((item, i) => {
                    return (
                        
                            <li 
                                className={ filters.find(obj => obj === values[i]) ? "filter__list-el active" : "filter__list-el"} 
                                onClick={ () => onClickFilter(values[i])}
                                key = { i }
                            >{ item }</li>   
                    )
                })}

                <Link to={ `/catalog/?${formLink()}` } >
                    <button className="filter__list-btn btn" onClick={ () => formLink() }>Применить</button>
                </Link>
            </ul>
        </div>
    )
}

export default Filters;