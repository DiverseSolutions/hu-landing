import { MonXanshRateResponse, MonXanshCurrency } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const monxanshApi = createApi({
    reducerPath: 'monxanshApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://monxansh.appspot.com/xansh.json' }),
    endpoints: (builder) => ({
        monxanshRate: builder.query<MonXanshRateResponse[], { currency: MonXanshCurrency }>({
            query: (d) => ({
                url: '',
                method: "GET",
                params: {
                    currency: d.currency
                }
            })
        })
    }),
})

export const {
    useMonxanshRateQuery,
    useLazyMonxanshRateQuery
} = monxanshApi;