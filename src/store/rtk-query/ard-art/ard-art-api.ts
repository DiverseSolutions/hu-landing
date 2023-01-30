import { ArdArtBalanceResponse, ArdArtMetalandLogin, ArdArtMetalandLoginResponse } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ardArtApi = createApi({
    reducerPath: 'ardArt',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_ARD_ART_API_HOST_URL}` }),
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
        })
    }),
})

export const {
    useMetalandLoginMutation,
    useBalanceQuery
} = ardArtApi;