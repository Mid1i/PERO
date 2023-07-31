import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function ScrollToTop() {
    const params = useParams(); 
    const { pathName } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathName, params.id]);
}