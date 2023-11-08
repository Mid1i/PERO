import {createContext} from "react";


const appContext = createContext({});
const authContext = createContext({});
const catalogContext = createContext({});

export { 
    appContext, 
    authContext,
    catalogContext, 
};