import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { sessionExpired } from '@/store/reducer/auth-reducer/actions'

const COGNITO_OTP_ALREADY_SENT = 'PreSignUp failed with error Email address exists and UNCONFIRMED.'
const COGNITO_TOKEN_EXPIRED = 'Access Token has expired'
const COGNITO_INVALID_TOKEN = 'Could not verify signature for Access Token'

const HIDDEN_METALAND_ERR = ['live stream is not ready']

/**
 * Log a warning and show a toast!
 */
export const rtkErrorAlert: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        console.log(`action:`)
        console.log(action)
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejectedWithValue(action)) {
            const cognitoErr = action.payload?.data?.message;
            if (cognitoErr && (cognitoErr !== COGNITO_OTP_ALREADY_SENT)) {
                if (cognitoErr === COGNITO_TOKEN_EXPIRED || cognitoErr === COGNITO_INVALID_TOKEN) {
                    toast('Session Expired', {
                        type: 'warning'
                    })
                    api.dispatch(sessionExpired())
                } else {
                    toast(cognitoErr, {
                        type: 'error'
                    })
                }
            }
        }
        if (action.payload?.code === 500) {
            const err = action.payload?.message || "Service Unavailable"
            if (err) {
                toast(err, {
                    type: 'error'
                })
            }
        }
        if (`${action.payload?.status}`.toLowerCase() === 'error') {
            const metalandErr = action.payload?.message;
            console.log(`show metaland err: ${metalandErr}`)
            if (metalandErr) {
                if (api.getState()?.alert?.isArtArtVisible) {

                    toast(metalandErr, {
                        type: 'error'
                    })
                }
            }
        }
        return next(action)
    }