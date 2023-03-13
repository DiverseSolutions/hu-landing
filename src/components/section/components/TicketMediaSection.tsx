import { ArdArtAssetDetailByIDResult } from '@/store/rtk-query/hux-ard-art/types'
import React, { useMemo } from 'react'
import { sortBy as _sortBy } from 'lodash'
import Media1Img from '@/assets/img/media1.jpg'
import Media2Img from '@/assets/img/media2.jpg'
import Media3Img from '@/assets/img/media3.jpg'

type TicketMediaSectionProps = {
    ticket: ArdArtAssetDetailByIDResult
}
function TicketMediaSection({ ticket }: TicketMediaSectionProps) {
    const sorted = useMemo(() => {
        return _sortBy(ticket.medias, 'order')
    }, [ticket?.medias])

    return (
        <div>
            <div className="grid w-full grid-cols-2 gap-x-4">
                <img src={Media1Img.src} className="w-full h-auto rounded-lg" />
                <img src={Media2Img.src} className="w-full h-auto rounded-lg" />
            </div>
            <div className="mt-4">
                <img src={Media3Img.src} className="w-full h-auto rounded-lg" />
            </div>
        </div>
    )
}

export default TicketMediaSection