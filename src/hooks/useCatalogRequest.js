import {useContext, useEffect, useState} from "react";
import axios from "axios";

import {appContext} from "@services/Context";


export default function useCatalogRequest(search) {
    const [data, setData] = useState([]);
    const [itemsAmount, setItemsAmount] = useState(0);
    const [itemsError, setItemsError] = useState('');
    const [loading, setLoading] = useState(false);

    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(0);

    const {isMale} = useContext(appContext);


    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
 
        return function() {
            window.removeEventListener('scroll', scrollHandler);
        }
    })
    
    useEffect(() => {
        if (fetching && !itemsError) {
            axios.get(`https://java.pero-nn.ru/api/public/get_sneakers?page=${page}&size=5&isMale=${isMale}${search.replace('?', '&')}`)
                 .then(response => {
                    setData(prev => [...prev, ...response.data.page.content]);
                    setItemsAmount(response.data.amount);
                    setPage(prev => prev + 1);
                 })
                 .catch(error => setItemsError(error))
                 .finally(() => {
                    setLoading(false);
                    setFetching(false);
                 })
        }
    }, [fetching]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setLoading(true);
        setPage(1);

        axios.get(`https://java.pero-nn.ru/api/public/get_sneakers?page=0&size=5&isMale=${isMale}${search.replace('?', '&')}`)
             .then(response => {
                setData(response.data.page.content);
                setItemsAmount(response.data.amount);
             })
             .catch(error => setItemsError(error))
             .finally(() => {
                setLoading(false);
                setFetching(false);
             });
    }, [search, isMale]) // eslint-disable-line react-hooks/exhaustive-deps

    
    const scrollHandler = () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 200 && data.length < itemsAmount && !fetching) {
            setFetching(true);
        }
    }


    return [data, loading, itemsAmount, fetching, itemsError];
}