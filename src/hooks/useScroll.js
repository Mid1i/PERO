import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";


export default function useScroll() {
    const params = useParams(); 
    const { pathName } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathName, params.id]);
}