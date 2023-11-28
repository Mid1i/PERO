import {useContext, useEffect, useState} from "react";

import {validatePriceInput as validateInput} from "@utils/helpers";
import {adminContext} from "@services/Context";

import "./AdminPriceFilters.style.scss";


export default function AdminPriceFilters() {
    const {filterValues, onFormLink, setFilterValues} = useContext(adminContext);
    const [startValue, setStartValue] = useState('');
    const [endValue, setEndValue] = useState('');
   

    useEffect(() => {
        if (onFormLink() === '') {
            setStartValue('');
            setEndValue('');
        }
    }, [filterValues]) // eslint-disable-line react-hooks/exhaustive-deps


    const onChangeValue = (event) => {
        const id = event.target.id;

        if (id === 'fromPrice') {
            setStartValue(event.target.value);
        } else {
            setEndValue(event.target.value);
        }

        if (validateInput(event.target.value)) {
            setFilterValues({...filterValues, [id]: event.target.value});
        }

        if (startValue === '' && id === 'toPrice') {
            setStartValue(3000);
            setFilterValues({...filterValues, 'fromPrice': 3000});
        }

        if (endValue === '' && id === 'fromPrice') {
            setEndValue(50000);
            setFilterValues({...filterValues, 'toPrice': 50000});
        }

        if (startValue === '' && endValue === '') {
            setFilterValues({...filterValues, 'fromPrice': 3000, 'toPrice': 50000});
        }
    }


    return (
        <div className="filter filter--price filter--admin">
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