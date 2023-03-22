import { createAction } from "@reduxjs/toolkit";

export type AuthSessionType = 'web' | 'idax-wv' | undefined

export const authSuccess = createAction<{
    session: AuthSessionType,
    ardArt?: {
        accessToken: {
            value: string;
            expiresIn: number;
        };
        accountId: {
            value: number;
            expiresIn: number;
        };
    },
    cognito?: {
        accessToken: {
            value: string;
            expiresIn: number;
        };
        idToken: {
            value: string;
            expiresIn: number;
        };
    },
    idax?: {
        id: number;
        name: string;
        email: string;
    },
    profile: {
        username: string;
        email: string;
    }
}>("AUTH_SUCCESS")

export const authSession = createAction<{
    session: AuthSessionType
}>("AUTH_SESSION")

export const sessionRestored = createAction<{
    session: AuthSessionType,
    ardArt?: {
        accessToken: {
            value: string;
        };
        accountId: {
            value: number;
        };
    },
    cognito?: {
        accessToken: {
            value: string;
        };
        idToken: {
            value: string;
        };
    },
    idax?: {
        id: number;
        name: string;
        email: string;
    },
    profile: {
        username: string;
        email: string;
    }
}>('SESSION_RESTORED');

export const authNotLoggedIn = createAction<void>("NOT_LOGGED_IN");
export const logoutSuccess = createAction<void>('LOGOUT_SUCCESS');
export const sessionExpired = createAction<void>('SESSION_EXPIRED');

export type AuthModalType = 'login' | 'register' | 'register-otp' | 'forgot-password' | 'forgot-password-confirm'

export const showAuthModal = createAction<{
    type: AuthModalType
}>("SHOW_AUTH_MODAL")

export const hideAuthModal = createAction<void>("HIDE_AUTH_MODAL")