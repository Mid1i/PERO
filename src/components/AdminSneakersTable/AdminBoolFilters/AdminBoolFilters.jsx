import {useEffect, useState, useContext} from "react";

import {adminContext} from "@services/Context"; 

import "./AdminBoolFilters.style.scss";


export default function AdminBoolFilters({id, title, elements, values}) {
    const {filterValues, onFormFiltersLink, setFilterValues} = useContext(adminContext);
    const [filters, setFilters] = useState('');
   
    
    useEffect(() => {if (onFormFiltersLink() === '') setFilters([])}, [filterValues]); // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {if (filterValues[id]) setFilters(filterValues[id]);}, []); // eslint-disable-line react-hooks/exhaustive-deps


    const onChangeFilter = (element) => {
        if (filters === element) {
            setFilters('');
            setFilterValues({...filterValues, [id]: ''});
        } else {
            setFilters(element);
            setFilterValues({...filterValues, [id]: element});
        }
    }
    

    return (
        <div className="filter">
            <h6 className="filter__title">{title}</h6>
            <div className="filter__bool">
                {values.map((value, index) => (
                    <p className="filter__bool-item" onClick={() => onChangeFilter(value)} key={index}>
                        {filters === value ? (
                            <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
                                <circle cx="8" cy="8" r="7.5" stroke="#1F1F21"/>
                                <circle cx="7.99999" cy="7.99999" r="4.44444" fill="#1F1F21"/>
                            </svg>
                        ) : (
                            <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
                                <circle cx="8" cy="8" r="7.5" stroke="#1F1F21"/>
                            </svg>
                        )}
                        <span>{elements[index]}</span>
                    </p>
                ))}
            </div>
        </div>
    );
}