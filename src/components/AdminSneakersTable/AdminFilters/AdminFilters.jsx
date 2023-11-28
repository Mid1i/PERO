import {useEffect, useState, useContext} from "react";
import classNames from "classnames";

import {adminContext} from "@services/Context"; 

import "./AdminFilters.style.scss";


export default function AdminFilters({id, title, elements, values = elements}) {
    const {filterValues, onFormLink, setFilterValues} = useContext(adminContext);
    const [filters, setFilters] = useState([]);
   
    
    useEffect(() => {if (onFormLink() === '') setFilters([])}, [filterValues]) // eslint-disable-line react-hooks/exhaustive-deps
    

    const onChangeFilter = (element) => {
        if (filters.find(obj => obj === element)) {
            setFilters(prev => prev.filter(obj => obj !== element));
            setFilterValues({...filterValues, [id]: filters.filter(obj => obj !== element).join(',')});
        } else {
            setFilters(prev => [...prev, element]);
            setFilterValues({...filterValues, [id]: [...filters, element].join(',')});
        }
    }
    

    return (
        <div className="filter">
            <h6 className="filter__title">{title}</h6>
            <div className="filter__items">
                {elements.map((filter, index) => (
                    <p 
                        className={classNames("filter__items-item", filters.find(obj => obj === values[index]) && "active")}
                        onClick={() => onChangeFilter(values[index])} 
                        key={index}
                    >
                        {filter}
                    </p>
                ))}
            </div>
        </div>
    );
}