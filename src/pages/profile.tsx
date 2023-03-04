import { withAuthLoader } from '@/components/AuthLoader';
import Footer from '@/components/footer/Footer';
import PorfileFeature from '@/features/profile/PorfileFeature';
import React, { useEffect } from 'react';

type Props = {}

const Profile = ({ }: Props) => {
    return (
        <>
            <PorfileFeature />
        </>
    )
}

export default withAuthLoader(Profile)