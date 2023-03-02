import BundleCard from '@/components/card/BundleCard'
import { useGetBundleQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import React from 'react'
import { ClipLoader } from 'react-spinners'
import FilterTag from './components/FilterTag'

type Props = {}

const FILTERS = ['Legendary', 'Epic', 'Rare', 'Common']
const bundles = []

function BundlesSection({ }: Props) {

    const { data: bundleData, isLoading: isBundleLoading } = useGetBundleQuery()

    return (
        <>
            <div>
                <p className="font-bold text-[32px]">
                    Bundles
                </p>
                <div className="flex mt-8 space-x-4">
                    {FILTERS.map((f) => <FilterTag key={f} name={f} />)}
                </div>
                <div className="mt-8">
                    {isBundleLoading ? (<ClipLoader />) : (<></>)}
                    {!isBundleLoading && bundleData?.result?.records?.length ? (
                        <div className="flex">
                            {bundleData.result.records.map((bundle) => (
                                <div className="flex cursor-pointer">
                                    <BundleCard key={bundle.id}
                                        bundle={bundle}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (<></>)}
                </div>
            </div>
        </>
    )
}

export default BundlesSection