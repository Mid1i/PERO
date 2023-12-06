import {useEffect, useContext, useReducer, useState} from "react";
import {TailSpin} from "react-loader-spinner";
import {useLocation} from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

import {AdminSneakersTable, AdminNavBar, Error} from "@components";
import {fetchColors, fetchCounters, fetchSneakers} from "@api";
import {useNoScroll, useUserRequest} from "@hooks";
import {adminContext, appContext} from "@services";
import {onHandleError} from "@utils/helpers";

import "./AdminSneakers.style.scss";


export default function AdminSneakers() {
    const {isRegisteredUser, searchValue, setErrorPopup} = useContext(appContext);
    const [creatingPopup, setCreatingPopup] = useReducer(prev => !prev, false);
    const [sortingValues, setSortingValues] = useState({});
    const [filterValues, setFilterValues] = useState({});
    const [statystics, setStatystics] = useState({});
    const [requestData, setRequestData] = useState({
        data: null,
        error: null,
        status: 'loading'
    });

    const {requestData: {data: colors, status: statusColors}} = useUserRequest(fetchColors, localStorage.getItem('accessToken'), isRegisteredUser, setErrorPopup);
    const {requestData: {amount: totalAmount, data: totalData, status: totalStatus}} = useUserRequest(fetchSneakers(''), localStorage.getItem('accessToken'), isRegisteredUser, setErrorPopup);
    const {requestData: {data: activeAmount, status: activeStatus}} = useUserRequest(fetchCounters('?isActive=true'), localStorage.getItem('accessToken'), isRegisteredUser, setErrorPopup);
    const {requestData: {data: popularAmount, status: popularStatus}} = useUserRequest(fetchCounters('?isPopular=true'), localStorage.getItem('accessToken'), isRegisteredUser, setErrorPopup);
    
    const {search} = useLocation();

    useNoScroll(creatingPopup);
    

    useEffect(() => {
        setFilterValues({...filterValues, 'search': queryString.parse(search).search});
        onFormLink();
    }, [search]) // eslint-disable-line react-hooks/exhaustive-deps
  
    useEffect(() => {
        if ([activeStatus, popularStatus, totalStatus].every(item => item === 'complete')) {
            setStatystics({'activeAmount': activeAmount, 'popularAmount': popularAmount, 'totalAmount': totalAmount});
            setRequestData({...requestData, data: totalData, status: 'complete'});
        } else if ([activeStatus, popularStatus, totalStatus].includes('loading')) {
            setRequestData({...requestData, status: "loading"});
        } else {
            setRequestData({...requestData, error: 404, status: "error"});
        }
    }, [activeStatus, popularStatus, totalStatus]); // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {if (Object.keys(sortingValues).length !== 0) onFormLink()}, [sortingValues]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {setFilterValues({...filterValues, 'search': searchValue})}, [searchValue]) // eslint-disable-line react-hooks/exhaustive-deps

    
    const onFormLink = (step = '') => {
        setRequestData({...requestData, status: "loading"});
        let url = '';

        for (let id in sortingValues) {
            if (sortingValues[id]) url += `&sort=${sortingValues[id]}`;
        }

        if (step !== 'cancel') url += onFormFiltersLink();
        
        axios.get(fetchSneakers(url), {headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}})
             .then(response => setRequestData({data: response.data.page.content, status: "complete"}))
             .catch(error => {
                 onHandleError(error, () => onFormLink(step), setErrorPopup);
                 setRequestData({data: null, error: error, status: "error"});
             })
    }

    const onFormFiltersLink = () => {
        let url = '';

        for (let id in filterValues) {
            if (filterValues[id] !== '') {
                url += `&${id}=${filterValues[id]}`;
            }
        }

        return url;
    }

    
    const contextData = {
        colors,
        creatingPopup,
        filterValues, 
        onFormLink,
        onFormFiltersLink,
        setCreatingPopup,
        setErrorPopup,
        statusColors,
        sortingValues, 
        setFilterValues, 
        setSortingValues
    }
    

    return (
        <adminContext.Provider value={contextData}>
            {requestData.status !== 'error' ? 
                requestData.status === 'loading' ? (
                    <div className="loader">
                        <TailSpin ariaLabel='loading' color="#E47F46" height={100} width={100}/>
                    </div>
                ) : (
                    <div className="admin">
                        <AdminNavBar activePage='sneakers'/>
                        <AdminSneakersTable totalAmount={statystics.totalAmount} popularAmount={statystics.popularAmount} activeAmount={statystics.activeAmount} sneakers={requestData.data}/>
                    </div>
            ) : <Error status={requestData.error?.response?.status || 502}/>}
        </adminContext.Provider>
    );
}