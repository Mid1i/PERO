import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { catalogContext } from "@services/Context";
import { sorting } from "@utils/constants";

import "./Sorting.styles.scss";

import listArrow from "@assets/images/icons/sorting-list-arrow.svg";
import sortingIcon from "@assets/images/icons/sorting-icon.svg";
import checkIcon from "@assets/images/icons/check-icon.svg";


function Sorting() {
    const { params, openedFilters, setOpenedFilters, formLink, onChangeLink } = useContext(catalogContext); 
    
    const [sort, setSort] = useState("По популярности");

    const navigate = useNavigate();
   

    function onChangeSort(element) {
        const link = formLink();

        if (link) {
            return element ? `/catalog/?${link}&sort=${element}` : `/catalog/?${link}`;
        } else {
            return element ? `/catalog/?sort=${element}` : `/catalog/`;
        }
    }

    useEffect(() => {
        if (Object.keys(params) !== [] && sorting.values.includes(params["sort"])) {
            setSort(sorting.elements[sorting.values.indexOf(params["sort"])]);
            onChangeLink(sorting.values[sorting.elements.indexOf(params["sort"])]);
        }
    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="sorting" onClick={ () => openedFilters === "sort" ? setOpenedFilters("") : setOpenedFilters("sort") }>
            <img src={ sortingIcon } alt="more" className="sorting__icon--mobile" />
            <h6 className="sorting__title">{ sort }</h6>
            <img src={ listArrow } alt="more" className="sorting__icon--computers" />
            <ul className={ openedFilters === "sort" ? "sorting__list active" : "sorting__list" } >
                { sorting.elements.map((item, i) => <li key = { i } className="sorting__list-el" onClick={ () => navigate(onChangeSort(sorting.values[i])) }>
                                                        <p className="sorting__list-text">{ item }</p>
                                                        { sort === item ? <img 
                                                                            src={ checkIcon } 
                                                                            alt="" 
                                                                            width={ 18 } 
                                                                            height={ 13 } 
                                                                            /> 
                                                            : null }  
                                                    </li>)
                }
            </ul>
        </div>
    )
}

export default Sorting;