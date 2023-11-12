export const onRemoveFromArray = (arrayName, array, id) => localStorage.setItem(arrayName, JSON.stringify(array.filter(obj => Number(obj) !== Number(id))));


export const onAddToArray = (arrayName, array, id, amount) => {
    if (arrayName === 'favourite') {
        localStorage.setItem(arrayName, JSON.stringify([...array, id]));
    } else {
        localStorage.setItem(arrayName, JSON.stringify([...array.filter(obj => obj.id !== id), {id: id, amount: amount}]));
    }
}


export const onCreateArray = (arrayName) => {
    const array = JSON.parse(localStorage.getItem(arrayName));
    
    if (Array.isArray(array)) {
        return array;
    } else {
        return [];
    }
}