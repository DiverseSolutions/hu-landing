import { clearAuthcookie, storeAuthCookie } from "@/lib/cookie";
import { createSlice } from "@reduxjs/toolkit"
import { authNotLoggedIn, authSuccess, hideAuthModal, logoutSuccess, sessionExpired, sessionRestored, showAuthModal } from "./actions"

type AuthState = {
    isLoading: boolean;
    isLoggedIn: boolean;
    isAuthModalVisible: boolean;
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
    }
}

const initialState: AuthState = {
    isLoggedIn: false,
    isLoading: true,
    isAuthModalVisible: false,
    cognito: {},
    ardArt: {},
    profile: {

    }
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
            state.isLoggedIn = true;
            state.isLoading = false;
            state.ardArt.accessToken = payload.ardArt.accessToken.value;
            state.ardArt.accountId = payload.ardArt.accountId.value;
            state.cognito.accessToken = payload.cognito.accessToken.value;
            state.cognito.idToken = payload.cognito.idToken.value;
            state.profile = payload.profile;
            storeAuthCookie({
                cognito: payload.cognito,
                ardArt: payload.ardArt,
            })
        })
        builder.addCase(sessionRestored, (state, { payload }) => {
            state.isLoggedIn = true;
            state.isLoading = false;
            state.ardArt.accessToken = payload.ardArt.accessToken.value;
            state.ardArt.accountId = payload.ardArt.accountId.value;
            state.cognito.accessToken = payload.cognito.accessToken.value;
            state.cognito.idToken = payload.cognito.idToken.value;
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
        builder.addCase(showAuthModal, (state, action) => {
            state.isAuthModalVisible = true;
        })
        builder.addCase(hideAuthModal, (state, action) => {
            state.isAuthModalVisible = false;
        })
    },
})

export default authSlice.reducer;