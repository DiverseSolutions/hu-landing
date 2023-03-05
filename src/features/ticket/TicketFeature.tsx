import TicketSection from '@/components/section/TicketSection';
import { useGetAssetDetailByIdQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api';
import { useRouter } from 'next/router';
import React, { useState, useMemo, useEffect } from 'react';

import { ClipLoader } from 'react-spinners';

type Props = {}

export default function TicketFeature({ }: Props) {

    const [assetID, setAssetID] = useState<number>()

    const { data: ticketData, isLoading: isTicketLoading } = useGetAssetDetailByIdQuery({
        id: assetID!,
    }, {
        skip: !assetID
    })

    const router = useRouter()

    const ticket = useMemo(() => ticketData?.result, [ticketData])

    useEffect(() => {
        if (router.isReady) {
            const id = parseInt(`${router.query.id}`)
            if (id) {
                setAssetID(id)
            }
        }
    }, [router.isReady])

    if (isTicketLoading || !ticket) {
        return (
            <div className="justify-center w-full flex items-center h-[70vh]">
                <ClipLoader />
            </div>
        )
    }

    if (!ticket) {
        return <p>Ticket not found.</p>
    }

    return (
        <div>
            <TicketSection ticket={ticket} />
        </div>
    )
}