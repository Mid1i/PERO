import {TailSpin} from "react-loader-spinner";
import {useEffect, useState} from "react";
import axios from "axios";

import {AdminSneakersTable, AdminNavBar, Error} from "@components";
import {fetchColors, fetchSneakers} from "@api";
import {adminContext} from "@services";
import {useRequest} from "@hooks";

import "./AdminSneakers.style.scss";


export default function AdminSneakers() {
    const [sortingValues, setSortingValues] = useState({});
    const [filterValues, setFilterValues] = useState({});
    const [statystics, setStatystics] = useState({});
    const [requestData, setRequestData] = useState({
        data: null,
        error: null,
        status: 'loading'
    });

    const {requestData: {data: colors, status: statusColors}} = useRequest(fetchColors);
    const {requestData: {amount: activeAmount, status: activeStatus}} = useRequest(fetchSneakers('&isActive=true'));
    const {requestData: {amount: popularAmount, status: popularStatus}} = useRequest(fetchSneakers('&isPopular=true'));
    const {requestData: {amount: totalAmount, data: totalData, status: totalStatus}} = useRequest(fetchSneakers(''));


    useEffect(() => {
        if (activeStatus === "complete" && popularStatus === "complete" && totalStatus === "complete") {
            setStatystics({totalAmount: totalAmount, activeAmount: activeAmount, popularAmount: popularAmount});
            setRequestData({...requestData, data: totalData, status: "complete"});
        } else if ([activeStatus, popularStatus, totalStatus].includes('loading')) {
            setRequestData({...requestData, status: "loading"});
        } else {
            setRequestData({...requestData, error: 502, status: "error"});
        }
    }, [activeStatus, popularStatus, totalStatus]); // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {if (Object.keys(sortingValues).length !== 0) onFormLink()}, [sortingValues]) // eslint-disable-line react-hooks/exhaustive-deps

    const onFormLink = (step = '') => {
        setRequestData({...requestData, status: "loading"});
        let url = '';

        for (let id in sortingValues) {
            if (sortingValues[id]) url += `&sort=${sortingValues[id]}`;
        }

        if (step !== 'cancel') url += onFormFiltersLink();
        
        axios.get(fetchSneakers(url), {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
             .then(response => setRequestData({data: response.data.page.content, status: "complete"}))
             .catch(error => setRequestData({data: null, error: error, status: "error"}))
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
        filterValues, 
        onFormLink,
        onFormFiltersLink,
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