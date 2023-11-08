import {useEffect, useState, useContext} from "react";
import classNames from "classnames";

import {catalogContext} from "@services/Context"; 

import "./MainFilters.style.scss";


export default function MainFilters({id, title, elements, values = elements}) {
    const {onFormLink, link, params, setAmount, setLink} = useContext(catalogContext);
    const [filters, setFilters] = useState([]);
   

    useEffect(() => {
        if (params[id]) {
            setFilters(String(params[id]).split(',').filter(item => values.includes(item)));
            setAmount(prev => prev += String(params[id]).split(',').filter(item => values.includes(item)).length);
        } else {
            setFilters([]);
        }
    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {if (onFormLink(link) === '') setFilters([])}, [link]) // eslint-disable-line react-hooks/exhaustive-deps
    

    const onChangeFilter = (element) => {
        if (filters.find(obj => obj === element)) {
            setFilters(prev => prev.filter(obj => obj !== element));
            setLink({...link, [id]: filters.filter(obj => obj !== element).join(',')});
        } else {
            setFilters(prev => [...prev, element]);
            setLink({...link, [id]: [...filters, element].join(',')});
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
