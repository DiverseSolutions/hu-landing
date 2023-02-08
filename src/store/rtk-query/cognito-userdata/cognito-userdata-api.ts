import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { cloneUniformsGroups } from 'three';

import { CognitoUserDataByEmailResponse } from './types'

const apiHostUrl = process.env.NEXT_PUBLIC_COGNITO_USER_DATA_API_HOST_URL as string
const apiKey = process.env.NEXT_PUBLIC_COGNITO_USER_DATA_API_KEY as string

export const cognitoUserDataApi = createApi({
    reducerPath: 'cognitoUserdata',
    baseQuery: fetchBaseQuery({
        baseUrl: apiHostUrl,
        mode: 'no-cors',
        prepareHeaders(headers, api) {
            headers.set('Authorization', 'auth')
            console.log(headers)
            return headers
        },
    }),
    endpoints: (builder) => ({
        getCognitoUserData: builder.query<CognitoUserDataByEmailResponse, {
            email: string
        }>({
            query: (d) => ({
                url: `/api/getusername`,
                method: "POST",
                body: d,
            })
        })
    }),
})

export const { useGetCognitoUserDataQuery, useLazyGetCognitoUserDataQuery } = cognitoUserDataApi