import { EMAIL_REGEX } from './consts'
import formatNumber from 'format-number'

export const isValidEmail = (email: string) => {
    return email.match(EMAIL_REGEX) ? true : false;
}

const priceFormatter = formatNumber({ integerSeparator: `'`, round: 2, })
const smallPriceFormatter = formatNumber({ integerSeparator: `'`, round: 4, })
export const formatPrice = (v: number) => {
    return v >= 0.01 ? priceFormatter(v) : smallPriceFormatter(v)
}