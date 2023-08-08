import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { validatePriceInput } from "@utils/helpers";
import { catalogContext } from "@services/Context";

import "./PriceFilters.styles.scss";

import listArrow from "@assets/images/icons/list-arrow.svg";
import crossIcon from "@assets/images/icons/cross.svg";


function PriceFilters() {
    const { emptyLink, params, openedFilters, setOpenedFilters, formLink, onChangeLink } = useContext(catalogContext);

    const [startValue, setStartValue] = useState("");
    const [endValue, setEndValue] = useState("");

    const navigate = useNavigate();
   

    function onChangeStartValue(element) {
        setStartValue(element);
        onChangeLink("fromPrice", element);
    }

    function onChangeEndValue(element) {
        setEndValue(element);
        onChangeLink("toPrice", element);
    }

    function cancelFilters() {
        setOpenedFilters("");
        
        setEndValue("");
        setStartValue("");
        onChangeLink("fromPrice", "");
        onChangeLink("toPrice", "");

        navigate(`/catalog/?${cancelLink()}`);
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

        navigate(`/catalog/?${formLink()}`);
    }

    useEffect(() => {
        if (params["fromPrice"] && validatePriceInput(params["fromPrice"])) {
            setStartValue(params["fromPrice"]);
            onChangeLink("fromPrice", params["fromPrice"]);
        } else if (!params["fromPrice"]) {
            setStartValue("");
            onChangeLink("fromPrice", "");
        }
            
        if (params["toPrice"] && validatePriceInput(params["toPrice"])) {
            setEndValue(params["toPrice"]);
            onChangeLink("toPrice", params["toPrice"]);
        } else if (!params["toPrice"]) {
            setEndValue("");
            onChangeLink("toPrice", "");
        }
    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (emptyLink) {
            setStartValue("");
            setEndValue("");
        }
    }, [emptyLink])


    return (
        <div className="filter">
            <div className="filter__btn btn" onClick={ () => openedFilters === "price" ? setOpenedFilters("") : setOpenedFilters("price") }>
                <h6 className="filter__btn-title filter-title">
                    <span className="filter-title__left">Цена, ₽</span>
                    <span className="filter-title__right">{ setTitle() }</span>    
                </h6>
                { (startValue === "" && endValue === "") ? <img src={ listArrow } alt={ 'more'} className="filter__icon" />
                    : <img src={ crossIcon } alt={ 'cancel'} onClick={ () => cancelFilters() } className="filter__icon" />               
                }
            </div>
            
            <div className={ openedFilters === "price" ? "filter__list filter__list--price active" : "filter__list filter__list--price" } >
                <div className="filter__price-list price-list">
                    <input 
                        type = "number" 
                        placeholder = "От" 
                        value = { startValue } 
                        onChange = { (event) => onChangeStartValue(event.target.value) }
                        className = "price-list__input"
                    />
                    <span className = "price-list__span">—</span>
                    <input 
                        type = "number" 
                        placeholder = "До" 
                        value = { endValue } 
                        onChange = { (event) => onChangeEndValue(event.target.value) }
                        className = "price-list__input"
                    />
                </div>
                <div className="filter__list-link filter__list-link--price" onClick={ () => onCloseFilters() }>
                    <button className="filter__list-btn">Применить</button>
                </div>
            </div>
        </div>
    )
}

export default PriceFilters;