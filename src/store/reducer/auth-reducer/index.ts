import { clearAuthcookie, storeAuthCookie } from "@/lib/cookie";
import { createSlice } from "@reduxjs/toolkit"
import { authNotLoggedIn, authSuccess, hideAuthModal, logoutSuccess, sessionExpired, sessionRestored, showAuthModal, AuthModalType } from "./actions"
import { AuthSessionType } from './actions'

type AuthState = {
    session: AuthSessionType;
    isLoading: boolean;
    isLoggedIn: boolean;
    authModal: AuthModalType | null;
    cognito: {
        idToken?: string;
        accessToken?: string;
    },
    ardArt: {
        accessToken?: string;
        accountId?: number;
    },
    profile: {
        username?: string;
        email?: string;
    },
    idax?: {
        id: number;
        code: string;
        name: string;
        email: string;
    },
}

const initialState: AuthState = {
    session: undefined,
    isLoggedIn: false,
    isLoading: true,
    authModal: null,
    cognito: {},
    ardArt: {},
    profile: {

    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(authNotLoggedIn, (state, action) => {
            state.isLoggedIn = false;
            state.isLoading = false;
        })
        builder.addCase(authSuccess, (state, { payload }) => {
            state.session = state.idax ? 'idax-wv' : payload.session
            state.isLoggedIn = true;
            state.isLoading = false;
            if (payload.ardArt) {
                state.ardArt.accessToken = payload.ardArt.accessToken.value;
                state.ardArt.accountId = payload.ardArt.accountId.value;
            }
            if (payload.cognito) {
                state.cognito.accessToken = payload.cognito.accessToken.value;
                state.cognito.idToken = payload.cognito.idToken.value;
            }
            if (payload.idax) {
                state.idax = {
                    id: payload.idax.id,
                    email: payload.idax.email,
                    code: payload.idax.code,
                    name: payload.idax.name,
                }
            }
            if (payload.cognito && payload.ardArt) {
                storeAuthCookie({
                    cognito: payload.cognito,
                    ardArt: payload.ardArt,
                })
            }
            state.profile = payload.profile;
        })
        builder.addCase(sessionRestored, (state, { payload }) => {
            state.session = payload.session
            state.isLoggedIn = true;
            state.isLoading = false;
            if (payload.ardArt) {
                state.ardArt.accessToken = payload.ardArt.accessToken.value;
                state.ardArt.accountId = payload.ardArt.accountId.value;
            }
            if (payload.cognito) {
                state.cognito.accessToken = payload.cognito.accessToken.value;
                state.cognito.idToken = payload.cognito.idToken.value;
            }
            if (payload.idax) {
                state.idax = {
                    id: payload.idax.id,
                    email: payload.idax.email,
                    code: payload.idax.code,
                    name: payload.idax.name,
                }
            }
            state.profile = payload.profile;
        })
        builder.addCase(logoutSuccess, (state, action) => {
            state = {
                ...initialState,
                isLoading: false,
            };
            clearAuthcookie()
            return state;
        })
        builder.addCase(sessionExpired, (state, action) => {
            state = {
                ...initialState,
                isLoading: false,
            };
            clearAuthcookie();
            return state;
        })
        builder.addCase(showAuthModal, (state, { payload }) => {
            state.authModal = payload.type;
        })
        builder.addCase(hideAuthModal, (state, { payload }) => {
            state.authModal = null;
        })
    },
})

export default authSlice.reducer;