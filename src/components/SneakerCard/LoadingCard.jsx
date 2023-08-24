import ContentLoader from "react-content-loader";
import {useEffect, useState} from "react";

export default function LoadingCard() {
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(404);


    useEffect(() => {
        if (window.innerWidth > 767) {
            setWidth(300);
            setHeight(405);
        } else if (window.innerWidth > 400) {
            setWidth(240);
            setHeight(325);
        } else {
            setWidth(180);
            setHeight(250);
        }
    }, [])


    return (
        [...Array(12)].map((item, index) => (
            <div className="goods-item" key={index}>
                <ContentLoader 
                    speed={2}
                    width={width}
                    height={height}
                    backgroundColor="#FFFFFF"
                    foregroundColor="#ECEBEB"
                >
                    <rect x="0" y="0" rx="10" ry="10" width={width} height={height - 80}/> 
                    <rect x="0" y={height - 65} rx="10" ry="10" width={width} height="20"/> 
                    <rect x={width / 2 - 75} y={height - 25} ry="10" width="150" height="24"/>
                </ContentLoader>
            </div>
        ))
    );
}
