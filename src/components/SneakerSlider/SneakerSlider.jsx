import useDraggableScroll from "use-draggable-scroll";
import {useParams} from "react-router-dom";
import classNames from "classnames";
import {useRef} from "react";

import {LoadingCard, SneakerCard} from "@components";
import {useRequest} from "@hooks";

import "./SneakerSlider.style.scss";


export default function SneakerSlider({id = -1, title, mobileDevice = true, male, func}) {
    const params = useParams();
    const slider = useRef(null);

    const {data: items, isError: isErrorItems, isLoading: isLoadingItems} = useRequest(func, ['items', params.id, male])

    const {onMouseDown} = useDraggableScroll(slider);


    return (
        !isErrorItems && (
            <div className={classNames("extra-goods", mobileDevice && "extra-goods--mobile")}>
                <h4 className="extra-goods__title">{(!isLoadingItems && items?.length !== 0) && title}</h4>
                <div className="extra-goods__slider" ref={slider} onMouseDown={onMouseDown}>
                    {isLoadingItems ? (
                        <LoadingCard />
                    ) : (items.length !== 0) && (
                        items.filter(item => item.id !== id).map((item) => (
                            <SneakerCard 
                                {...item} 
                                key={item.id} 
                            />)
                        )
                    )}
                </div>
            </div>
        )
    );
}