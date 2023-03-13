import { formatPrice } from '@/lib/utils'
import { useUsdToArdxRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { ArdArtMyOwnedNftRecord } from '@/store/rtk-query/hux-ard-art/types'
import { ClipLoader } from 'react-spinners'
import HeartSvg from './img/heart.svg'

type Props = {
    nft: ArdArtMyOwnedNftRecord,
    onSend: () => void,
}

export default function MyNftCard({ nft, onSend }: Props) {

    const { data: usdToArdx } = useUsdToArdxRateQuery()

    return (
        <div onClick={onSend} className='relative w-full p-0 cursor-pointer card group'>
            <div className="p-0 card-body">
                <div className="w-full group relative h-[200px] md:h-[350px] rounded-xl overflow-hidden">
                    <img src={nft.imageUrl} className="object-cover transform transition-all duration-200 hover:scale-[1.1] w-full h-full" />
                    <div className="absolute top-4 left-4">
                    </div>
                    <div className='absolute left-0 right-0 hidden pointer-events-auto bottom-4 md:group-hover:block'>
                        <div className="flex justify-center w-full">
                            <div onClick={(e) => {
                                e.stopPropagation()
                                onSend()
                            }} className="py-2 text-sm px-[14px] font-bold flex justify-center items-center rounded-xl bg-white bg-opacity-[0.93]">Send NFT</div>
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <p className="md:text-sm text-xs font-light text-black text-opacity-[0.65]">Powered by Ard & Metaforce</p>
                    <p className="md:text-base text-sm font-light text-black text-opacity-[0.93]">
                        {nft.name}
                    </p>
                    <div className="flex items-center mt-2">
                        <span className="md:text-xl text-sm font-bold text-black text-opacity-[0.93]">
                            ${formatPrice(nft.price)}
                        </span>
                        {usdToArdx ? (
                            <span className="rounded-[4px] text-xs px-2 py-1 text-opacity-[0.65] font-light md:text-xs ml-[6px] bg-black bg-opacity-[0.04]">
                                {formatPrice(nft.price * usdToArdx)} ARDX
                            </span>
                        ) : (<ClipLoader size={12} />)}
                    </div>
                </div>
            </div>
            {nft.tag?.length ? (
                <div className="absolute top-2 left-2 md:top-4 md:left-4">
                    <div className="flex capitalize items-center px-2 py-1 text-xs rounded-xl bg-[#2087FF] text-white font-light">
                        {nft.tag}
                    </div>
                </div>
            ) : (<></>)}
            <div className="absolute hidden group:hover:flex justify-center items-center rounded-xl p-2.5 md:top-4 md:right-4 top-2 right-2 bg-white bg-opacity-[0.93] aspect-square">
                <HeartSvg />
            </div>
        </div>
    )
}