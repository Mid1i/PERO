export const validatePriceInput = (price) => {
    if (price.match(/^\d+$/) && price >= 3000 && price <= 50000) {
        return true;
    }

    return false;
}