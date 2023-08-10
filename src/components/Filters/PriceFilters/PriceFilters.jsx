import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

import {validatePriceInput as validateInput} from "@utils/helpers";
import {catalogContext} from "@services/Context";

import "./PriceFilters.style.scss";

import {listArrow, whiteCross} from "@assets/images";


export default function PriceFilters() {
    const {emptyLink, formLink, onChangeLink, openedFilters, params, setOpenedFilters} = useContext(catalogContext);

    const [endValue, setEndValue] = useState('');
    const [startValue, setStartValue] = useState('');

    const navigate = useNavigate();
   

    useEffect(() => {
        if (params['fromPrice'] && validateInput(params['fromPrice'])) {
            setStartValue(params['fromPrice']);
            onChangeLink('fromPrice', params['fromPrice']);
        } else if (!params['fromPrice']) {
            setStartValue('');
            onChangeLink('fromPrice', '');
        }
            
        if (params['toPrice'] && validateInput(params['toPrice'])) {
            setEndValue(params['toPrice']);
            onChangeLink('toPrice', params['toPrice']);
        } else if (!params['toPrice']) {
            setEndValue('');
            onChangeLink('toPrice', '');
        }
    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        emptyLink && setStartValue('');
        emptyLink && setEndValue('');
    }, [emptyLink])


    const onChangeEndValue = (event) => {
        setEndValue(event.target.value);
        onChangeLink('toPrice', event.target.value);
    }

    const onChangeStartValue = (event) => {
        setStartValue(event.target.value);
        onChangeLink('fromPrice', event.target.value);
    }

    const onCancelFilters = () => {
        setOpenedFilters('');
        
        setEndValue('');
        setStartValue('');
        onChangeLink('fromPrice', '');
        onChangeLink('toPrice', '');

        navigate(`/catalog/?${formLink().split('&').filter(obj => !obj.includes('toPrice') && !obj.includes('fromPrice')).join('&')}`);
    }

    const setTitle = () => {
        if (startValue !== "" && endValue !== "") {
            return 2;
        } else if (startValue !== "" || endValue !== "") {
            return 1;
        } else {
            return '';
        }
    }

    const onCloseFilters = () => navigate(`/catalog/?${formLink()}`);


    return (
        <div className="filter">
            <div 
                className="filter__btn btn" 
                onClick={() => openedFilters === 'price' ? setOpenedFilters('') : setOpenedFilters('price')}
            >
                <h6 className="filter__btn-title filter-title">
                    <span className="filter-title__left">Цена, ₽</span>
                    <span className="filter-title__right">{setTitle()}</span>    
                </h6>
                <img 
                    alt={(startValue === '' && endValue === '') ? 'more' : 'cancel'} 
                    className="filter__icon" 
                    onClick={() => (startValue !== '' || endValue !== '') && onCancelFilters()}
                    src={(startValue === '' && endValue === '') ? listArrow : whiteCross} 
                />
            </div>
            
            <div className={classNames("filter__list filter__list--price", openedFilters === 'price' && "active")}>
                <div className="filter__price-list price-list">
                    <input 
                        className="price-list__input"
                        onChange={onChangeStartValue}
                        placeholder="От" 
                        type="number" 
                        value={startValue} 
                    />
                    <span className="price-list__span">—</span>
                    <input 
                        className="price-list__input"
                        onChange={onChangeEndValue}
                        placeholder="До" 
                        type="number" 
                        value={endValue} 
                    />
                </div>
                <div className="filter__list-link filter__list-link--price" onClick={() => onCloseFilters()}>
                    <button className="filter__list-btn">Применить</button>
                </div>
            </div>
        </div>
    );
}
