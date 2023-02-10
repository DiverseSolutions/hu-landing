import { ArdArtAssetDetailEarlyResult } from '@/store/rtk-query/hux-ard-art/types'
import React, { useMemo } from 'react'
import { sortBy as _sortBy } from 'lodash'

type MediaSectionProps = {
    ticket: ArdArtAssetDetailEarlyResult
}
function MediaSection({ ticket }: MediaSectionProps) {
    const sorted = useMemo(() => {
        return _sortBy(ticket.medias, 'order')
    }, [ticket?.medias])

    return (
        <div>
            <div className="grid w-full grid-cols-2 gap-x-4">
                {sorted[0] ? <img src={sorted[0].url} className="w-full h-auto rounded-lg" /> : <></>}
                {sorted[1] ? <img src={sorted[1].url} className="w-full h-auto rounded-lg" /> : <></>}
            </div>
            {sorted[2] ? (
                <div className="mt-4">
                    <img src={sorted[2].url} className="w-full h-auto rounded-lg" />
                </div>
            ) : (<></>)}
        </div>
    )
}

export default MediaSection