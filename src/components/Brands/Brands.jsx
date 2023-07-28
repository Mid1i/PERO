import "./Brands.styles.scss";

function Brands() {
    const importAll = image => image.keys().map(image);

    const brands = ["nike", "adidas", "puma", "new-balance", "vans", "reebok", "jordan", "converse"];
    const images = importAll(require.context('@assets/images/brands/', false, /\.svg$/));

    return (
        <div className="brands">
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