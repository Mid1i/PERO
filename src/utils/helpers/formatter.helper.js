export const toFormat = (str) => {
    return (
        String(str).split('').reverse().join('')
                   .match(/\d{0,3}/g).join(' ')
                   .split('').reverse().join('')
    )
}