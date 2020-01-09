import moment from "moment"
/**
 * Display currency symbol
 * @param currencyName
 * @returns {string}
 */
export let displayCurrency = currencyName => {

    const currency = {
        CURRENCY_EUROS : "euro"
    };


    if(currencyName ===  currency.CURRENCY_EUROS) {
        return "€"
    } else {
        return ""
    }
};

/**
 * Display date with the format given (YYYY-MM-DD HH:mm:ss)
 * @param createdAt
 * @param formatStr
 * @returns {*}
 */
export let displayDate = (createdAt, formatStr) => {
     return moment(createdAt).format(formatStr);
    //return moment(createdAt)
};

