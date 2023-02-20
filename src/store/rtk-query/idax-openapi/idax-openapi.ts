import { IdaxTickerResponse } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const idaxOpenApi = createApi({
    reducerPath: 'idaxOpenApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://openapi.idax.exchange' }),
    endpoints: (builder) => ({
        ticker: builder.query<IdaxTickerResponse, { symbol: string }>({
            query: (d) => ({
                url: '/sapi/v1/ticker',
                method: "GET",
                params: {
                    symbol: d.symbol
                }
            })
        })
    }),
})

export const {
    useTickerQuery: useIdaxTickerQuery,
    useLazyTickerQuery: useLazyIdaxTickerQuery
} = idaxOpenApi;