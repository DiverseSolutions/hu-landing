import { useAppSelector } from '@/store/hooks'
import React, { useMemo } from 'react'
import ProfilePlaceholderImg from '@/assets/img/profile-placeholder.jpg'

type Props = {}

export default function Avatar({ }: Props) {

    const profile = useAppSelector(state => state.auth.profile)

    if (!profile) {
        return <></>
    }
    return (
        <img className='object-cover w-full h-full rounded-lg' src={ProfilePlaceholderImg.src} />
    )
}