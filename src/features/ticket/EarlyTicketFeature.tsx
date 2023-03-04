import EarlyTicketSection from '@/components/section/EarlyTicketSection';
import { useAppDispatch } from '@/store/hooks';
import { pageError } from '@/store/reducer/error-reducer/actions';
import { useAssetDetailEarlyQuery, useLazyMonxanshRateQuery, useUsdToArdxRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api';
import { useLazyIdaxTickerQuery } from '@/store/rtk-query/idax-openapi/idax-openapi';
import React, { useState, useMemo, useEffect } from 'react';

import { ClipLoader } from 'react-spinners';

type Props = {}

export default function EarlyTicketFeature({ }: Props) {

    const { data: ticketData, isLoading: isTicketsLoading } = useAssetDetailEarlyQuery()
    const ticket = useMemo(() => ticketData?.result, [ticketData])
    const dispatch = useAppDispatch()
    const { data: usdToArdxRate, isLoading: isRateLoading } = useUsdToArdxRateQuery()

    useEffect(() => {
        if (!isRateLoading && !usdToArdxRate) {
            dispatch(pageError({
                message: `Currency Rate Error occured. Please try reload the page.`
            }))
        }
    }, [usdToArdxRate, isRateLoading])


    const isLoading = useMemo(() => {
        return !ticket && !usdToArdxRate
    }, [isRateLoading, isTicketsLoading])

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
            <EarlyTicketSection ticket={ticket} usdToArdx={usdToArdxRate} />
        </div>
    )
}