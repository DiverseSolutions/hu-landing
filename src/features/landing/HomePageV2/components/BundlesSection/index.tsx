import React, { useState, useMemo } from 'react'
import BundleCard from '@/components/card/BundleCard'
import { useGetBundleQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { ClipLoader } from 'react-spinners'

import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import CategorySelectList from '@/components/common/CategorySelectList'
import { CategoryItemType } from '@/components/common/CategorySelectList/types'
import { BUNDLE_CATEGORY } from '@/lib/consts'
import Link from 'next/link'

type Props = {}

const bundleCategories: CategoryItemType[] = BUNDLE_CATEGORY.map((b) => ({
    id: b.slug,
    name: b.name
}))

function BundlesSection({ }: Props) {

    const { data: bundleData, isLoading: isBundleLoading } = useGetBundleQuery()

    const [activeCategory, setActiveCategory] = useState<CategoryItemType[]>([])

    const visibleBundles = useMemo(() => {
        if (bundleData?.result?.records?.length) {
            if (!activeCategory?.length) {
                return bundleData?.result?.records
            }
            return bundleData?.result?.records.filter((bundle) => activeCategory.find((a) => a.id === bundle.category))
        }
        return []
    }, [bundleData, activeCategory])

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
                                <CategorySelectList defaultValues={bundleCategories} activeValues={activeCategory} onChanged={setActiveCategory} />
                            </div>
                            <div className='flex space-x-4'>
                                <Link href="/bundles" className="font-bold cursor-pointer rounded-xl bg-black bg-opacity-[0.04] px-6 py-[14px]">
                                    Show all ({bundleData?.result?.count || 0})
                                </Link>
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
                            {!isBundleLoading && visibleBundles?.length ? (
                                <>
                                    <div className="flex flex-row space-x-4">
                                        {visibleBundles.map((bundle) => (
                                            <div key={bundle.id} className="cursor-pointer flex-grow flex-shrink-0 basis-[450px]">
                                                <BundleCard
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