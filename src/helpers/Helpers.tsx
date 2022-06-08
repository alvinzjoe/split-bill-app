export const getKeyByValue = (object: any, value: any): any => {
    return Object.keys(object).find(key => object[key].id === value);
}

export default getKeyByValue;

export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
}

export const formatToIDR = (value: number) => {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });
    return formatter.format(value).replace("IDR", "Rp.");;
}