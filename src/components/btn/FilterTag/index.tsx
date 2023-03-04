import React from 'react'

type Props = {
    name: string
}

function FilterTag({ ...props }: Props) {
    return (
        <button className='bg-black hover:bg-black transition-all duration-300 hover:text-white font-bold cursor-pointer text-black text-opacity-[0.65] bg-opacity-[0.04] rounded-xl px-5 py-[14px]'>{props.name}</button>
    )
}

export default FilterTag