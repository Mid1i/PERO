import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

import {catalogContext} from "@services/Context";
import {sorting} from "@utils/constants";

import "./Sorting.style.scss";

import {checkIcon, sortingListArrow, sortingIcon} from "@assets/images";


export default function Sorting() {
    const {formLink, params, onChangeLink, openedFilters, setOpenedFilters} = useContext(catalogContext); 
    
    const [sort, setSort] = useState('По популярности');

    const navigate = useNavigate();
   

    useEffect(() => {
        if (sorting.values.includes(params['sort'])) {
            setSort(sorting.elements[sorting.values.indexOf(params['sort'])]);
            onChangeLink(sorting.values[sorting.elements.indexOf(params['sort'])]);
        } else {
            setSort('По популярности');
        }
    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps


    const onChangeSort = (element) => {
        if (formLink() && element) {
            return `/catalog/?${formLink()}&sort=${element}`;
        } else if (formLink()) {
            return `/catalog/?${formLink()}`;
        } else if (element) {
            return `/catalog/?sort=${element}`;
        } else {
            return '/catalog/';
        }
    }


    return (
        <div className="sorting" onClick={() => openedFilters === 'sort' ? setOpenedFilters('') : setOpenedFilters('sort')}>
            <img src={sortingIcon} alt="more" className="sorting__icon--mobile"/>
            <h6 className="sorting__title">{sort}</h6>
            <img src={sortingListArrow} alt="more" className="sorting__icon--computers"/>
            <ul className={classNames("sorting__list", openedFilters === 'sort' && "active")}>
                {sorting.elements.map((value, index) => (
                        <li 
                            key={index} 
                            className="sorting__list-el" 
                            onClick={() => navigate(onChangeSort(sorting.values[index]))}
                        >
                            <p className="sorting__list-text">{value}</p>
                            {sort === value && <img 
                                                    alt="" 
                                                    height={13} 
                                                    src={checkIcon} 
                                                    width={18} 
                                               /> 
                            }  
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}
