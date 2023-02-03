import Navbar from '@/components/Navbar'
import TicketFeature from '@/features/ticket/TicketFeature'
import React from 'react'

type Props = {}

export default function Ticket({ }: Props) {
    return (
        <>
            <Navbar />
            <TicketFeature />
        </>
    )
}