import { createAction } from "@reduxjs/toolkit";

export const authSuccess = createAction<{
    ardArt: {
        accessToken: {
            value: string;
            expiresIn: number;
        };
        accountId: {
            value: number;
            expiresIn: number;
        };
    },
    cognito: {
        accessToken: {
            value: string;
            expiresIn: number;
        };
        idToken: {
            value: string;
            expiresIn: number;
        };
    },
    profile: {
        username: string;
        email: string;
    }
}>("AUTH_SUCCESS")

export const sessionRestored = createAction<{
    ardArt: {
        accessToken: {
            value: string;
        };
        accountId: {
            value: number;
        };
    },
    cognito: {
        accessToken: {
            value: string;
        };
        idToken: {
            value: string;
        };
    },
    profile: {
        username: string;
        email: string;
    }
}>('SESSION_RESTORED');

export const authNotLoggedIn = createAction<void>("NOT_LOGGED_IN");
export const logoutSuccess = createAction<void>('LOGOUT_SUCCESS');
export const sessionExpired = createAction<void>('SESSION_EXPIRED');

export const showAuthModal = createAction<void>("SHOW_AUTH_MODAL")
export const hideAuthModal = createAction<void>("HIDE_AUTH_MODAL")