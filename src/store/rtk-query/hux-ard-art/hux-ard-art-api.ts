import { ArdArtResponse } from './../ard-art/types';
import { ArdArtBundleResponse, ArdArtBundleInvoiceResponse, ArdArtAssetDetailByIDResult, ArdArtTicketOrAssetResponse, ArdArtMyOwnedNftResponse, ArdArtCreateSocialpayInvoiceResult, ArdArtCreateQpayInvoiceResult, ArdArtCreateQposInvoiceResult, ArdArtGetInvoiceByIdResult, ArdArtCheckInvoiceResult, ArdArtAssetDetailEarlyResult, ArdArtCognitoUserDetailResult, ArdArtMyNftCountResult } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MonXanshRateResponse } from '../monxansh/types';

export const huxArdArtApi = createApi({
    reducerPath: 'huxArdArt',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_HUX_ARD_ART_API_HOST_URL}` }),
    endpoints: (builder) => ({
        getTicketOrAsset: builder.query<ArdArtTicketOrAssetResponse, {
            type?: "asset" | "ticket",
            tag?: string,
            subTag?: string,
            ownerId?: number,
            category?: number,
            minPrice?: number,
            maxPrice?: number
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
            category?: number,
            minPrice?: number,
            maxPrice?: number
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
                    callback: `${process.env.NEXT_PUBLIC_APP_HOST_URL}/payment-status`
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
                    callback: `${process.env.NEXT_PUBLIC_APP_HOST_URL}/profile`
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
                    callback: `${process.env.NEXT_PUBLIC_APP_HOST_URL}/profile`
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
        assetDetailEarly: builder.query<ArdArtResponse<ArdArtAssetDetailEarlyResult>, void>({
            query: () => ({
                url: `/api/v1/asset/detail/early`,
                method: 'GET',
            })
        }),
        cognitoUser: builder.query<ArdArtResponse<ArdArtCognitoUserDetailResult>, {
            email: string;
        }>({
            query: (d) => ({
                url: '/api/v1/helper/getusername',
                method: 'POST',
                body: d
            })
        }),
        monxanshRate: builder.query<ArdArtResponse<MonXanshRateResponse[]>, {
            currency: 'USD|MNT'
        }>({
            query: (d) => ({
                url: '/api/v1/helper/rate',
                method: 'GET',
            })
        }),
        myNftCount: builder.query<ArdArtResponse<ArdArtMyNftCountResult>, {
            accountId: number;
        }>({
            query: (d) => ({
                url: '/api/v1/helper/profile',
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
    useMyOwnedNftQuery,
    useLazyMyOwnedNftQuery,
    useGetAssetDetailByIdQuery,
    useLazyGetAssetDetailByIdQuery,
    useCreateSocialpayInvoiceMutation,
    useCreateQpayInvoiceMutation,
    useCreateQposInvoiceMutation,
    useGetInvoiceByIdQuery,
    useLazyGetInvoiceByIdQuery,
    useCheckInvoiceQuery,
    useLazyCheckInvoiceQuery,
    useAssetDetailEarlyQuery,
    useLazyAssetDetailEarlyQuery,
    useCognitoUserQuery,
    useLazyCognitoUserQuery,
    useMonxanshRateQuery,
    useLazyMonxanshRateQuery,
    useMyNftCountQuery,
    useLazyMyNftCountQuery
} = huxArdArtApi;