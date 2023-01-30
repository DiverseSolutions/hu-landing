import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CognitoConfirmSignup, CognitoSignupRequest, CognitoSignupResponse, CognitoGetUser, CognitoUser, CognitoRefreshTokenResponse, CognitoRefreshToken, CognitoForgotPasswordResponse, CognitoForgotPassword, CognitoConfirmForgotPassword, CognitoSignupResend } from './types';

export const cognitoApi = createApi({
    reducerPath: 'cognito',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://cognito-idp.ap-northeast-1.amazonaws.com', headers: {
        'Content-Type': 'application/x-amz-json-1.1'
    } }),
    endpoints: (builder) => ({
        signup: builder.mutation<CognitoSignupResponse, CognitoSignupRequest>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.SignUp',
                },
                body: d
            })
        }),
        signupResend: builder.mutation<{}, CognitoSignupResend>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.ResendConfirmationCode',
                },
                body: d
            })
        }),
        forgotPassword: builder.mutation<CognitoForgotPasswordResponse, CognitoForgotPassword>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.ForgotPassword',
                },
                body: d
            })
        }),
        confirmForgotPassword: builder.mutation<{}, CognitoConfirmForgotPassword>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmForgotPassword',
                },
                body: d
            })
        }),
        refreshToken: builder.mutation<CognitoRefreshTokenResponse, CognitoRefreshToken>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
                },
                body: d
            })
        }),
        signupConfirm: builder.mutation<{}, CognitoConfirmSignup>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmSignUp',
                },
                body: d
            })
        }),
        getUser: builder.mutation<CognitoUser, CognitoGetUser>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser',
                },
                body: d
            })
        }),
    }),
})

export const {
    useSignupMutation,
    useSignupConfirmMutation,
    useGetUserMutation
} = cognitoApi;