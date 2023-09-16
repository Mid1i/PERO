import {
    Footer, 
    LeftNavPanel,
    HeaderTop, 
    SearchBar, 
    SignPopup
} from "@components";

import "./About.style.scss";

import banner from "@assets/images/content-images/info-banner.jpg";


export default function About() {
    return (
        <>
            <HeaderTop />
            <SearchBar />
            <div className="content content--about">
                <img className="content__banner" src={banner} alt="banner"/>
                <div className="about">
                    <LeftNavPanel />
                </div>
            </div>
            <Footer />

            <SignPopup />
        </>
    );
}