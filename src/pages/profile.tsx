import { withAuthLoader } from '@/components/AuthLoader';
import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar';
import PorfileFeature from '@/features/profile/PorfileFeature';
import React, { useEffect } from 'react';

type Props = {}

const Profile = ({ }: Props) => {
    return (
        <>
            <Navbar />
            <PorfileFeature />
            <Footer />
        </>
    )
}

export default withAuthLoader(Profile)