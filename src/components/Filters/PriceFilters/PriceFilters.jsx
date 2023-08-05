import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { validatePriceInput } from "@utils/helpers";
import { catalogContext } from "@services/Context";
import { priceFilters } from "@utils/constants";

import "./PriceFilters.styles.scss";

import listArrow from "@assets/images/icons/list-arrow.svg";
import crossIcon from "@assets/images/icons/cross.svg";


function PriceFilters() {
    const { params, openedFilters, setOpenedFilters, formLink, onChangeLink } = useContext(catalogContext);

    const [startValue, setStartValue] = useState("");
    const [endValue, setEndValue] = useState("");
   

    function onChangeStartValue(element) {
        setStartValue(element);
        onChangeLink("fromPrice", element);
    }

    function onChangeEndValue(element) {
        if (element === endValue) {
            setEndValue("");
            onChangeLink("toPrice", "");
        } else {
            setEndValue(element);
            onChangeLink("toPrice", element);
        }
    }

    function cancelFilters() {
        setEndValue("");
        setStartValue("");
        onChangeLink("fromPrice", "");
        onChangeLink("toPrice", "");
    }

    function setTitle() {
        if (startValue !== "" && endValue !== "") {
            return 2;
        } 
        if (startValue === "" && endValue === "") {
            return "";
        }
        return 1;
    }

    function cancelLink() {
        const link = formLink();

        return link.split('&').filter(obj => !obj.includes('toPrice') && !obj.includes('fromPrice')).join('&');
    }

    function onCloseFilters() {
        setOpenedFilters("");
        formLink(); 
    }

    useEffect(() => {
        if (Object.keys(params) !== []) {
            if (params["fromPrice"] && validatePriceInput(params["fromPrice"])) {
                setStartValue(params["fromPrice"]);
                onChangeLink("fromPrice", params["fromPrice"]);
            }
            if (params["toPrice"] && validatePriceInput(params["toPrice"])) {
                setEndValue(params["toPrice"]);
                onChangeLink("toPrice", params["toPrice"]);
            }
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="filter">
            <div onClick={ () => openedFilters === "price" ? setOpenedFilters("") : setOpenedFilters("price") } className="filter__wrapper btn">
                <h6 className="filter__title">
                    <span>{ priceFilters.title }</span>
                    <span>{ setTitle() }</span>    
                </h6>
                { (startValue !== "" || endValue !== "") ? 
                    <Link to={ `/catalog/?${cancelLink()}` } className="filter__icon">
                        <img src={ crossIcon } alt={ 'cancel'} onClick={ () => cancelFilters() } />
                    </Link>
                :   
                    <img src={ listArrow } alt={ 'more'} />
                }
            </div>

            <ul className={ openedFilters === "price" ? "filter__list active" : "filter__list" } style={{width: 300}}>
                <div className="filter__list-price">
                    <input 
                        type="number" 
                        placeholder="От" 
                        value={ startValue } 
                        onChange={ (event) => onChangeStartValue(event.target.value) }
                    />
                    <span>—</span>
                    <input 
                        type="number" 
                        placeholder="До" 
                        value={ endValue } 
                        onChange={ (event) => onChangeEndValue(event.target.value) }
                    />
                </div>
                { priceFilters.elements.map((item, i) => {
                    return (
                        
                            <li 
                                className={ priceFilters.values[i] === endValue ? "filter__list-el active" : "filter__list-el"} 
                                onClick={ () => onChangeEndValue(priceFilters.values[i])}
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

export default PriceFilters;