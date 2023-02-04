import EarlyTicketSection from '@/components/section/EarlyTicketSection';
import { useGetTicketOrAssetQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api';
import { useLazyIdaxTickerQuery } from '@/store/rtk-query/idax/idax-api';
import { useLazyMonxanshRateQuery } from '@/store/rtk-query/monxansh/monxansh-api';
import React, { useState, useMemo, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

type Props = {}

export default function EarlyTicketFeature({ }: Props) {

    const [ardxToUsdRate, setArdxToUsdRate] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [callMonxanshRate] = useLazyMonxanshRateQuery()
    const [callIdaxTicker] = useLazyIdaxTickerQuery()
    const { data: ticketData, isLoading: isTicketsLoading } = useGetTicketOrAssetQuery({ tag: 'early' })
    const ticket = useMemo(() => ticketData?.result?.records[0], [ticketData])

    useEffect(() => {
        if (!ticket) {
            return;
        }
        (async () => {
            setIsLoading(true)
            try {
                await fetchArdxToUsdRate()
            } catch (e) {
                console.log(`rate error:`)
                console.log(e)
            }
            setIsLoading(false)
        })()
    }, [ticket])

    const fetchArdxToUsdRate = async () => {
        const [usdMntRate, ardxMntRate] = await Promise.all([
            callMonxanshRate({ currency: 'USD|MNT' }).unwrap(),
            callIdaxTicker({ symbol: 'ardx1557mont' }).unwrap()
        ]);
        const usdRate = usdMntRate.find((r) => r.code === 'USD');
        if (usdRate) {
            const ardxToUsd = parseFloat(ardxMntRate.last) / usdRate.rate_float
            setArdxToUsdRate(ardxToUsd)
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
    if (!ardxToUsdRate) {
        return <p>An error occured. Please try reload the page.</p>
    }
    return (
        <div>
            <EarlyTicketSection ticket={ticket} priceToUsdRate={ardxToUsdRate} />
        </div>
    )
}