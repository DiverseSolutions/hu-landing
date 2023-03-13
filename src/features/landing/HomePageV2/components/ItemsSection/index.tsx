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
    const [categoryFilterKey, setCategoryFilterKey] = useState<string>()
    const [activeCategory, setActiveCategory] = useState<CategoryItemType[]>([])
    const [data, setData] = useState<ArdArtTicketOrAssetRecord[]>([])

    const [callTicketOrAsset, { isFetching: isDataFetching, isLoading: isAssetLoading }] = useLazyGetTicketOrAssetQuery()

    useEffect(() => {
        (async () => {
            const isTicket = activeCategory.find((a) => a.id === 'ticket')
            const categoryParam = activeCategory.map((a) => a.id)
            const currentCategoryFilterKey = categoryParam.join(',')
            setCategoryFilterKey(currentCategoryFilterKey)
            const r = await callTicketOrAsset({
                offset,
                limit,
                type: isTicket ? 'ticket' : undefined,
                ...(activeCategory?.length ? {
                    category: categoryParam
                } : {})
            }).unwrap()
            if (r.result?.records?.length) {
                if (currentCategoryFilterKey === categoryFilterKey) {
                    setData([...data, ...r.result.records])
                } else {
                    setData(r.result.records)
                }
            }
        })()
    }, [offset, limit, activeCategory])

    const visibleItems = useMemo(() => {
        if (data.length) {
            if (!activeCategory?.length) {
                return data.filter((d) => d.price && d.IsPurchasable)
            }
            return data.filter((item) => {
                return item.price && item.IsPurchasable && activeCategory.find((a) => a.id === item.category || a.id === item.tag || a.id === item.type)
            })
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
                    <div className="mt-6 md:mt-8 md:max-w-[910px]">
                        <p className='text-[#B3B3B3] text-sm md:text-[24px]'>Collect and dress up your virtual avatar with traditional Mongolian garments</p>
                        <p className='text-[#FF000080] text-sm md:text-[24px] mt-2'>(Single items do not include tickets)</p>
                    </div>
                    <div className="mt-6 md:mt-8 max-w-[100vw] overflow-x-auto no-scrollbar">
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