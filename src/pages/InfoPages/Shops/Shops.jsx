import {useEffect} from "react";

import {useScroll} from "@hooks";
import {
    AuthPopup,
    Header,
    LeftNavPanel,
    SearchBar,
    Footer,
} from "@components";

import "../InfoPages.style.scss";
import "./Shops.style.scss";


export default function Shops() {
    useScroll();

    useEffect(() => {document.title = 'Магазины сети фирменныз магазинов PERO';}, []);


    return (
        <>
            <Header/>
            <SearchBar />
            <div className="content content--shops">
                <div className="shops">
                    <LeftNavPanel />
                    <div className="shops__right">
                        <h2 className="shops__right-title">Магазины PERO в Нижнем Новгороде</h2>
                        <iframe 
                            className="shops__right-map"
                            title="Our Shops"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=44.02394950389862%2C56.32594440925462%2C44.02736127376557%2C56.327287325541135&amp;layer=mapnik&amp;marker=56.326615129717304%2C44.02565538883209"
                        ></iframe>
                        <h6 className="shops__right-subtitle">PERO - пункт выдачи интернет-заказов</h6>
                        <p className="shops__right-info">ул. Минина, 24к1, 1 этаж</p>
                        <p className="shops__right-info">ежедневно, 10.00 - 20.00</p>
                    </div>
                </div>
            </div>
            <Footer />

            <AuthPopup/>
        </>
    )
}