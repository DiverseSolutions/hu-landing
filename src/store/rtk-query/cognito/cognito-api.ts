import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CognitoConfirmSignup, CognitoSignupRequest, CognitoSignupResponse, CognitoGetUser, CognitoUser, CognitoRefreshTokenResponse, CognitoRefreshToken, CognitoForgotPasswordResponse, CognitoForgotPassword, CognitoConfirmForgotPassword, CognitoSignupResend, CognitoLoginResponse, CognitoLoginRequest } from './types';

const cognitoClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;

export const cognitoApi = createApi({
    reducerPath: 'cognito',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://cognito-idp.ap-northeast-1.amazonaws.com',
        prepareHeaders(headers, api) {
            headers.set('Content-Type', 'application/x-amz-json-1.1')
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<CognitoLoginResponse, CognitoLoginRequest>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
                },
                body: JSON.stringify({
                    AuthFlow: 'USER_PASSWORD_AUTH',
                    ClientId: cognitoClientId,
                    ...d,
                })
            })
        }),
        signup: builder.mutation<CognitoSignupResponse, CognitoSignupRequest>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.SignUp',
                },
                body: JSON.stringify({
                    ClientId: cognitoClientId,
                    ...d,
                })
            })
        }),
        signupResend: builder.mutation<{}, CognitoSignupResend>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.ResendConfirmationCode',
                },
                body: JSON.stringify({
                    ClientId: cognitoClientId,
                    ...d
                })
            })
        }),
        forgotPassword: builder.mutation<CognitoForgotPasswordResponse, CognitoForgotPassword>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.ForgotPassword',
                },
                body: JSON.stringify({
                    ClientId: cognitoClientId,
                    ...d
                })
            })
        }),
        confirmForgotPassword: builder.mutation<{}, CognitoConfirmForgotPassword>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmForgotPassword',
                },
                body: JSON.stringify({
                    ClientId: cognitoClientId,
                    ...d
                })
            })
        }),
        refreshToken: builder.mutation<CognitoRefreshTokenResponse, CognitoRefreshToken>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
                },
                body: JSON.stringify({
                    ClientId: cognitoClientId,
                    ...d
                })
            })
        }),
        signupConfirm: builder.mutation<{}, CognitoConfirmSignup>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmSignUp',
                },
                body: JSON.stringify({
                    ClientId: cognitoClientId,
                    ...d
                })
            })
        }),
        getUser: builder.mutation<CognitoUser, CognitoGetUser>({
            query: (d) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser',
                },
                body: JSON.stringify({
                    ClientId: cognitoClientId,
                    ...d
                })
            })
        }),
    }),
})

export const {
    useLoginMutation,
    useSignupMutation,
    useSignupConfirmMutation,
    useSignupResendMutation,
    useGetUserMutation
} = cognitoApi;