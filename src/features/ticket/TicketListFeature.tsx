import TicketCard from '@/components/card/TicketCard';
import { useGetTicketOrAssetQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

type Props = {}

export default function TicketListFeature({ }: Props) {

    const { data: ticketData, isLoading: isTicketsLoading } = useGetTicketOrAssetQuery({ type: 'ticket' })
    return (
        <div>
            <div className="flex justify-center w-full">
                <div className="container">
                    <div className='my-8 mt-16'>
                        <h4 className='text-4xl font-bold'>Buy Ticket</h4>
                    </div>
                    {isTicketsLoading ? <ClipLoader /> : <></>}
                    <div className="flex flex-wrap space-x-4 space-y-4">
                        {ticketData?.result?.records?.length ? (
                            ticketData.result?.records.map((t) => {
                                return (
                                    <TicketCard key={t.id} ticket={t} />
                                )
                            })
                        ) : (<></>)}
                    </div>
                </div>
            </div>
        </div>
    )
}