import { createSlice } from "@reduxjs/toolkit"

type AuthState = {

}

const initialState: AuthState = {

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers(builder) {

    },
})

export default authSlice.reducer;