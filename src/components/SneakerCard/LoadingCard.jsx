import ContentLoader from "react-content-loader";
import {useEffect, useState} from "react";

export default function LoadingCard() {
    const [width, setWidth] = useState(225);
    const [height, setHeight] = useState(325);
    const [radius, setRadius] = useState(50);
    const [margin, setMargin] = useState(60);
    const [imageSize, setImageSize] = useState(205);
    const [textHeight, setTextHeight] = useState(24);


    useEffect(() => {
        window.addEventListener('resize', resizeHandler);

        return function() {
            window.removeEventListener('resize', resizeHandler);
        }
    })

    useEffect(() => {
        resizeHandler();
    }, [])

    const resizeHandler = () => {
        if (window.innerWidth > 767) {
            setHeight(325);
            setWidth(225);
            setMargin(60);
            setImageSize(205);
            setTextHeight(24);
        } else if (window.innerWidth > 500) {
            setHeight(280);
            setWidth(200);
            setRadius(50);
            setMargin(40);
            setImageSize(190);
            setTextHeight(18);
        } else {
            setHeight(210);
            setWidth(150);
            setRadius(30);
            setMargin(30);
            setImageSize(140);
            setTextHeight(14);
        }
    }


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
                    <rect x="0" y="0" rx={radius} ry={radius} height={imageSize} width={imageSize}/>
                    <rect x="0" y={imageSize + 5} rx="5" ry="5" height={textHeight} width={imageSize}/> 
                    <rect x={imageSize / 2 - imageSize / 4} y={imageSize + 5 + textHeight + margin} rx="5" ry="5" height={textHeight + 2} width={width / 2}/> 
                </ContentLoader>
            </div>
        ))
    );
}
