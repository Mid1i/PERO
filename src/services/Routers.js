import {Routes, Route} from "react-router-dom";

import {About, Account, AuthEmail, Catalog, Cart, Contacts, NotFound, Home, Product, Shops} from "@pages";


export default function Routers() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/catalog/:filters?' element={<Catalog/>}></Route>
            <Route path='/contacts' element={<Contacts/>}></Route>
            <Route path='/shops' element={<Shops/>}></Route>
            <Route path='/catalog/product/:id' element={<Product/>}></Route>
            <Route path='/auth/verify/:uuid' element={<AuthEmail/>}></Route>
            <Route path='/customer/account' element={<Account/>}></Route>
            <Route path='*' element={<NotFound/>}></Route>
        </Routes>
    );
}