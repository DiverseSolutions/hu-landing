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
            return bundleData?.result?.records.filter((bundle) => activeCategory.find((a) => a.id === bundle.category || a.id === bundle.tag))
        }
        return []
    }, [bundleData, activeCategory])

    return (
        <>
            <div className='flex flex-col items-center w-full px-2 md:px-0'>
                <div className="container px-2 md:px-0">
                    <p className="font-bold px-2 md:px-0 text-[24px] md:text-[32px]">
                        Bundles
                    </p>
                    <div className="mt-6 md:mt-4">
                        <div className="flex flex-col justify-between w-full space-y-4 md:space-y-0 md:flex-row">
                            <div className="flex space-x-4 overflow-x-auto max-w-[100vw] no-scrollbar">
                                <CategorySelectList defaultValues={bundleCategories} activeValues={activeCategory} onChanged={setActiveCategory} />
                            </div>
                            <div className='hidden space-x-4 md:flex'>
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
                        <div className="container px-2 overflow-x-visible md:px-0">
                            {isBundleLoading ? (<ClipLoader />) : (<></>)}
                            {!isBundleLoading && visibleBundles?.length ? (
                                <>
                                    <div className="flex flex-row space-x-4">
                                        {visibleBundles.map((bundle) => (
                                            <div key={bundle.id} className="cursor-pointer flex-grow flex-shrink-0 basis-[80vw] md:min-w-[450px] md:basis-[30vw]">
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
                <div className="flex justify-center w-full px-2 mt-4 md:hidden md:px-0">
                    <Link href="/bundles" className="font-bold mx-2 md:mx-0 cursor-pointer w-full text-center rounded-xl bg-black bg-opacity-[0.04] px-6 py-[14px]">
                        Show all ({bundleData?.result?.count || 0})
                    </Link>
                </div>
            </div>
        </>
    )
}

export default BundlesSection