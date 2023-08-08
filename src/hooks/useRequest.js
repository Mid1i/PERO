import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function useRequest(request, requestParams) {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    

    const params = useParams();

    function responseHandler(response) {
        if (requestParams === "items") {
            setData(response.data.page.content);
        } else {
            setData(response.data);
        }
    }

    useEffect(() => {
        setLoading(true);

        request().then(response => responseHandler(response))
                 .catch(error => setError(error))
                 .finally(() => setLoading(false))

    }, [params.id]) // eslint-disable-line react-hooks/exhaustive-deps


    return [ data, loading, error ];
}