import {createContext} from "react";


const appContext = createContext({});
const authContext = createContext({});
const adminContext = createContext({});
const catalogContext = createContext({});

export { 
    appContext, 
    authContext,
    adminContext,
    catalogContext, 
};