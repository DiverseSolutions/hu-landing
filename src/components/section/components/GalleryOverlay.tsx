import { ArdArtAssetDetailEarlyResult } from '@/store/rtk-query/hux-ard-art/types'
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'

type Props = {
    ticket: ArdArtAssetDetailEarlyResult
}

function GalleryOverlay({ ticket }: Props) {

    const [activeIdx, setActiveIdx] = useState(0)

    return (
        <>
            <input type="checkbox" id="ticket-media-modal" className="modal-toggle" />
            <div className="w-full modal" onClick={() => {
                document.getElementById('ticket-media-modal')?.click()
            }}>
                <div className="modal-box max-w-[80vw] md:max-w-[60vw]">
                    <div className="flex flex-col w-full">
                        <label className='mb-8 cursor-pointer' onClick={() => {
                            document.getElementById('ticket-media-modal')?.click()
                        }} htmlFor='ticket-media-modal'><MdClose /></label>
                        {ticket.medias.map((media) => (
                            <div key={media.id} className="w-full my-8">
                                <img src={media.url} className="object-contain w-full h-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GalleryOverlay