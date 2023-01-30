import {Store} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import {Context, createWrapper} from 'next-redux-wrapper'
import { setupListeners } from '@reduxjs/toolkit/query'

import {nextjsApi} from './rtk-query/nextjs/nextjs-api';
import {ardArtApi} from './rtk-query/ard-art/ard-art-api';
import {cognitoApi} from './rtk-query/cognito/cognito-api';


export const store = configureStore({
  reducer: {
    [nextjsApi.reducerPath]: nextjsApi.reducer,
    [ardArtApi.reducerPath]: ardArtApi.reducer,
    [cognitoApi.reducerPath]: cognitoApi.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const initStore = (context: Context) => store;
export const wrapper = createWrapper<Store<RootState>>(initStore, {debug: process.env.NODE_ENV !== 'development'})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)