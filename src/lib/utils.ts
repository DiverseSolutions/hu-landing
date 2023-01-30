import { EMAIL_REGEX } from './consts'

export const isValidEmail = (email: string) => {
    return email.match(EMAIL_REGEX) ? true : false;
}