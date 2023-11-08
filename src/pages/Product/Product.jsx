import {useNavigate, useParams} from "react-router-dom";
import {TailSpin} from "react-loader-spinner";

import {fetchCurrentProduct, fetchRandomGenderProducts} from "@api";
import {useRequest, useScroll} from "@hooks";
import {isPWA} from "@utils/helpers";
import {
    AuthPopup,
    Error,
    Footer,
    Header, 
    SearchBar,
    SneakerSlider, 
    SneakerInfo 
} from "@components";

import "./Product.style.scss";


export default function Product() {
    const navigate = useNavigate();
    const params = useParams();

    const {data: currentItem, error, isError, isLoading} = useRequest(fetchCurrentProduct, ['currentItem', params.id]);
    useScroll();


    return (
        <>
            {!isPWA() && (
                <>
                    <Header/>
                    <SearchBar/>
                </>
            )}
            <div className="content">
                {(!isPWA() && !isLoading && !isError) && (
                    <div className="content__nav content__nav--product">
                        <span className="content__nav-text" onClick={() => navigate('/')}>Главная</span>
                        <svg className="content__nav-icon" width="5" height="8" viewBox="0 0 5 8">
                            <path d="M0.1912 0.176092C0.0687747 0.288878 1.23732e-07 0.441828 1.23732e-07 0.601308C1.23732e-07 0.760787 0.0687747 0.913737 0.1912 1.02652L3.42372 4.00363L0.1912 6.98074C0.0722443 7.09417 0.00642219 7.2461 0.00791007 7.40379C0.00939796 7.56149 0.0780767 7.71233 0.199154 7.82384C0.320232 7.93536 0.484021 7.99861 0.655245 7.99998C0.826468 8.00135 0.991425 7.94073 1.11459 7.83117L4.8088 4.42885C4.93123 4.31606 5 4.16311 5 4.00363C5 3.84415 4.93123 3.6912 4.8088 3.57842L1.11459 0.176092C0.992127 0.0633405 0.826055 0 0.652894 0C0.479733 0 0.313662 0.0633405 0.1912 0.176092Z" fill="#828282"/>
                        </svg>
                        <span className="content__nav-text" onClick={() => navigate('/catalog/')}>Каталог</span>
                        <svg className="content__nav-icon" width="5" height="8" viewBox="0 0 5 8">
                            <path d="M0.1912 0.176092C0.0687747 0.288878 1.23732e-07 0.441828 1.23732e-07 0.601308C1.23732e-07 0.760787 0.0687747 0.913737 0.1912 1.02652L3.42372 4.00363L0.1912 6.98074C0.0722443 7.09417 0.00642219 7.2461 0.00791007 7.40379C0.00939796 7.56149 0.0780767 7.71233 0.199154 7.82384C0.320232 7.93536 0.484021 7.99861 0.655245 7.99998C0.826468 8.00135 0.991425 7.94073 1.11459 7.83117L4.8088 4.42885C4.93123 4.31606 5 4.16311 5 4.00363C5 3.84415 4.93123 3.6912 4.8088 3.57842L1.11459 0.176092C0.992127 0.0633405 0.826055 0 0.652894 0C0.479733 0 0.313662 0.0633405 0.1912 0.176092Z" fill="#828282"/>
                        </svg>
                        <span className="content__nav-text" onClick={() => navigate(`/catalog/?isMale=${currentItem.male ? 'true' : 'false'}`)}>{currentItem.male ? 'Мужские кроссовки' : 'Женские кроссовки'}</span>
                        <svg className="content__nav-icon" width="5" height="8" viewBox="0 0 5 8">
                            <path d="M0.1912 0.176092C0.0687747 0.288878 1.23732e-07 0.441828 1.23732e-07 0.601308C1.23732e-07 0.760787 0.0687747 0.913737 0.1912 1.02652L3.42372 4.00363L0.1912 6.98074C0.0722443 7.09417 0.00642219 7.2461 0.00791007 7.40379C0.00939796 7.56149 0.0780767 7.71233 0.199154 7.82384C0.320232 7.93536 0.484021 7.99861 0.655245 7.99998C0.826468 8.00135 0.991425 7.94073 1.11459 7.83117L4.8088 4.42885C4.93123 4.31606 5 4.16311 5 4.00363C5 3.84415 4.93123 3.6912 4.8088 3.57842L1.11459 0.176092C0.992127 0.0633405 0.826055 0 0.652894 0C0.479733 0 0.313662 0.0633405 0.1912 0.176092Z" fill="#828282"/>
                        </svg>
                        <span className="content__nav-text" onClick={() => navigate(`/catalog/product/${currentItem.id}`)}>{currentItem.name}</span>
                    </div>
                )}
                {(isLoading || (!isError)) ? (isLoading) ? (
                    <div className="loader">
                        <TailSpin ariaLabel='loading' color="#E47F46" height={100} width={100}/>
                    </div>
                ) : (
                    <>
                        <SneakerInfo {...currentItem}/> 
                        <SneakerSlider id={currentItem.id} title='Похожие товары:' male={currentItem.male} func={fetchRandomGenderProducts}/>
                    </>
                ) : <Error status={error.response?.status || 404}/>}
            </div>
            {!isPWA() && <Footer/>}

            <AuthPopup/>
        </>
    );
}
