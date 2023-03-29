import DirectorCutVideo from '@/components/video/DirectorCutVideo'
import { useHelperLiveQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'

type Props = {}

function DirectorCutVideoFeature({ }: Props) {

    const { data, error } = useHelperLiveQuery()

    if (error) {
        return <p>{`${error}`}</p>
    }

    if (!data?.result) {
        return <></>
    }

    return (
        <>
            <div className='flex flex-col items-center w-full mt-8'>
                <DirectorCutVideo live={data?.result} />
            </div>
        </>
    )
}

export default DirectorCutVideoFeature