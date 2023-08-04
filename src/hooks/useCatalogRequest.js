import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


export default function useCatalogRequest(params) {
    const [itemsAmount, setItemsAmount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const [colors, setColors] = useState([]);
    const [colorsLoading, setColorsLoading] = useState(true);

    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(0);

    const { search } = useLocation();

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
 
        return function() {
            window.removeEventListener('scroll', scrollHandler);
        }
    })

    useEffect(() => {
        if (fetching) {
            axios.get(`https://java.pero-nn.ru/api/public/get_sneakers?page=${page}&size=5${search.replace("?", "&")}`)
                 .then(response => {
                    setData(prev => [...prev, ...response.data.page.content]);
                    setItemsAmount(response.data.amount);
                    setPage(prev => prev + 1);
                 })
                 .finally(() => {
                    setLoading(false);
                    setFetching(false);
                 })
        }
    }, [fetching]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setLoading(true);
        setPage(1);

        axios.get("https://java.pero-nn.ru/api/public/get_colors")
                 .then(response => setColors(response.data))
                 .finally(() => setColorsLoading(false));

        axios.get(`https://java.pero-nn.ru/api/public/get_sneakers?page=0&size=5${search.replace("?", "&")}`).then(response => {
                        setData(response.data.page.content);
                        setItemsAmount(response.data.amount);
                    })
                    .finally(() => {
                        setLoading(false)
                        setFetching(false);
                    })
 
        
    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps

    function scrollHandler(event) {
        if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 100 & data.length < itemsAmount) {
            setFetching(true);
        }
    }

    return [ data, loading, itemsAmount, colors, colorsLoading ];
}