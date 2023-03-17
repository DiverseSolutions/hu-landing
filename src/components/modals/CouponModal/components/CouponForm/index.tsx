import { useLazyCheckCouponQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api';
import { ArdArtCheckCouponResult } from '@/store/rtk-query/hux-ard-art/types';
import classNames from 'classnames';
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    onSuccess: (d: {
        coupon: ArdArtCheckCouponResult,
        code: string,
    }) => void,
}

type CouponFormData = {
    code: string;
}

function CouponForm({ ...props }: Props) {

    const { handleSubmit, register, setError, formState: {
        errors,
    } } = useForm<CouponFormData>()

    const [callCheckCoupon, { isFetching: isCheckCouponLoading }] = useLazyCheckCouponQuery()

    const onSubmit = async (d: CouponFormData) => {
        const resp = await callCheckCoupon({
            code: d.code,
        }).unwrap()
        if (resp.result) {
            props.onSuccess({
                coupon: resp.result,
                code: d.code,
            })
        } else if (resp.message?.length) {
            setError('code', {
                message: resp.message,
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('code', {
                validate: (c) => c?.length ? undefined : 'Invalid coupon code'

            })} className="w-full mt-2 input input-bordered" />
            {errors.code ? (
                <label className="label">
                    <span className="label-text-alt text-error">{errors.code?.message}</span>
                </label>) : <></>}
            <div className="mt-6">
                <button type="submit" className={classNames("w-full btn btn-black", { 'loading': isCheckCouponLoading })}>Continue</button>
            </div>
        </form>
    )
}

export default CouponForm