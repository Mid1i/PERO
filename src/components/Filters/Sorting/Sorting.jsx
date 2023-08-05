import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { catalogContext } from "@services/Context";
import { sorting } from "@utils/constants";

import "./Sorting.styles.scss";

import listArrow from "@assets/images/icons/list-arrow.svg";
import crossIcon from "@assets/images/icons/cross.svg";


function Sorting() {
    const { params, openedFilters, setOpenedFilters, formLink, onChangeLink } = useContext(catalogContext); 
    
    const [sort, setSort] = useState("По популярности");
   

    function onChangeSort(element, value) {
        if (sort === element && element !== "По популярности") {
            setSort("По популярности");
            onChangeLink("sort", "");
            console.log("sort empty")
            return;
        }
        if (sort !== element && element !== "По популярности") {
            setSort(element);
            onChangeLink("sort", value);
            return;
        }
        if (element === "По популярности") {
            setSort(element);
            onChangeLink("sort", "");
            return;
        }
    }

    function onCancelSort() {
        setSort("По популярности");
        onChangeLink("sort", "");
    }

    function cancelLink() {
        const link = formLink();

        return link.split('&').filter(obj => !obj.includes("sort")).join('&');
    }

    function onCloseFilters() {
        setOpenedFilters("");
        formLink(); 
    }

    useEffect(() => {
        if (Object.keys(params) !== [] && sorting.values.includes(params["sort"])) {
            setSort(sorting.elements[sorting.values.indexOf(params["sort"])]);
            onChangeLink(sorting.values[sorting.elements.indexOf(params["sort"])]);
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="filter">
            <div onClick={ () => openedFilters === "sort" ? setOpenedFilters("") : setOpenedFilters("sort") } className="filter__wrapper btn">
                <h6 className="filter__title">{ sort }</h6>
                { sort !== "По популярности" ? 
                    <Link to={ `/catalog/?${cancelLink()}` } className="filter__icon">
                        <img src={ crossIcon } alt={ 'cancel'} onClick={ () => onCancelSort() } />
                    </Link>
                :   
                    <img src={ listArrow } alt={ 'more'} />
                }
            </div>

            <ul className={ openedFilters === "sort" ? "filter__list active" : "filter__list" } style={{width: "100%"}}>
                { sorting.elements.map((item, i) => {
                    return (
                        
                            <li 
                                className={ sort === item ? "filter__list-el active" : "filter__list-el"} 
                                onClick={ () => onChangeSort(item, sorting.values[i]) }
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

export default Sorting;