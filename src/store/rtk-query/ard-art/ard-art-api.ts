import { ArdArtBalanceResponse, ArdArtMetalandLogin, ArdArtMetalandLoginResponse, ArdArtBalance } from './types';
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
        ardxBalance: builder.query<ArdArtBalance | undefined, void>({
            query: () => ({
                url: '/api/v1/balance',
                method: 'GET',
            }),
            transformResponse(baseQueryReturnValue: ArdArtBalanceResponse, meta, arg) {
                if (baseQueryReturnValue?.result?.length) {
                    const ardxBalance = baseQueryReturnValue.result.find((b) => b.type === 'ardx')
                    if (ardxBalance) {
                        return ardxBalance
                    }
                }
                return undefined
            },
        }),
    }),
})

export const {
    useMetalandLoginMutation,
    useBalanceQuery,
    useArdxBalanceQuery,
    useLazyArdxBalanceQuery,
} = ardArtApi;