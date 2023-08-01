import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import "./Filters.styles.scss";

function Filters({ id, title, elements, isPrice=false }) {
    const { search } = useLocation();
    console.log(search)
    
    const [isOpen, setIsOpen] = React.useState(false);

    const [value, setValue] = React.useState("");
    const [filters, setFilters] = React.useState([]);

    const [startValue, setStartValue] = React.useState("");
    const [endValue, setEndValue] = React.useState("");

    const setTitle = (item) => {
        if (filters.find(obj => obj === item)) {
            setFilters(prev => prev.filter(obj => obj !== item));
        } else {
            if (title === "Сортировка" || title === "Цена") {
                setStartValue("");
                setEndValue(item.slice(3, -2));
                setFilters([item]);
            } else {
                setFilters(prev => [...prev, item]);
            }
        }
    }

    const onStartValueChange = (inputValue) => {
        setFilters([]);
        setStartValue(inputValue);
    }

    const onEndValueChange = (inputValue) => {
        setFilters([]);
        setEndValue(inputValue);
    }

    const generateWindowLink = (item) => {
        if (window.location.href.includes(`${id}=${item}`)) {
            return window.location.href.replace(`&${id}=${item}`, "").replace(`?${id}=${item}`, "");
        }

        if (id === "brand") {
            if (window.location.href.includes(`${id}=${item.toUpperCase().replace(" ", "_")}`)) {
                return window.location.href.replace(`&${id}=${item.toUpperCase().replace(" ", "_")}`, "");
            }
            
            if (search === "") {
                return `${window.location.href}?${id}=${item.toUpperCase().replace(" ", "_")}`;
            } else {
                return `${window.location.href}&${id}=${item.toUpperCase().replace(" ", "_")}`;
            }
        }
        
        if (search === "") {
            return `${window.location.href}?${id}=${item}`;
        } else {
            return `${window.location.href}&${id}=${item}`;
        }
    }

    React.useEffect(() => {
        filters.length === 0 && setValue("");
        filters.length === 1 && setValue(filters[0]);
        filters.length > 1 && setValue(filters.length);
    }, [filters]);

    React.useEffect(() => {
        startValue !== "" && setValue(`От ${startValue} ₽`);
        endValue !== "" && setValue(`До ${endValue} ₽`);
        startValue !== "" & endValue !== "" && setValue(`${startValue} — ${endValue}`);
    },[startValue, endValue]);


    return (
        <div className="filter">
            <div onClick={ () => setIsOpen(!isOpen) } className="filter__wrapper btn">
                <h6 className="filter__title">
                    <span>{ title === "Сортировка" ? (filters.length === 0 ? title : "") : title }</span>
                    <span>{ value }</span>    
                </h6>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="filter__icon">
                    <path d="M9.77988 0.229439C9.6389 0.0825294 9.44771 -1.25342e-07 9.24837 -1.25342e-07C9.04902 -1.25342e-07 8.85783 0.0825294 8.71685 0.229439L4.99546 4.10846L1.27408 0.229439C1.13229 0.0866929 0.94238 0.00770635 0.745262 0.00949181C0.548144 0.0112773 0.359584 0.0936917 0.220195 0.238985C0.0808063 0.384278 0.00174166 0.580825 2.87607e-05 0.786293C-0.00168414 0.991761 0.0740925 1.18971 0.211038 1.33751L4.46394 5.77056C4.60492 5.91747 4.79611 6 4.99546 6C5.19481 6 5.386 5.91747 5.52698 5.77056L9.77988 1.33751C9.92082 1.19055 10 0.991266 10 0.783473C10 0.57568 9.92082 0.376394 9.77988 0.229439Z" fill="white"/>
                </svg>
            </div>
            <ul className={ isOpen ? "filter__list active" : "filter__list" } style={ isPrice ? {width: 300} : {width: "100%"}}>
                { isPrice ? 
                    <div className="filter__list-price">
                        <input 
                            type="text" 
                            placeholder="От" 
                            value={ startValue } 
                            onChange={ (event) => onStartValueChange(event.target.value) }
                        />
                        <span>—</span>
                        <input 
                            type="text" 
                            placeholder="До" 
                            value={ endValue } 
                            onChange={ (event) => onEndValueChange(event.target.value) }
                        />
                    </div>
                    : null }
                { elements.map((item, i) => {
                    return (
                        <Link to={ generateWindowLink(item) } key={ i } >
                            <li 
                                className={ filters.find(obj => obj === item) ? "filter__list-el active" : "filter__list-el"} 
                                onClick={ () => setTitle(item) }
                            >{ item }</li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}

export default Filters;