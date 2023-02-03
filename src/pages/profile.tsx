import { withAuthLoader } from '@/components/AuthLoader';
import Navbar from '@/components/Navbar';
import PorfileFeature from '@/features/profile/PorfileFeature';
import React, { useEffect } from 'react';

type Props = {}

const Profile = ({ }: Props) => {
    return (
        <>
            <Navbar />
            <PorfileFeature />
        </>
    )
}

export default withAuthLoader(Profile)