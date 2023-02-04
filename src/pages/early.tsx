import Navbar from '@/components/Navbar'
import EarlyTicketFeature from '@/features/ticket/EarlyTicketFeature'
import React from 'react'

type Props = {}

export default function EarlyTicket({ }: Props) {
    return (
        <>
            <Navbar />
            <EarlyTicketFeature />
        </>
    )
}