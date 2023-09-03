import ContentLoader from "react-content-loader";
import {useEffect, useState} from "react";

export default function LoadingCard() {
    const [width, setWidth] = useState(270);
    const [margin, setMargin] = useState(20);
    const [radius, setRadius] = useState(50);
    const [height, setHeight] = useState(380);
    const [textHeight, setTextHeight] = useState(20);
    const [buttonWidth, setButtonWidth] = useState(150);
    const [imageHeight, setImageHeight] = useState(280);


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
            setRadius(50);
            setWidth(260);
            setHeight(370);
            setMargin(20);
            setTextHeight(20);
            setButtonWidth(150);
            setImageHeight(280);
        } else if (window.innerWidth > 500) {
            setRadius(20);
            setWidth(180);
            setHeight(250);
            setMargin(10);
            setTextHeight(16);
            setButtonWidth(100);
            setImageHeight(190);
        } else {
            setRadius(10);
            setWidth(135);
            setHeight(185);
            setMargin(5);
            setTextHeight(14);
            setButtonWidth(70);
            setImageHeight(140);
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
                    <rect x="0" y="0" rx={radius} ry={radius} width={width} height={imageHeight}/> 
                    <rect x="1" y={imageHeight + margin} rx="8" ry="8" width={width} height={textHeight}/> 
                    <rect x={width / 2 - buttonWidth / 2} y={imageHeight + margin * 3 + 10} rx="10" ry="10" width={buttonWidth} height={textHeight}/>
                </ContentLoader>
            </div>
        ))
    );
}
