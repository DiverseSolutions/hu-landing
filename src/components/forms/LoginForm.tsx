import { PASSWORD_MIN_REGEX } from '@/lib/consts';
import { useAppDispatch } from '@/store/hooks';
import { authSuccess } from '@/store/reducer/auth-reducer/actions';
import { useMetalandLoginMutation } from '@/store/rtk-query/ard-art/ard-art-api';
import { useLazyGetUserQuery, useLoginMutation } from '@/store/rtk-query/cognito/cognito-api';
import classNames from 'classnames';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

type Props = {
  onSuccess: () => void;
}

type LoginFormData = {
  username: string;
  password: string;
}
export default function LoginForm({ ...props }: Props) {

  const dispatch = useAppDispatch();
  const [callGetUser] = useLazyGetUserQuery()
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [callMetalandLogin, { isLoading: isMetalandLoginLoading }] = useMetalandLoginMutation()
  const [callLogin, { isLoading: isCognitoLoginLoading }] = useLoginMutation()

  const { register, handleSubmit, formState: {
    errors
  } } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    }
  })

  const handleLogin = async (d: LoginFormData) => {
    const cognitoResp = await callLogin({
      AuthParameters: {
        USERNAME: d.username,
        PASSWORD: d.password
      }
    }).unwrap();
    const cognitoUserResp = await callGetUser({
      AccessToken: cognitoResp.AuthenticationResult.AccessToken
    }).unwrap()
    const metalandResp = await callMetalandLogin({
      token: cognitoResp.AuthenticationResult.IdToken,
    }).unwrap()
    if (!metalandResp.result) {
      return;
    }
    dispatch(authSuccess({
      ardArt: {
        accessToken: {
          value: metalandResp.result.jwtToken,
          expiresIn: 3600, // TODO:: find ard art jwt expiration
        },
        accountId: {
          value: metalandResp.result.accountId,
          expiresIn: 3600,
        }
      },
      cognito: {
        idToken: {
          value: cognitoResp.AuthenticationResult.IdToken,
          expiresIn: cognitoResp.AuthenticationResult.ExpiresIn,
        },
        accessToken: {
          value: cognitoResp.AuthenticationResult.AccessToken,
          expiresIn: cognitoResp.AuthenticationResult.ExpiresIn,
        },
      },
      profile: {
        email: cognitoUserResp.UserAttributes.find((a) => a.Name === 'email')!.Value,
        username: cognitoUserResp.Username,
      },
    }))
    if (metalandResp.status === 'success') {
      toast('Logged In Successfully.', {
        type: 'success'
      })
      props.onSuccess()
    }
  }

  const onSubmit = async (d: LoginFormData) => {
    setIsLoginLoading(true);
    try {
      await handleLogin(d);
    } catch (e) {
      console.log(e)
    }
    setIsLoginLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <div className="w-full form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" placeholder="Enter your username" className="w-full input input-bordered"
            {...register('username', {
              validate: (v) => v?.length < 4 ? "Invalid username" : undefined
            })} />
          <label className="label">
            <span className="label-text-alt text-error-content">{errors.username?.message}</span>
          </label>
        </div>
      </div>
      <div className="mb-4">
        <div className="w-full form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="Enter password" className="w-full input input-bordered"
            {...register('password', {
              pattern: {
                value: PASSWORD_MIN_REGEX,
                message: "Invalid password"
              }
            })} />
          <label className="label">
            <span className="label-text-alt text-error-content">{errors.password?.message}</span>
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between mt-8">
        <button className={classNames('w-full btn btn-primary', { 'loading': isLoginLoading })} type="submit">
          Login
        </button>
      </div>
    </form>
  )
}