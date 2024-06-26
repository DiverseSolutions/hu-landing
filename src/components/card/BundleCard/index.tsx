import { CATEGORY_COLORS } from '@/lib/consts';
import { getIdaxCookie } from '@/lib/cookie';
import { formatPrice } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useUsdToArdxRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api';
import { ArdArtBundleRecord } from '@/store/rtk-query/hux-ard-art/types';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

type Props = {
    bundle: ArdArtBundleRecord
}

function BundleCard({ bundle }: Props) {

    const router = useRouter()
    const { data: usdToArdx } = useUsdToArdxRateQuery()

    const authSession = useAppSelector(state => state.auth.session)

    return (
        <>
            <div onClick={() => {
                if (authSession === 'idax-wv') {
                    const { idaxExToken } = getIdaxCookie()
                    if (!idaxExToken) {
                        toast('Please Log In to your IDAX Account', {
                            type: 'info'
                        })
                        return
                    }
                }
                router.push(`/bundle?id=${bundle.id}`)
            }} className='relative w-full p-0 cursor-pointer card'>
                <div className="p-0 card-body">
                    <div className="w-full relative h-[330px] rounded-xl overflow-hidden">
                        <img src={bundle.imageUrl} className="object-top object-cover transform hover:scale-[1.1] transition-all duration-200 w-full h-full" />
                        {bundle.category?.length ? (
                            <div className="absolute top-4 left-4">
                                <div style={{
                                    backgroundColor: CATEGORY_COLORS[bundle.category] || '',
                                }} className={classNames(`flex capitalize items-center px-2 py-1 text-xs rounded-xl text-white font-bold`)}>
                                    {bundle.category}
                                </div>
                            </div>
                        ) : (<></>)}
                        <div className="absolute bottom-4 left-4">
                            <div className="flex capitalize items-center px-2 py-1 text-xs rounded-xl bg-[#D63333] text-white font-bold">
                                Bonus ARDX{formatPrice(bundle.depositAmount)}
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className="text-xs md:text-sm text-black text-opacity-[0.65] font-light">Powered by Ard & Metaforce</p>
                        <p className="text-base md:text-xl text-black text-opacity-[0.93]">
                            {bundle.name}
                        </p>
                        <div className="flex items-center justify-start mt-2">
                            <span className="text-sm md:text-xl font-bold text-black text-opacity-[0.93]">
                                ${formatPrice(bundle.price)}
                            </span>
                            {usdToArdx ? (
                                <span className="rounded-[4px] px-2 py-1 text-opacity-[0.65] font-light text-xs ml-[6px] bg-black bg-opacity-[0.04]">
                                    {formatPrice(bundle.price * usdToArdx)} ARDX
                                </span>
                            ) : (<ClipLoader size={12} />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BundleCard