import BundleCard from '@/components/card/BundleCard'
import { useGetBundleQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import React from 'react'

type Props = {}

export default function BundleFeature({ }: Props) {

    const { data: bundleData, isLoading: isBundleLoading } = useGetBundleQuery()

    return (
        <div>
            {isBundleLoading ? <div className='loading'></div> : <></>}
            <div className="flex justify-center w-full">
                <div className="container">
                    <div className='my-8 mt-16'>
                        <h4 className='text-4xl font-bold'>Buy Bundle</h4>
                    </div>
                    <div className="flex flex-wrap space-x-4 space-y-4">
                        {bundleData?.result?.records?.length ? (
                            bundleData.result.records.map((b) => {
                                return (
                                    <BundleCard key={b.id} bundle={b} />
                                )
                            })
                        ) : (<></>)}
                    </div>
                </div>
            </div>
        </div>
    )
}