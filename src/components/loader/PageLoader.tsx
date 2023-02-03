import React from 'react'
import { ClipLoader } from 'react-spinners';

type Props = {
    classNames?: string;
}

export default function PageLoader({ classNames: pclassNames }: Props) {
    return (
        <div className={pclassNames || 'w-full h-[70vh] flex justify-center items-center'}>
            <ClipLoader />
        </div>
    )
}