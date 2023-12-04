import {useEffect, useState} from "react";
import axios from "axios";

import {fetchCatalogProducts} from "@api";


export default function usePaginationRequest(isMale, search, ref) {
    const [page, setPage] = useState(0);
    const [requestData, setRequestData] = useState({
        amount: 0,
        data: [],
        error: null,
        status: 'loading'
    });

    const headers = !!localStorage.getItem("accessToken") ? {headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}} : {};


    useEffect(() => {
        setPage(0);
        fetchData(0, 'resetSneakers');
    }, [isMale, search]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (ref && requestData.data.length !== requestData.amount) {
            setRequestData({...requestData, status: 'fetching'});
            fetchData(page, 'moreSneakers');
        }
    }, [isMale, search, ref]); // eslint-disable-line react-hooks/exhaustive-deps
    

    const fetchData = (page, step) => {
        axios.get(fetchCatalogProducts(page, isMale, search), headers)
                .then(response => {
                    if (step === 'moreSneakers') {
                        setRequestData({amount: response.data.amount, data: [...requestData.data, ...response.data.page.content], error: null, status: 'complete'});
                    } else {
                        setRequestData({amount: response.data.amount, data: response.data.page.content, error: null, status: 'complete'});
                    }
                })
                .catch(error => setRequestData({amount: 0, data: [], error: error, status: 'error'}))

        setPage(page + 1);
    }


    return {requestData};
}