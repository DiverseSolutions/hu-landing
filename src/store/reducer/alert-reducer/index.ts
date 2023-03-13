import { createSlice } from '@reduxjs/toolkit';
import { alertVisibility } from './actions';

type AlertState = {
    isArtArtVisible: boolean,
}

const initialState: AlertState = {
    isArtArtVisible: true,
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(alertVisibility, (state, { payload }) => {
            if (payload.isArtArtVisible !== undefined) {
                state.isArtArtVisible = payload.isArtArtVisible
            }
        })
    },
})

export default alertSlice.reducer