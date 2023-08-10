import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


export default function useRequest(request, requestParams) {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    const params = useParams();


    useEffect(() => {
        request().then(response => responseHandler(response))
                 .catch(error => setError(error))
                 .finally(() => setLoading(false))

    }, [params.id]) // eslint-disable-line react-hooks/exhaustive-deps


    const responseHandler = (response) => requestParams === 'items' ? setData(response.data.page.content) : setData(response.data);

    
    return [data, error, loading];
}