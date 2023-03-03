import { ArdArtBundleDetailResult } from '@/store/rtk-query/hux-ard-art/types'
import React from 'react'

type Props = {
    bundle: ArdArtBundleDetailResult
}

function BundleDetailFeature({
    bundle
}: Props) {

    return (
        <>
            <p>bundle</p>
            {bundle.name}
        </>
    )
}

export default BundleDetailFeature