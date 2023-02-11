import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar'
import EarlyTicketFeature from '@/features/ticket/EarlyTicketFeature'
import React from 'react'

type Props = {}

export default function EarlyTicket({ }: Props) {
    return (
        <>
            <Navbar />
            <EarlyTicketFeature />
            <Footer />
        </>
    )
}