import { ArdArtResponse } from './../ard-art/types';
import { ArdArtBundleResponse, ArdArtBundleInvoiceResponse, ArdArtSingleInvoiceResponse, ArdArtAssetDetailByIDResult, ArdArtTicketOrAssetResponse, ArdArtMyOwnedNftResponse, ArdArtCreateSocialpayInvoiceResult, ArdArtCreateQpayInvoiceResult, ArdArtCreateQposInvoiceResult, ArdArtGetInvoiceByIdResult, ArdArtCheckInvoiceResult } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const huxArdArtApi = createApi({
    reducerPath: 'huxArdArt',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_HUX_ARD_ART_API_HOST_URL}` }),
    endpoints: (builder) => ({
        getTicketOrAsset: builder.query<ArdArtTicketOrAssetResponse, {
            type?: "asset" | "ticket",
            tag?: string,
            subTag?: string,
            ownerId?: number,
        }>({
            query: (d) => ({
                url: '/api/v1/asset/get',
                method: 'POST',
                body: d
            })
        }),
        getAssetDetailById: builder.query<ArdArtResponse<ArdArtAssetDetailByIDResult>, {
            id: number
        }>({
            query: (d) => ({
                url: `/api/v1/asset/detail/${d.id}`,
                method: 'GET',
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
        checkInvoice: builder.query<ArdArtResponse<ArdArtCheckInvoiceResult>, {
            invoiceId: number
        }>({
            query: (d) => ({
                url: `/api/v1/market/invoice/check/${d.invoiceId}`,
                method: 'GET',
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
        myOwnedNft: builder.query<ArdArtMyOwnedNftResponse, {
            ownerId?: number;
        }>({
            query: (d) => ({
                url: '/api/v1/asset/get',
                method: 'POST',
                body: d
            })
        }),
        createSocialpayInvoice: builder.mutation<ArdArtResponse<ArdArtCreateSocialpayInvoiceResult>, {
            type: 'single' | 'bundle';
            productId?: number;
            bundleId?: number;
            amount: number;
            accountId: number;
        }>({
            query: (d) => ({
                url: '/api/v1/market/invoice/create',
                method: 'POST',
                body: {
                    ...d,
                    method: 'socialpay',
                    callback: 'https://www.ard.art'
                }
            })
        }),
        createQpayInvoice: builder.mutation<ArdArtResponse<ArdArtCreateQpayInvoiceResult>, {
            type: 'single' | 'bundle';
            productId?: number;
            bundleId?: number;
            amount: number;
            accountId: number;
        }>({
            query: (d) => ({
                url: '/api/v1/market/invoice/create',
                method: 'POST',
                body: {
                    ...d,
                    method: 'qpay',
                    callback: 'https://www.ard.art'
                }
            })
        }),
        createQposInvoice: builder.mutation<ArdArtResponse<ArdArtCreateQposInvoiceResult>, {
            type: 'single' | 'bundle';
            productId?: number;
            bundleId?: number;
            amount: number;
            accountId: number;
        }>({
            query: (d) => ({
                url: '/api/v1/market/invoice/create',
                method: 'POST',
                body: {
                    ...d,
                    method: 'qpos',
                    callback: 'https://www.ard.art'
                }
            })
        }),
        getInvoiceById: builder.query<ArdArtResponse<ArdArtGetInvoiceByIdResult>, {
            invoiceId?: number;
        }>({
            query: (d) => ({
                url: `/api/v1/market/invoice/${d.invoiceId}`,
                method: 'GET',
            })
        }),
    }),
})

export const {
    useGetTicketOrAssetQuery,
    useGetBundleQuery,
    useInvoiceBundleMutation,
    useMyOwnedNftQuery,
    useGetAssetDetailByIdQuery,
    useLazyGetAssetDetailByIdQuery,
    useCreateSocialpayInvoiceMutation,
    useCreateQpayInvoiceMutation,
    useCreateQposInvoiceMutation,
    useGetInvoiceByIdQuery,
    useLazyGetInvoiceByIdQuery,
    useCheckInvoiceQuery,
    useLazyCheckInvoiceQuery
} = huxArdArtApi;