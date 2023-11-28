import {useState} from "react";

import {AdminSneakersTable, AdminNavBar} from "@components";
import {adminContext} from "@services";
import {useRequest} from "@hooks";
import {fetchColors} from "@api";

import "./AdminSneakers.style.scss";


export default function AdminSneakers() {
    const [sortingValues, setSortingValues] = useState({});
    const [filterValues, setFilterValues] = useState({});

    const {requestData: {data: colors, status: statusColors}} = useRequest(fetchColors);


    const onFormLink = () => {
        let url = '';

        for (let id in filterValues) {
            if (filterValues[id] !== '') {
                url += `${id}=${filterValues[id]}&`;
            }
        }

        if (url === '') {
            return url;
        } else {
            return `?${url.slice(0, -1)}`;
        }
    }


    const contextData = {
        colors,
        filterValues, 
        onFormLink,
        statusColors,
        sortingValues, 
        setFilterValues, 
        setSortingValues
    }


    return (
        <adminContext.Provider value={contextData}>
            <div className="admin">
                <AdminNavBar activePage='sneakers'/>
                <AdminSneakersTable totalAmount={12} popularAmount={6} activeAmount={6}/>
            </div>
        </adminContext.Provider>
    );
}