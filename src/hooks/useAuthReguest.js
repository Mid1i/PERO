import {useEffect, useState} from "react";
import axios from "axios";


export default function useAuthRequest(url, data) {
    const [requestData, setRequestData] = useState({
        data: null,
        error: null,
        status: 'loading'
    });

    axios.post(url)
    
    return {requestData};
}
