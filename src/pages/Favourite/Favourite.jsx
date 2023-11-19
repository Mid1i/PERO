import {useContext, useEffect, useState} from "react";
import axios from "axios";

import {fetchFavouriteOpenProducts, fetchFavouriteProducts} from "@api";
import {useUserRequest} from "@hooks";
import {appContext} from "@services";
import {
    AuthPopup, 
    Error,
    ErrorPopup,
    EmptyContent, 
    Footer, 
    Header, 
    LoadingCard,
    PageUp,
    SearchBar,
    SneakerCard
} from "@components";

import "./Favourite.style.scss";


export default function Favourite() {
    const {favouriteItems, isRegisteredUser, setErrorPopup, setFavouriteItems} = useContext(appContext);
    const [requestData, setRequestData] = useState({
        data: null,
        error: null,
        status: 'loading'
    });

    const {requestData: {data: favouriteData, status: favouriteStatus}} = useUserRequest(fetchFavouriteProducts, localStorage.getItem('accessToken'), isRegisteredUser, setErrorPopup); 
    
    
    useEffect(() => {
        document.title = 'Избранное';

        if (!isRegisteredUser && favouriteItems.length !== 0) {
            axios.get(fetchFavouriteOpenProducts(favouriteItems))
                 .then(response => setRequestData({data: response.data.content.filter(item => item.active), error: null, status: 'success'}))
                 .catch(error => setRequestData({data: null, error: error, status: 'error'}))
        }
    }, [favouriteItems]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (favouriteStatus === 'complete') setFavouriteItems(favouriteData.filter(item => item.active));
    }, [favouriteStatus]) // eslint-disable-line react-hooks/exhaustive-deps

    
    return (
        <>
            <Header/>
            <SearchBar/>
            <div className="content">
                {(requestData.status !== 'error' || isRegisteredUser) ? (
                    <>
                        <h1 className="content__title">{favouriteItems.length !== 0 ? 'Избранное' : ''}</h1>
                        <div className="content__favourite-items">
                            {(requestData.status === 'loading' && !isRegisteredUser && favouriteItems.length !== 0) ? <LoadingCard page='catalog'/> : (
                                favouriteItems.length === 0 ? (
                                    <EmptyContent title='Используйте' text='Добавьте товары в избранное, чтобы купить их позже.' svg={true}/>
                                ) : (
                                    !isRegisteredUser ? (
                                        requestData.data.map(item => (
                                            <SneakerCard 
                                                key={item.id} 
                                                {...item}
                                                page='catalog'
                                            />
                                        ))
                                    ) : (
                                        favouriteItems.map((item) => (
                                            <SneakerCard 
                                                key={item.id} 
                                                {...item}
                                                page='catalog'
                                            />
                                        ))
                                    )
                                )
                            )}
                        </div>
                    </>
                ) : <Error status={requestData.error?.response?.status || 502}/>}
            </div>
            <Footer activePage='favourite'/>

            <PageUp/>
            <AuthPopup/>
            <ErrorPopup/>
        </>
    );
}