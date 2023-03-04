import { withAuthLoader } from '@/components/AuthLoader';
import ProfileFeature from '@/features/profile/ProfileFeature';
import React from 'react';

type Props = {}

const Profile = ({ }: Props) => {
    return (
        <>
            <ProfileFeature />
        </>
    )
}

export default withAuthLoader(Profile)