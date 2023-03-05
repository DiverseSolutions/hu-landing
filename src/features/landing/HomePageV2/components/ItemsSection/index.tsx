import ItemCard from '@/components/card/ItemCard'
import CategorySelectList from '@/components/common/CategorySelectList'
import { CategoryItemType } from '@/components/common/CategorySelectList/types'
import { ASSET_CATEGORY } from '@/lib/consts'
import { useGetBundleQuery, useGetTicketOrAssetQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import React, { useState, useMemo } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {}

const assetCategories: CategoryItemType[] = ASSET_CATEGORY.map((a) => ({
    id: a.slug,
    name: a.name
}))

function ItemsSection({ }: Props) {

    const { data: assetsData, isLoading: isAssetLoading } = useGetTicketOrAssetQuery()

    const [activeCategory, setActiveCategory] = useState<CategoryItemType[]>([])

    const visibleItems = useMemo(() => {
        if (assetsData?.result?.records?.length) {
            if (!activeCategory?.length) {
                return assetsData?.result?.records
            }
            return assetsData?.result?.records.filter((item) => activeCategory.find((a) => a.id === item.category))
        }
        return []
    }, [assetsData, activeCategory])

    return (
        <>
            <div className='flex flex-col items-center w-full'>
                <div className="container px-2 md:px-0">
                    <p className="font-bold text-[32px]">
                        The Hu in the metaverse collection
                    </p>
                    <div className="mt-8">
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