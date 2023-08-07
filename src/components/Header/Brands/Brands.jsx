import { useNavigate } from "react-router-dom";

import { imageImport, toFormatBrandForRequest } from "@utils/helpers";
import { brands } from "@utils/constants";

import "./Brands.styles.scss";

function Brands({ className="brands" }) {
    const images = imageImport();
    const navigate = useNavigate();


    return (
        <div className={ className }>
            { brands.map((item, i) => <div className="brands__item" onClick={ () => navigate(`/catalog/?brands=${toFormatBrandForRequest(item)}`) } key={ i }>
                                            <div className="brands__item-image">
                                                <img src={ images.filter(obj => obj.includes(item)) } alt={ item } width={ 65 } height={ 65 } />
                                            </div>
                                            <p className="brands__item-name">{ item }</p>
                                      </div>) 
            }
        </div>
    )
}

export default Brands;