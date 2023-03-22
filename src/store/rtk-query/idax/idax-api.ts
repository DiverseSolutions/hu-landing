import { getIdaxCookie } from '@/lib/cookie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';
import { IdaxUserInfoResponse } from './types'

export const idaxApi = createApi({
    reducerPath: 'idaxApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_IDAX_HOST}`,
        prepareHeaders(headers, api) {
            const { idaxExToken: exToken } = getIdaxCookie()
            if (exToken) {
                headers.set('exchange-token', exToken)
            }
        },
    }),
    endpoints: (builder) => ({
        idaxUserInfo: builder.query<IdaxUserInfoResponse, void>({
            query: (d) => ({
                url: `/fe-ex-api/common/user_info`,
                method: 'POST'
            })
        })
    }),
})

export const {
    useIdaxUserInfoQuery,
    useLazyIdaxUserInfoQuery
} = idaxApi;