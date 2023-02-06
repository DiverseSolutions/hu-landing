export const PASSWORD_MIN_REGEX = /.{8,}/
export const PASSWORD_MIN_ERROR = 'Password too weak, minimum 8 characters, 1 letter 1 number'
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID