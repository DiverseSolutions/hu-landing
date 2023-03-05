import ItemCard from '@/components/card/ItemCard'
import CategorySelectList from '@/components/common/CategorySelectList'
import { CategoryItemType } from '@/components/common/CategorySelectList/types'
import { ASSET_CATEGORY } from '@/lib/consts'
import { useGetBundleQuery, useGetTicketOrAssetQuery, useLazyGetTicketOrAssetQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { ArdArtTicketOrAssetRecord } from '@/store/rtk-query/hux-ard-art/types'
import classNames from 'classnames'
import React, { useState, useMemo, useEffect } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {}

const assetCategories: CategoryItemType[] = ASSET_CATEGORY.map((a) => ({
    id: a.slug,
    name: a.name
}))


function ItemsSection({ }: Props) {

    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(10)
    const [activeCategory, setActiveCategory] = useState<CategoryItemType[]>([])
    const [data, setData] = useState<ArdArtTicketOrAssetRecord[]>([])

    const [callTicketOrAsset, { isFetching: isDataFetching, isLoading: isAssetLoading }] = useLazyGetTicketOrAssetQuery()

    useEffect(() => {
        (async () => {
            const isTicket = activeCategory.find((a) => a.id === 'ticket')
            const r = await callTicketOrAsset({
                offset,
                limit,
                type: isTicket ? 'ticket' : undefined
            }).unwrap()
            if (r.result?.records?.length) {
                setData([...data, ...r.result.records])
            }
        })()
    }, [offset, limit, activeCategory])

    const visibleItems = useMemo(() => {
        if (data.length) {
            if (!activeCategory?.length) {
                return data
            }
            return data.filter((item) => activeCategory.find((a) => a.id === item.category || a.id === item.tag || a.id === item.type))
        }
        return []
    }, [data, activeCategory])

    return (
        <>
            <div id="items-section" className='flex flex-col items-center w-full'>
                <div className="container px-2 md:px-0">
                    <p className="font-bold text-[24px] md:text-[32px]">
                        The Hu in the metaverse collection
                    </p>
                    <div className="mt-8 max-w-[100vw] overflow-x-auto no-scrollbar">
                        <CategorySelectList defaultValues={assetCategories} onChanged={setActiveCategory} activeValues={activeCategory} />
                    </div>
                </div>
                <div className="relative w-screen">
                    <div className="flex flex-wrap justify-center max-w-full mt-8">
                        <div className="container px-2 overflow-x-visible md:px-0">
                            {isAssetLoading ? (<ClipLoader />) : (<></>)}
                            <div className="w-full">
                                {!isAssetLoading && visibleItems?.length ? (
                                    <>
                                        <div className="grid grid-cols-2 gap-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-5">
                                            {visibleItems.map((item) => (
                                                <div key={item.id} className="flex cursor-pointer">
                                                    <ItemCard
                                                        item={item}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (<></>)}
                            </div>
                            <div className="w-full">
                                <div className="flex justify-center w-full mt-8">
                                    <button onClick={() => {
                                        setOffset(offset + 1)
                                    }} className={classNames("btn w-full md:w-auto btn-black px-4 py-[14px] rounded-xl", {
                                        'loading': isDataFetching
                                    })}>Load more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemsSection