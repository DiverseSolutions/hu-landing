import { createSlice } from "@reduxjs/toolkit"
import { pageError } from './actions'

type ErrorState = {
    pageErrorMessage: string | undefined,
    description: string | undefined,
}

const initialState: ErrorState = {
    pageErrorMessage: undefined,
    description: undefined,
}

const errorSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(pageError, (state, { payload }) => {
            state.pageErrorMessage = payload.message
            state.description = payload.description
        })
    },
})

export default errorSlice.reducer;