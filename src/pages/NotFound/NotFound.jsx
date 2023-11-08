import {
    AuthPopup,
    Error,
    Footer,
    Header,
    SearchBar,
} from "@components";

import "./NotFound.style.scss";


export default function NotFound() {
    return (
        <>
            <Header/>
            <SearchBar/>
            <div className="content">
                <Error status={404}/>
            </div>
            <Footer/>

            <AuthPopup/>
        </>
    );
}