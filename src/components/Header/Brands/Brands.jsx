import {useNavigate} from "react-router-dom";

import {imageImport, toFormatBrandForRequest} from "@utils/helpers";
import {brands} from "@utils/constants";

import "./Brands.style.scss";


export default function Brands({className='brands'}) {
    const images = imageImport();
    const navigate = useNavigate();
 

    return (
        <div className={className}>
            {brands.map(({id, brand}) => (
                    <div 
                        className="brands__item" 
                        onClick={() => navigate(`/catalog/?brands=${toFormatBrandForRequest(brand)}`)} 
                        key={id}
                    >
                        <div className="brands__item-image">
                            <img src={images.filter(obj => obj.includes(brand))} alt={brand}/>
                        </div>
                        <p className="brands__item-name">{brand}</p>
                    </div>
                )
            )}
        </div>
    );
}
