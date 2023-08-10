export const toFormatBrand = (brand) => String(brand).toLowerCase().replace('_', ' ');


export const toFormatBrandForRequest = (brand) => String(brand).toUpperCase().replace('-', '_');


export const toFormatPrice = (price) => String(price).split('').reverse().join('')
                                                     .match(/\d{0,3}/g).join(' ')
                                                     .split('').reverse().join('');

                                                     
export const toFormatTitle = (title) => String(title).toUpperCase().replace('_', ' ');
