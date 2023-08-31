export const toFormatBrand = (brand) => String(brand).toLowerCase().replace('_', ' ').replace('-', ' ');


export const toFormatBrandForRequest = (brand) => String(brand).toUpperCase().replace('-', '_');


export const toFormatPrice = (price) => String(price).split('').reverse().join('')
                                                     .match(/\d{0,3}/g).join(' ')
                                                     .split('').reverse().join('');

                                                     
export const toFormatTitle = (title) => String(title).toUpperCase().replace('_', ' ');

export const toFormatEmail = (email) => {
    const index = email.indexOf('@');
    return `${email.charAt(0)}${email.slice(index).replace(/./g, '*')}${email.slice(index)}`;
}

export const toFormatTime = (time) => {
    if (time > 60 && time - 60 < 10) {
        return `1:0${time - 60}s`;
    } else if (time > 60) {
        return `1:${time - 60}s`;
    } else if (time > 0) {
        return `${time}s`
    } else {
        return ''
    }
}
