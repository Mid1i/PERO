import {Routes, Route} from "react-router-dom";

import {About, Account, AuthEmail, Catalog, Cart, Contacts, NotFound, Home, Product, Shops} from "@pages";


export default function Routers() {
    const routers = [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/catalog/:filters?',
            element: <Catalog/>
        },
        {
            path: '/catalog/product/:id',
            element: <Product/>
        },
        {
            path: '/auth/verify/:uuid',
            element: <AuthEmail/>
        },
        {
            path: '/customer/account',
            element: <Account/>
        },
        {
            path: '/cart',
            element: <Cart/>
        },
        {
            path: '/about',
            element: <About/>
        },
        {
            path: '/contacts',
            element: <Contacts/>
        },
        {
            path: '/shops',
            element: <Shops/>
        },
        {
            path: '*',
            element: <NotFound/>
        },
    ]


    return (
        <Routes>
            {routers.map(({path, element}, index) => (
                <Route path={path} element={element} key={index}></Route>
            ))}
        </Routes>
    );
}