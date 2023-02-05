import { useAppSelector } from '@/store/hooks'
import React, { useMemo } from 'react'
import { generateFromString } from 'generate-avatar'

type Props = {}

export default function Avatar({ }: Props) {

    const profile = useAppSelector(state => state.auth.profile)

    const avatarImg = useMemo(() => {
        if (!profile?.username) {
            return '';
        }
        return generateFromString(profile.username)
    }, [profile])

    if (!profile) {
        return <></>
    }
    return (
        <img className='object-cover w-full h-full rounded-lg' src={`data:image/svg+xml;utf8,${avatarImg}`} />
    )
}