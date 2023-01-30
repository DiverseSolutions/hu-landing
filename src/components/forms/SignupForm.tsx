import React from 'react'
import { useForm } from "react-hook-form";

type Props = {}

type SignupFormData = {
  username: string;
  email: string;
  password: string;
  password2: string;
}
export default function SignupForm({ }: Props) {
  const { register, handleSubmit } = useForm<SignupFormData>({
    defaultValues: {
      username: '',
      password: '',
      password2: '',
      email: '',
    }
  })

  const onSubmit = (d: SignupFormData) => {

  }

  return (
    <form>
      <div className="mb-4">
        <div className="w-full form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" placeholder="Type here" className="w-full input input-bordered" />
          <label className="label">
            <span className="label-text-alt">This will be used for login</span>
          </label>
        </div>
      </div>
      <div className="mb-4">
        <div className="w-full form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="Type here" className="w-full input input-bordered" />
        </div>
      </div>
      <div className="mb-4">
        <div className="w-full form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" placeholder="Type here" className="w-full input input-bordered" />
        </div>
      </div>
      <div className="mb-4">
        <div className="w-full form-control">
          <label className="label">
            <span className="label-text">Confirm password</span>
          </label>
          <input type="text" placeholder="Type here" className="w-full input input-bordered" />
        </div>
      </div>
      <div className="flex items-center justify-between mt-8">
        <button className="w-full btn btn-primary">
          Register
        </button>
      </div>
    </form>
  )
}