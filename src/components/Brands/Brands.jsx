import { imageImport } from "@utils/helpers/imageImport.helper";
import { brands } from "@utils/constants/brands.constants";

import "./Brands.styles.scss";

function Brands({ className="brands" }) {
    const images = imageImport();

    return (
        <div className={ className }>
            { brands.map((item, i) => {
                return (
                    <div className="brands__item" key={ i } >
                        <div className="brands__item-image">
                            <img src={ images.filter(obj => obj.includes(item)) } alt={ item } width={ 65 } height={ 65 } />
                        </div>
                        <p className="brands__item-name">{ item }</p>
                    </div>
                )
            }) }
        </div>
    )
}

export default Brands;