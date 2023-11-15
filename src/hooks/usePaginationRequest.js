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


    useEffect(() => {
        setRequestData({amount: -1, data: [], error: null, status: 'complete'});
        setPage(0);
    }, [isMale, search]); // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        if (ref && requestData.data.length !== requestData.amount) {
            setRequestData({...requestData, status: 'fetching'});

            axios.get(fetchCatalogProducts(page, isMale, search))
                 .then(response => setRequestData({amount: response.data.amount, data: [...requestData.data, ...response.data.page.content], error: null, status: 'complete'}))
                 .catch(error => setRequestData({amount: 0, data: [], error: error, status: 'error'}))

            setPage(prev => prev + 1);
        }
    }, [ref]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return {requestData};
}