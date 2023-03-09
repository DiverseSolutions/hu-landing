import React, { useRef, useEffect } from 'react'
import { MdClose } from 'react-icons/md'

type Props = {
    modelUrl: string,
    imageUrl: string,
    isOpen: boolean,
    onClose: () => void,
}

function ModelModal({ modelUrl, imageUrl, isOpen, onClose }: Props) {

    const modelModalRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!modelModalRef.current) {
            return
        }
        if (isOpen) {
            console.log('show modal')
            if (!modelModalRef.current.checked) {
                modelModalRef.current.click()
            }
        } else {
            handleClose()
        }
    }, [isOpen, modelModalRef.current])

    const handleClose = () => {
        if (modelModalRef.current) {
            if (modelModalRef.current.checked) {
                modelModalRef.current.click()
                onClose()
            }
        }
    }


    return (
        <>
            <input ref={modelModalRef} type="checkbox" id="model-modal" className="modal-toggle" onChange={(v) => {
            }} />
            <div className="modal backdrop-blur-[7.5px] w-full h-full bg-black bg-opacity-[0.4]" onClick={() => {
                handleClose()
            }}>
                <div className="relative w-screen h-screen max-w-full max-h-full overflow-hidden bg-transparent shadow-none modal-box" onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <div dangerouslySetInnerHTML={{
                        __html: `<model-viewer autoplay loading="eager" style="height: 100vh; width: 100vw;" poster="${imageUrl}" src="${modelUrl}" ar crossorigin="anonymous" camera-controls touch-action="pan-y"></model-viewer>`
                    }}>

                    </div>
                    <span className="absolute cursor-pointer top-10 right-[30%]">
                        <MdClose color="white" size={48} onClick={() => {
                            handleClose()
                        }} />
                    </span>
                </div>
            </div>
        </>
    )
}

export default ModelModal