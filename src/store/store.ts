import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { Context, createWrapper } from 'next-redux-wrapper'
import { setupListeners } from '@reduxjs/toolkit/query'

import { nextjsApi } from './rtk-query/nextjs/nextjs-api';
import { ardArtApi } from './rtk-query/ard-art/ard-art-api';
import { huxArdArtApi } from './rtk-query/hux-ard-art/hux-ard-art-api';
import { cognitoApi } from './rtk-query/cognito/cognito-api';
import { idaxApi } from './rtk-query/idax/idax-api'
import { monxanshApi } from './rtk-query/monxansh/monxansh-api';
import { cognitoUserDataApi } from './rtk-query/cognito-userdata/cognito-userdata-api'

import authReducer from './reducer/auth-reducer';
import alertReducer from './reducer/alert-reducer';
import { rtkErrorAlert } from './rtk-query/middleware/rtk-error-alert';

export const store = configureStore({
  reducer: {
    [nextjsApi.reducerPath]: nextjsApi.reducer,
    [ardArtApi.reducerPath]: ardArtApi.reducer,
    [cognitoApi.reducerPath]: cognitoApi.reducer,
    [huxArdArtApi.reducerPath]: huxArdArtApi.reducer,
    [idaxApi.reducerPath]: idaxApi.reducer,
    [monxanshApi.reducerPath]: monxanshApi.reducer,
    [cognitoUserDataApi.reducerPath]: cognitoUserDataApi.reducer,
    auth: authReducer,
    alert: alertReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      rtkErrorAlert,
      nextjsApi.middleware,
      ardArtApi.middleware,
      cognitoApi.middleware,
      huxArdArtApi.middleware,
      idaxApi.middleware,
      monxanshApi.middleware,
      cognitoUserDataApi.middleware,
    )
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const initStore = (context: Context) => store;
export const wrapper = createWrapper<Store<RootState>>(initStore, { debug: process.env.NODE_ENV !== 'development' })

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)