import {useParams} from "react-router-dom";
import classNames from "classnames";
import Slider from "react-slick";

import {LoadingCard, SneakerCard} from "@components";
import {settings} from "@utils/constants";
import {fetchRandomProducts} from "@api";
import {isPWA} from "@utils/helpers";
import {useRequest} from "@hooks";

import "./SneakerSlider.style.scss";


export default function SneakerSlider({id = -1, title, male}) {
    const params = useParams();
    const {requestData: {data, status}} = useRequest(fetchRandomProducts(male), params.id);


    return (
        status === 'complete' && (
            <div className={classNames("content__similar-goods similar-goods", isPWA() && "mobile")}>
                <h4 className="similar-goods__title">{(data) && title}</h4>
                {data.length > 5 ? (
                    <Slider {...settings} className="similar-goods__slider">
                        {status === 'loading' ? <LoadingCard /> : (
                            data.length !== 0 && (
                                data.filter(item => item.id !== id).map((item) => <SneakerCard {...item} key={item.id}/>
                            ))
                        )}
                    </Slider>
                ) : (
                    <div className="similar-goods__scroll">
                        {status === 'loading' ? <LoadingCard /> : (
                            data.length !== 0 && (
                                data.filter(item => item.id !== id).map((item) => <SneakerCard {...item} key={item.id}/>
                            ))
                        )}
                    </div>
                )}
            </div>
        )
    );
}