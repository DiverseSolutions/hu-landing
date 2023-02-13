import EarlyTicketSection from '@/components/section/EarlyTicketSection';
import { useArdxUsdRateQuery, useAssetDetailEarlyQuery, useLazyArdxUsdRateQuery, useLazyMonxanshRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api';
import { useLazyIdaxTickerQuery } from '@/store/rtk-query/idax/idax-api';
import React, { useState, useMemo, useEffect } from 'react';

import { ClipLoader } from 'react-spinners';

type Props = {}

export default function EarlyTicketFeature({ }: Props) {

    const [usdToArdxRate, setUsdToArdxRate] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const { data: ticketData, isLoading: isTicketsLoading } = useAssetDetailEarlyQuery()
    const [callArdxToUsdRate] = useLazyArdxUsdRateQuery()
    const ticket = useMemo(() => ticketData?.result, [ticketData])

    useEffect(() => {
        if (!ticket) {
            return;
        }
        (async () => {
            setIsLoading(true)
            try {
                await fetchUsdToArdxRate()
            } catch (e) {
                console.log(`rate error:`)
                console.log(e)
            }
            setIsLoading(false)
        })()
    }, [ticket])

    const fetchUsdToArdxRate = async () => {
        const [ardxUsdRate] = await Promise.all([
            callArdxToUsdRate().unwrap()
        ]);
        if (!ardxUsdRate.result) {
            return;
        }
        const ardxToUsd = ardxUsdRate.result.sell
        if (ardxToUsd) {
            setUsdToArdxRate(ardxToUsd)
        }
    }

    if (isLoading) {
        return (
            <div className="justify-center w-full flex items-center h-[70vh]">
                <ClipLoader />
            </div>
        )
    }
    if (!ticket) {
        return <p>No Ticket found</p>
    }
    if (!usdToArdxRate) {
        return <p>An error occured. Please try reload the page.</p>
    }
    return (
        <div>
            <EarlyTicketSection ticket={ticket} priceToArdxRate={usdToArdxRate} />
        </div>
    )
}