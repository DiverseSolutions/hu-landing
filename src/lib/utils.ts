import { EMAIL_REGEX } from './consts'
import formatNumber from 'format-number'

export const isValidEmail = (email: string) => {
    return email.match(EMAIL_REGEX) ? true : false;
}

const priceFormatter = formatNumber({ integerSeparator: `'` })
export const formatPrice = (v: number) => {
    return priceFormatter(v)
}