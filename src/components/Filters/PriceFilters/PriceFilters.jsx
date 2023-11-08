import {useContext, useEffect, useState} from "react";

import {validatePriceInput as validateInput} from "@utils/helpers";
import {catalogContext} from "@services/Context";

import "./PriceFilters.style.scss";


export default function PriceFilters() {
    const {onFormLink, link, params, setAmount, setLink} = useContext(catalogContext);
    const [startValue, setStartValue] = useState('');
    const [endValue, setEndValue] = useState('');
   

    useEffect(() => {
        if (validateInput(params['fromPrice'])) {
            setLink({...link, 'fromPrice': params['fromPrice']});
            setStartValue(params['fromPrice']);
            setAmount(prev => prev += 1);
        } else {
            setStartValue('');
        }
            
        if (validateInput(params['toPrice'])) {
            setLink({...link, 'toPrice': params['toPrice']});
            setEndValue(params['toPrice']);
            setAmount(prev => prev += 1);
        } else {
            setEndValue('');
        }
    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (onFormLink(link) === '') {
            setStartValue('');
            setEndValue('');
        }
    }, [link]) // eslint-disable-line react-hooks/exhaustive-deps


    const onChangeValue = (event) => {
        const id = event.target.id;

        if (id === 'fromPrice') {
            setStartValue(event.target.value);
        } else {
            setEndValue(event.target.value);
        }

        if (validateInput(event.target.value)) {
            setLink({...link, [id]: event.target.value});
        }

        if (startValue === '' && id === 'toPrice') {
            setStartValue(3000);
            setLink({...link, 'fromPrice': 3000});
        }

        if (endValue === '' && id === 'fromPrice') {
            setEndValue(50000);
            setLink({...link, 'toPrice': 50000});
        }

        if (startValue === '' && endValue === '') {
            setLink({...link, 'fromPrice': 3000, 'toPrice': 50000});
        }
    }


    return (
        <div className="filter filter--price">
            <h6 className="filter__title">Цена, ₽</h6>
            <div className="filter__price">
                <input 
                    className="filter__price-input"
                    id="fromPrice"
                    onChange={onChangeValue}
                    placeholder="От" 
                    type="number" 
                    value={startValue} 
                />
                <span className="filter__price-span"></span>
                <input 
                    className="filter__price-input"
                    id="toPrice"
                    onChange={onChangeValue}
                    placeholder="До" 
                    type="number" 
                    value={endValue} 
                />
            </div>
        </div>
    );
}
