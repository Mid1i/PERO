import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

import {catalogContext} from "@services/Context";
import {sortingData} from "@utils/constants";

import "./Sorting.style.scss";


export default function Sorting() {
    const {onFormLink, link, params, isOpenSort, setIsOpenSort, setLink} = useContext(catalogContext); 
    const [currentSorting, setCurrentSorting] = useState('');
    const navigate = useNavigate();

    useEffect(() => {if (sortingData.values.includes(params?.['sort'])) setCurrentSorting(params['sort'])}, [params])


    const onChangeSort = (element) => {
        setCurrentSorting(element);
        setLink({...link, 'sort': element});
        navigate(`/catalog/${onFormLink({...link, 'sort': element})}`);
    }


    return (
        <div className="content__filters-sorting sorting" onClick={() => setIsOpenSort(prev => !prev)}>
            <h6 className="sorting__title">{sortingData.elements[sortingData.values.indexOf(currentSorting)]}</h6>
            <svg 
                className={classNames("sorting__icon", isOpenSort && "active")} 
                height="11" 
                viewBox="0 0 16 11" 
                width="16"
            >
                <path d="M14.7636 0H7.64397H1.23282C0.135733 0 -0.412812 1.66961 0.364293 2.64836L6.28404 10.104C7.23256 11.2987 8.77535 11.2987 9.72387 10.104L11.9752 7.26857L15.6436 2.64836C16.4093 1.66961 15.8607 0 14.7636 0Z" fill="black"/>
            </svg>
            <ul className={classNames("sorting__list sort-list", isOpenSort && "active")}>
                {sortingData.values.map((value, index) => (
                        <li 
                            key={index} 
                            className="sort-list__el" 
                            onClick={() => onChangeSort(value)}
                        >
                            {currentSorting === value ? (
                                <svg className="sort-list__el-icon" fill="none" height="16" viewBox="0 0 16 16" width="16">
                                    <circle cx="8" cy="8" r="7.5" stroke="#1F1F21"/>
                                    <circle cx="7.99999" cy="7.99999" r="4.44444" fill="#1F1F21"/>
                                </svg>
                            ) : (
                                <svg className="sort-list__el-icon" fill="none" height="16" viewBox="0 0 16 16" width="16">
                                    <circle cx="8" cy="8" r="7.5" stroke="#1F1F21"/>
                                </svg>
                            )}
                            <p className="sort-list__el-text">{sortingData.elements[index]}</p>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}
