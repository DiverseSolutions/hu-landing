import { ArdArtInvoiceResult, ArdArtResponse, ArdArtUpdateInvoiceQPayResult, ArdArtUpdateInvoiceQPosResult, ArdArtUpdateInvoiceSocialPayResult } from './types';
import { ArdArtBalanceResponse, ArdArtMetalandLogin, ArdArtMetalandLoginResponse } from './types';
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
        getInvoice: builder.query<ArdArtResponse<ArdArtInvoiceResult>, { invoiceId: number }>({
            query: (d) => ({
                url: '/api/v1/balance/invoice/get',
                method: 'GET',
                params: {
                    invoiceId: d.invoiceId
                }
            })
        }),
        updateInvoiceQPay: builder.mutation<ArdArtResponse<ArdArtUpdateInvoiceQPayResult>, { invoiceId: number }>({
            query: (d) => ({
                url: '/api/v1/balance/invoice/update',
                method: 'POST',
                body: {
                    ...d,
                    method: 'qpay'
                }
            })
        }),
        updateInvoiceSocialPay: builder.mutation<ArdArtResponse<ArdArtUpdateInvoiceSocialPayResult>, { invoiceId: number, productId: number }>({
            query: (d) => ({
                url: '/api/v1/balance/invoice/update',
                method: 'POST',
                body: {
                    ...d,
                    method: 'socialpay',
                    callback: `${process.env.NEXT_PUBLIC_APP_HOST_URL}/payment-status?invoiceId=${d.invoiceId}&productId=${d.productId}&type=socialpay`
                }
            })
        }),
        updateInvoiceQPos: builder.mutation<ArdArtResponse<ArdArtUpdateInvoiceQPosResult>, { invoiceId: number }>({
            query: (d) => ({
                url: '/api/v1/balance/invoice/update',
                method: 'POST',
                body: {
                    ...d,
                    method: 'qpos'
                }
            })
        }),
    }),
})

export const {
    useMetalandLoginMutation,
    useBalanceQuery,
    useGetInvoiceQuery,
    useLazyGetInvoiceQuery,
    useUpdateInvoiceQPayMutation,
    useUpdateInvoiceSocialPayMutation,
    useUpdateInvoiceQPosMutation,
} = ardArtApi;