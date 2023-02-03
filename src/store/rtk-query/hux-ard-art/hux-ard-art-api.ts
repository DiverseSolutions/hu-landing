import { ArdArtTicketResponse, ArdArtBundleResponse, ArdArtBundleInvoiceResponse, ArdArtSingleInvoiceResponse, ArdArtCheckInvoiceResponse, ArdArtTicketOrAssetResponse, ArdArtMyOwnedNftResponse } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const huxArdArtApi = createApi({
    reducerPath: 'huxArdArt',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_HUX_ARD_ART_API_HOST_URL}` }),
    endpoints: (builder) => ({
        getTicketOrAsset: builder.query<ArdArtTicketOrAssetResponse, {
            type?: "asset" | "ticket",
            tag?: string,
            ownerId?: number,
        }>({
            query: (d) => ({
                url: '/api/v1/asset/get',
                method: 'POST',
                body: {
                    type: d.type
                }
            })
        }),
        getBundle: builder.query<ArdArtBundleResponse, void>({
            query: () => ({
                url: '/api/v1/bundle/get',
                method: 'POST',
                body: {

                }
            })
        }),
        invoiceBundle: builder.mutation<ArdArtBundleInvoiceResponse, {
            accountId: number;
            bundleId: number;
        }>({
            query: (d) => ({
                url: '/api/v1/market/bundle/invoice/create',
                method: 'POST',
                body: d
            })
        }),
        invoiceSingle: builder.mutation<ArdArtSingleInvoiceResponse, {
            accountId: number;
            productId: number;
            amount: number;
        }>({
            query: (d) => ({
                url: '/api/v1/market/product/invoice/create',
                method: 'POST',
                body: d
            })
        }),
        checkInvoice: builder.query<ArdArtCheckInvoiceResponse, {
            invoiceId: number;
        }>({
            query: (d) => ({
                url: '/api/v1/bundle/check',
                method: 'POST',
                body: d
            })
        }),
        myOwnedNft: builder.query<ArdArtMyOwnedNftResponse, {
            ownerId?: number;
        }>({
            query: (d) => ({
                url: '/api/v1/asset/get',
                method: 'POST',
                body: d
            })
        }),
    }),
})

export const {
    useGetTicketOrAssetQuery,
    useGetBundleQuery,
    useInvoiceBundleMutation,
    useInvoiceSingleMutation,
    useCheckInvoiceQuery,
    useLazyCheckInvoiceQuery,
    useMyOwnedNftQuery
} = huxArdArtApi;