import ItemCard from '@/components/card/ItemCard'
import { useGetBundleQuery, useGetTicketOrAssetQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import React from 'react'
import { ClipLoader } from 'react-spinners'
import FilterTag from './components/FilterTag'

type Props = {}

const FILTERS = ['Legendary', 'Epic', 'Rare', 'Common']

function ItemsSection({ }: Props) {

    const { data: bundleData, isLoading: isBundleLoading } = useGetBundleQuery()
    const { data: assetsData, isLoading: isAssetLoading } = useGetTicketOrAssetQuery()

    return (
        <>
            <div className='flex flex-col items-center w-full'>
                <div className="container">
                    <p className="font-bold text-[32px]">
                        The Hu in the metaverse collection
                    </p>
                    <div className="mt-8">
                        <div className="flex justify-between w-full">
                            <div className="flex space-x-4">
                                {FILTERS.map((f) => <FilterTag key={f} name={f} />)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-screen">
                    <div className="flex flex-wrap justify-center max-w-full mt-8">
                        <div className="container overflow-x-visible">
                            {isBundleLoading ? (<ClipLoader />) : (<></>)}
                            <div className="flex justify-center w-full -ml-4 -mr-4">
                                {!isAssetLoading && assetsData?.result?.records?.length ? (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-5">
                                            {assetsData?.result?.records.map((item) => (
                                                <div className="flex m-4 cursor-pointer">
                                                    <ItemCard key={item.id}
                                                        item={item}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (<></>)}
                            </div>
                            <div className="flex justify-center w-full mt-8">
                                <div className="btn btn-black rounded-xl">Load more</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemsSection