import { ArdArtBalanceResponse, ArdArtCheckInvoiceResult, ArdArtMetalandLogin, ArdArtMetalandLoginResponse, ArdArtResponse } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getArdArdAccessToken } from '@/lib/cookie'

export const ardArtApi = createApi({
    reducerPath: 'ardArt',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_ARD_ART_API_HOST_URL}`, prepareHeaders(headers, api) {
            const accessToken = getArdArdAccessToken()
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`)
            }
        },
    }),
    endpoints: (builder) => ({
        metalandLogin: builder.mutation<ArdArtMetalandLoginResponse, ArdArtMetalandLogin>({
            query: (d) => ({
                url: '/api/v1/thirdparty/metalandlogin',
                method: 'POST',
                body: d
            })
        }),
        balance: builder.query<ArdArtBalanceResponse, {}>({
            query: () => ({
                url: '/api/v1/balance',
                method: 'GET',
            })
        }),
        checkInvoice: builder.query<ArdArtResponse<ArdArtCheckInvoiceResult>, {
            invoiceId: number;
        }>({
            query: (d) => ({
                url: '/api/v1/balance/check/invoice',
                method: 'POST',
                body: d
            })
        }),
    }),
})

export const {
    useMetalandLoginMutation,
    useBalanceQuery,
    useCheckInvoiceQuery,
    useLazyCheckInvoiceQuery
} = ardArtApi;