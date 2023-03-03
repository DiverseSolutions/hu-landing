import React, { useState } from 'react'
import BundleCard from '@/components/card/BundleCard'
import { useGetBundleQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { ClipLoader } from 'react-spinners'
import FilterTag from '@/components/btn/FilterTag'

import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

type Props = {}

const FILTERS = ['Legendary', 'Epic', 'Rare', 'Common']
const bundles = []

function BundlesSection({ }: Props) {

    const [isShowAll, setIsShowAll] = useState(false)
    const { data: bundleData, isLoading: isBundleLoading } = useGetBundleQuery()

    return (
        <>
            <div className='flex flex-col items-center w-full'>
                <div className="container">
                    <p className="font-bold text-[32px]">
                        Bundles
                    </p>
                    <div className="mt-8">
                        <div className="flex justify-between w-full">
                            <div className="flex space-x-4">
                                {FILTERS.map((f) => <FilterTag key={f} name={f} />)}
                            </div>
                            <div className='flex space-x-4'>
                                <div className="font-bold cursor-pointer rounded-xl bg-black bg-opacity-[0.04] px-6 py-[14px]">
                                    Show all ({bundleData?.result?.count || 0})
                                </div>
                                <div className="rounded-xl cursor-pointer flex justify-center items-center bg-black bg-opacity-[0.04]">
                                    <div className="flex items-center justify-center w-12 h-12">
                                        <MdChevronLeft />
                                    </div>
                                </div>
                                <div className="rounded-xl cursor-pointer flex justify-center items-center bg-black bg-opacity-[0.04]">
                                    <div className="flex items-center justify-center w-12 h-12">
                                        <MdChevronRight />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-screen">
                    <div className="flex justify-center mt-8 overflow-auto no-scrollbar">
                        <div className="container overflow-x-visible">
                            {isBundleLoading ? (<ClipLoader />) : (<></>)}
                            {!isBundleLoading && bundleData?.result?.records?.length ? (
                                <>
                                    <div className="flex space-x-4">
                                        {bundleData.result.records.map((bundle) => (
                                            <div className="flex cursor-pointer">
                                                <BundleCard key={bundle.id}
                                                    bundle={bundle}
                                                />
                                            </div>
                                        ))}
                                        <div className="w-[200px]">
                                        </div>
                                    </div>
                                </>
                            ) : (<></>)}
                        </div>
                    </div>
                    <div className="absolute top-0 bottom-0 right-0 z-10 w-[40px]" style={{
                        background: `linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)`,
                        transform: `matrix(-1, 0, 0, 1, 0, 0)`
                    }}>

                    </div>
                </div>
            </div>
        </>
    )
}

export default BundlesSection