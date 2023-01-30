import React from 'react'
import { useForm } from "react-hook-form";

type Props = {}

type LoginFormData = {
  username: string;
  password: string;
}
export default function LoginForm({ }: Props) {
  const { register, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    }
  })

  const onSubmit = (d: LoginFormData) => {

  }

  return (
    <form>
      <div className="mb-4">
        <div className="w-full form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" placeholder="Enter your username" className="w-full input input-bordered" />
          {/* <label className="label">
            <span className="label-text-alt">This will be used for login</span>
          </label> */}
        </div>
      </div>
      <div className="mb-4">
        <div className="w-full form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" placeholder="Enter password" className="w-full input input-bordered" />
        </div>
      </div>
      <div className="flex items-center justify-between mt-8">
        <button className="w-full btn btn-primary">
          Login
        </button>
      </div>
    </form>
  )
}