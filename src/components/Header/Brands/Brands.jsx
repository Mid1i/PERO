import { Link } from "react-router-dom";

import { imageImport, toFormatBrandForRequest } from "@utils/helpers";
import { brands } from "@utils/constants";

import "./Brands.styles.scss";

function Brands({ className="brands" }) {
    const images = imageImport();


    return (
        <div className={ className }>
            { brands.map((item, i) => {
                return (
                    <Link to={ `/catalog/?brands=${toFormatBrandForRequest(item)}` } key={ i } >
                        <div className="brands__item">
                            <div className="brands__item-image">
                                <img src={ images.filter(obj => obj.includes(item)) } alt={ item } width={ 65 } height={ 65 } />
                            </div>
                            <p className="brands__item-name">{ item }</p>
                        </div>
                    </Link>
                )
            }) }
        </div>
    )
}

export default Brands;