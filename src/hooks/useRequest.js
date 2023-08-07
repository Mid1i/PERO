import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function useRequest(request, requestParams) {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    

    const params = useParams();

    function responseHandler(response) {
        switch (requestParams) {
            case "items":
                setData(response.data.page.content);
                break;
            case "item":
                setData(response.data);
                break;
            case "popular-items":
                setData(response.data.page.content);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setLoading(true);

        request().then(response => responseHandler(response))
                 .catch(error => setError(error))
                 .finally(() => setLoading(false))

    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps


    return [ data, loading, error ];
}