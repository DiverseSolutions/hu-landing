import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const COGNITO_OTP_ALREADY_SENT = 'PreSignUp failed with error Email address exists and UNCONFIRMED.'

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
                toast(cognitoErr, {
                    type: 'error'
                })
            }
        }
        if (action.payload?.status === 'error') {
            const metalandErr = action.payload?.message;
            if (metalandErr) {
                toast(metalandErr, {
                    type: 'error'
                })
            }
        }
        return next(action)
    }