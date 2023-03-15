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
                <div className="container hidden w-full px-2 mt-6 text-left md:px-0 md:block">
                    <div className="md:max-w-[910px]">
                        <p className='text-[#B3B3B3] text-sm md:text-[20px]'>Bundles include concert tickets, avatars and signature movements for a discounted price</p>
                    </div>
                </div>
                <div className="container px-2 mt-4 md:mt-8 md:px-0">
                    <div className="flex max-w-[100vw] overflow-x-auto no-scrollbar">
                        <div onClick={() => {
                            router.back()
                        }} className="border cursor-pointer p-2.5 md:p-[14px] rounded-xl border-black border-opacity-[0.1]">
                            <span className='hidden md:block'><MdChevronLeft size={24} /></span>
                            <span className='md:hidden'><MdChevronLeft size={22} /></span>
                        </div>
                        <div className="flex ml-4">
                            <CategorySelectList defaultValues={bundleCategory} onChanged={setActiveCategory} activeValues={activeCategory} />
                        </div>
                    </div>
                </div>
                <div className="container w-full px-2 mt-6 text-left md:hidden md:px-0">
                    <div className="md:max-w-[910px]">
                        <p className='text-[#B3B3B3] text-sm md:text-[20px]'>Bundles include concert tickets, avatars and signature movements for a discounted price</p>
                    </div>
                </div>
                <div className="container px-2 mt-6 md:px-0">
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