import {useNavigate} from "react-router-dom";
import {useContext} from "react";

import {appContext} from "@services/Context";

import "./SearchBar.style.scss";


export default function SearchBar({className='search-bar', onCancel=false}) {
    const {searchValue, setSearchValue} = useContext(appContext);

    const navigate = useNavigate();

    
    const onHandleKeyDown = (event) => event.key === 'Enter' && navigate(`/catalog/?search=${searchValue}`);

    const onSearch = (event) => setSearchValue(event.target.value);

    const onCancelFilters = () => {
        onCancel && navigate('/catalog/');
        setSearchValue('');
    }

    
    return (
        <div className={className}>
            <input 
                className="search-bar__input" 
                type="text" 
                inputMode="search" 
                placeholder="Что Вы ищете?" 
                value={searchValue} 
                onChange={onSearch} 
                onKeyDown={onHandleKeyDown} 
            />
            <div className="search-bar__icons">
                <svg width="20" height="20" fill="none" onClick={() => navigate(`/catalog/?search=${searchValue}`)}>
                    <path fill="#fff" d="m18.444 20-7-7a6.774 6.774 0 0 1-4.222 1.444c-2.018 0-3.726-.699-5.124-2.097C.7 10.948 0 9.24 0 7.222s.7-3.726 2.098-5.124C3.496.7 5.204 0 7.222 0c2.019 0 3.727.7 5.125 2.098 1.397 1.398 2.097 3.106 2.097 5.124A6.774 6.774 0 0 1 13 11.444l7 7L18.444 20ZM7.222 12.222c1.39 0 2.57-.486 3.542-1.459.973-.972 1.459-2.153 1.458-3.54 0-1.39-.486-2.57-1.459-3.543-.972-.973-2.153-1.459-3.54-1.458-1.39 0-2.57.487-3.543 1.46-.973.972-1.459 2.152-1.458 3.54 0 1.39.487 2.57 1.46 3.542.972.973 2.152 1.459 3.54 1.458Z"/>
                </svg>
                <svg width="20" height="20" fill="none" onClick={() => onCancelFilters()}>
                    <path fill="#fff" d="m18.186 20-8.18-8.188L1.826 20 0 18.175 8.193 10 0 1.825 1.826 0l8.18 8.188 8.18-8.175L20 1.825 11.82 10 20 18.175 18.186 20Z"/>
                </svg>
            </div>
        </div>
    );
}
