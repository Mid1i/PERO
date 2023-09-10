import {
    Error,
    Footer,
    HeaderTop,
    SearchBar,
    SignPopup
} from "@components";

import "./NotFound.style.scss";


export default function NotFound() {
    return (
        <>
            <HeaderTop />
            <SearchBar />
            <div className="content">
                <Error status={404}/>
            </div>
            <Footer />

            <SignPopup />
        </>
    );
}