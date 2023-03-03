export const PASSWORD_MIN_REGEX = /.{8,}/
export const PASSWORD_MIN_ERROR = 'Password too weak, minimum 8 characters, 1 letter 1 number'
export const IS_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

export const ERROR_CURRENCY = 'Currency error. Please try reload the page'

export const APP_HOST_URL = process.env.NEXT_PUBLIC_APP_HOST_URL as string


export const TICKET_REGIONS = [
    {
        region: 'ASIA',
        name: 'Early bird ticket ASIA',
        date: 'Thursday, March 30, 2023, 21:00:00 (UTC +08:00)'
    },
    {
        region: 'EUROPE',
        name: 'Early bird ticket EUROPE',
        date: 'Thursday, March 30, 2023, 21:00:00 (UTC +00:00)'
    },
    {
        region: 'USA',
        name: 'Early bird ticket USA',
        date: 'Thursday, March 30, 2023, 21:00:00 (UTC -08:00)'
    },
];