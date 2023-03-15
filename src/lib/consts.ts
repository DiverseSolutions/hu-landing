export const PASSWORD_MIN_REGEX = /.{8,}/
export const PASSWORD_MIN_ERROR = 'Password too weak, minimum 8 characters, 1 letter 1 number'
export const IS_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

export const ERROR_CURRENCY = 'Currency error. Please try reload the page'

export const APP_HOST_URL = process.env.NEXT_PUBLIC_APP_HOST_URL as string

export const BUNDLE_CATEGORY = [{
    slug: 'gold',
    name: 'Gold Bundle'
}, {
    slug: 'silver',
    name: 'Silver Bundle'
}, {
    slug: 'bronze',
    name: 'Bronze Bundle'
}]

export const CATEGORY_COLORS: {
    [key: string]: string
} = {
    'gold': '#ffd700',
    'silver': '#C0C0C0',
    'bronze': '#CD7F32'
}

export const ASSET_CATEGORY = [{
    slug: 'avatar',
    name: 'Avatar'
}, {
    slug: 'signature movement',
    name: 'Signature movement'
}
]

export const TICKET_REGIONS = [
    {
        region: 'ASIA',
        date: 'March 30, 2023 at 21:00 Asia Pacific GMT +08:00'
    },
    {
        region: 'EUROPE',
        date: 'March 30, 2023 at 21:00 Europe GMT 00:00'
    },
    {
        region: 'USA',
        date: 'March 30, 2023 at 21:00 America GMT -08:00'
    },
];

export const ERR_UNKNOWN = "An unknown error occured. Please try reload the page."
