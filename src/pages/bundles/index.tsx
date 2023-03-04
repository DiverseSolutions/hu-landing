import BundleCard from '@/components/card/BundleCard'
import CategorySelectList from '@/components/common/CategorySelectList'
import { CategoryItemType } from '@/components/common/CategorySelectList/types'
import PageLoader from '@/components/loader/PageLoader'
import { BUNDLE_CATEGORY } from '@/lib/consts'
import { useGetBundleQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'

import { MdChevronLeft } from 'react-icons/md'
import { ClipLoader } from 'react-spinners'

type Props = {}

const bundleCategory = BUNDLE_CATEGORY.map((b) => ({
    id: b.slug,
    name: b.name,
}))

function Bundles({ }: Props) {

    const router = useRouter()
    const { data: bundleData, isLoading: isBundleLoading } = useGetBundleQuery()
    const [activeCategory, setActiveCategory] = useState<CategoryItemType[]>([])

    const visibleBundles = useMemo(() => {
        if (bundleData?.result?.records?.length) {
            if (!activeCategory?.length) {
                return bundleData.result.records
            }
            return bundleData.result.records.filter((b) => activeCategory.find((a) => a.id === b.category))
        }
        return []
    }, [bundleData, activeCategory])

    if (isBundleLoading) {
        return <PageLoader />
    }

    return (
        <div className='flex justify-center w-full'>
            <div className="flex flex-col items-center w-full">
                <div className="container">
                    <div className="flex">
                        <div onClick={() => {
                            router.back()
                        }} className="border cursor-pointer p-[14px] rounded-xl border-black border-opacity-[0.1]">
                            <MdChevronLeft size={24} />
                        </div>
                        <div className="flex ml-4">
                            <CategorySelectList defaultValues={bundleCategory} onChanged={setActiveCategory} activeValues={activeCategory} />
                        </div>
                    </div>
                </div>
                <div className="container mt-6">
                    {isBundleLoading ? <ClipLoader /> : <></>}
                    {!isBundleLoading && visibleBundles?.length ? (
                        <div>
                            <div className="w-full mt-6">
                                <div className="grid grid-cols-1 gap-x-2 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
                                    {visibleBundles.map((bundle) => (
                                        <BundleCard key={bundle.id} bundle={bundle} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (<></>)}
                </div>
            </div>
        </div>
    )
}

export default Bundles