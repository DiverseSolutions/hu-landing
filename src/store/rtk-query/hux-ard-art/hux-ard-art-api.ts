import { ArdArtResponse } from './../ard-art/types';
import { ArdArtBundleResponse, ArdArtBundleInvoiceResponse, ArdArtAssetDetailByIDResult, ArdArtTicketOrAssetResponse, ArdArtMyOwnedNftResponse, ArdArtCreateSocialpayInvoiceResult, ArdArtCreateQpayInvoiceResult, ArdArtCreateQposInvoiceResult, ArdArtGetInvoiceByIdResult, ArdArtCheckInvoiceResult, ArdArtAssetDetailEarlyResult, ArdArtCognitoUserDetailResult, ArdArtMyNftCountResult, ArdArtArdxUsdRateResult, ArdArtIdaxInvoiceResult, ArdArtBundleDetailResult, ArdArtAssetDetailResult, ArdArtPromoResult, ArdArtCheckPromoResult } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MonXanshRateResponse } from '../monxansh/types';

export const huxArdArtApi = createApi({
    reducerPath: 'huxArdArt',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_HUX_ARD_ART_API_HOST_URL}` }),
    endpoints: (builder) => ({
        getTicketOrAsset: builder.query<ArdArtTicketOrAssetResponse, {
            type?: "asset" | "ticket",
            tag?: string,
            ownerId?: number,
            category?: string[],
            subTag?: string[],
            minPrice?: number,
            maxPrice?: number,
            offset?: number;
            limit?: number;
        } | void>({
            query: (d) => ({
                url: '/api/v1/asset/get',
                method: 'POST',
                body: d || {}
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
        getBundle: builder.query<ArdArtBundleResponse, {
            offset?: number;
            limit?: number;
            category?: string[];
            level?: number;
        } | void>({
            query: (d) => ({
                url: '/api/v1/bundle/get',
                method: 'POST',
                body: {
                    ...d,
                    "offset": d?.offset || 0,
                    "limit": d?.limit || 200
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
            region?: string;
            method: 'socialpay' | 'card' | 'idax';
            productId?: number;
            bundleId?: number;
            amount: number;
            accountId: number;
            email: string;
        }>({
            query: (d) => ({
                url: '/api/v1/market/invoice/create',
                method: 'POST',
                body: {
                    ...d,
                    method: d.method,
                    callback: `${process.env.NEXT_PUBLIC_APP_HOST_URL}/payment-status`
                }
            })
        }),
        createIdaxInvoice: builder.mutation<ArdArtResponse<ArdArtIdaxInvoiceResult>, {
            type: 'single' | 'bundle';
            productId?: number;
            bundleId?: number;
            region?: string;
            amount: number;
            accountId?: number;
            email: string;
            idaxUserId: string;
            idaxUserCode: string;
        }>({
            query: (d) => ({
                url: '/api/v1/market/invoice/create',
                method: 'POST',
                body: {
                    ...d,
                    method: 'idax',
                    callback: `${process.env.NEXT_PUBLIC_APP_HOST_URL}/payment-status`
                }
            })
        }),
        createQpayInvoice: builder.mutation<ArdArtResponse<ArdArtCreateQpayInvoiceResult>, {
            type: 'single' | 'bundle';
            productId?: number;
            bundleId?: number;
            region?: string;
            amount: number;
            accountId: number;
            email: string;
        }>({
            query: (d) => ({
                url: '/api/v1/market/invoice/create',
                method: 'POST',
                body: {
                    ...d,
                    method: 'qpay',
                    callback: `${process.env.NEXT_PUBLIC_APP_HOST_URL}/payment-status`
                }
            })
        }),
        createQposInvoice: builder.mutation<ArdArtResponse<ArdArtCreateQposInvoiceResult>, {
            type: 'single' | 'bundle';
            productId?: number;
            bundleId?: number;
            region?: string;
            email: string;
            amount: number;
            accountId: number;
        }>({
            query: (d) => ({
                url: '/api/v1/market/invoice/create',
                method: 'POST',
                body: {
                    ...d,
                    method: 'qpos',
                    callback: `${process.env.NEXT_PUBLIC_APP_HOST_URL}/payment-status`
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
        bundleDetail: builder.query<ArdArtResponse<ArdArtBundleDetailResult>, {
            id: number
        }>({
            query: (d) => ({
                url: `/api/v1/bundle/detail/${d.id}`,
                method: 'GET',
            })
        }),
        assetDetail: builder.query<ArdArtResponse<ArdArtAssetDetailResult>, {
            id: number
        }>({
            query: (d) => ({
                url: `/api/v1/asset/detail/${d.id}`,
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
            }),
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
        sendNft: builder.mutation<ArdArtResponse<any>, {
            otpCode: string;
            otpId: string;
            accountId: number;
            receiverEmail: string;
            productId: number;
            amount: number
        }>({
            query: (d) => ({
                url: '/api/v1/market/transfer',
                method: 'POST',
                body: d
            })
        }),
        ardxUsdRate: builder.query<ArdArtResponse<ArdArtArdxUsdRateResult>, void>({
            query: () => ({
                url: '/api/v1/helper/rate/usd',
                method: 'GET',
            })
        }),
        usdToArdxRate: builder.query<number | undefined, void>({
            query: () => ({
                url: '/api/v1/helper/rate/usd',
                method: 'GET',
            }),
            transformResponse(baseQueryReturnValue: ArdArtResponse<ArdArtArdxUsdRateResult>, meta, arg) {
                if (!baseQueryReturnValue.result?.buy) {
                    return undefined
                }
                return 1 / baseQueryReturnValue.result?.buy
            },
        }),
        promo: builder.query<ArdArtResponse<ArdArtPromoResult>, {
            code: string
        }>({
            query: (d) => ({
                url: `/api/v1/market/promo/${d.code}`,
                method: 'GET',
            })
        }),
        checkPromo: builder.query<ArdArtResponse<ArdArtCheckPromoResult>, {
            code: string,
            type: string,
            bundleId?: number;
            productId?: number;
        }>({
            query: (d) => ({
                url: `/api/v1/market/promo/check`,
                method: 'POST',
                body: d,
            })
        }),
    }),
})

export const {
    useGetTicketOrAssetQuery,
    useLazyGetTicketOrAssetQuery,
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
    useLazyMyNftCountQuery,
    useArdxUsdRateQuery,
    useLazyArdxUsdRateQuery,
    useUsdToArdxRateQuery,
    useLazyUsdToArdxRateQuery,
    useCreateIdaxInvoiceMutation,
    useBundleDetailQuery,
    useLazyBundleDetailQuery,
    useAssetDetailQuery,
    useLazyAssetDetailQuery,
    useSendNftMutation,
    usePromoQuery,
    useLazyPromoQuery,
    useCheckPromoQuery,
    useLazyCheckPromoQuery
} = huxArdArtApi;