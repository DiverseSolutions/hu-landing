import ItemCard from '@/components/card/ItemCard'
import CategorySelectList from '@/components/common/CategorySelectList'
import { CategoryItemType } from '@/components/common/CategorySelectList/types'
import { ASSET_CATEGORY } from '@/lib/consts'
import { useGetBundleQuery, useGetTicketOrAssetQuery, useLazyGetTicketOrAssetQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { ArdArtTicketOrAssetRecord } from '@/store/rtk-query/hux-ard-art/types'
import classNames from 'classnames'
import Link from 'next/link'
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

    const [callTicketOrAsset, { isFetching: isDataFetching, data: queryData, isLoading: isAssetLoading }] = useLazyGetTicketOrAssetQuery()

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
                <div className="container px-4 md:px-0">
                    <p className="font-bold text-[24px] md:text-[32px]">
                        Single item collection <span className='font-normal'>(Tickets not included!)</span>
                    </p>
                    <div className="mt-6 md:mt-8 md:max-w-[910px]">
                        <p className='text-[#B3B3B3] text-sm md:text-[20px]'>Collect and dress up your virtual avatar with traditional Mongolian garments.
                            Please note that single items do not include concert tickets. </p>
                    </div>
                    <div className="flex flex-col w-full mt-6 md:items-center md:justify-between md:flex-row md:mt-8">
                        <div className="max-w-[100vw] overflow-x-auto no-scrollbar">
                            <CategorySelectList defaultValues={assetCategories} onChanged={setActiveCategory} activeValues={activeCategory} />
                        </div>
                        <div className="flex mt-6 md:mt-0">
                            <Link href="/items" className="font-bold text-xs md:text-base cursor-pointer rounded-xl bg-black bg-opacity-[0.04] px-4 py-2.5 md:px-6 md:py-[14px]">
                                Show all ({queryData?.result?.count || 0})
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative w-screen">
                    <div className="flex flex-wrap justify-center max-w-full mt-8">
                        <div className="container px-4 overflow-x-visible md:px-0">
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