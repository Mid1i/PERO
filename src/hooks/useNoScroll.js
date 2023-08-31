import {useEffect} from "react";


export default function useNoScroll(popups) {
    useEffect(() => {
        if (Array.isArray(popups)) {
            if (popups.includes(true)) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        } else {
            if (popups) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        }
    }, [popups]);
}