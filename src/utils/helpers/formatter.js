export const toFormatPrice = (price) => {
    return String(price).split('').reverse().join('')
                        .match(/\d{0,3}/g).join(' ')
                        .split('').reverse().join('')
}

export const toFormatBrand = (brand) => {
    return String(brand).toLowerCase().replace('_', ' ')
}