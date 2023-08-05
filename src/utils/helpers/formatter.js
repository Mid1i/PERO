export const toFormatPrice = (price) => {
    return String(price).split('').reverse().join('')
                        .match(/\d{0,3}/g).join(' ')
                        .split('').reverse().join('');
}

export const toFormatBrand = (brand) => {
    return String(brand).toLowerCase().replace('_', ' ');
}

export const toFormatBrandForRequest = (brand) => {
    return String(brand).toUpperCase().replace('-', '_');
}

export const toFormatTitle = (title) => {
    return String(title).toUpperCase().replace('_', ' ');
}