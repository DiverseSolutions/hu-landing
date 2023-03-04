import classNames from 'classnames'
import React, { useState } from 'react'

import { CategoryItemType } from './types'

type Props = {
    defaultValues: CategoryItemType[];
    activeValues: CategoryItemType[];
    onChanged?: (v: CategoryItemType[]) => void
}

function CategorySelectList({ onChanged, activeValues, defaultValues }: Props) {

    const [activeList, setActiveList] = useState<CategoryItemType[]>([])

    return (
        <div className="flex space-x-4">
            {defaultValues.map((c) => {
                const isActive = activeValues.find((a) => a.id === c.id) ? true : false
                return <button key={c.id}
                    onClick={() => {
                        if (isActive) {
                            const newVal = activeList.filter((a) => a.id !== c.id)
                            setActiveList(newVal)
                            if (onChanged) {
                                onChanged(newVal)
                            }
                        } else {
                            const newVal = [...activeList, c]
                            setActiveList(newVal)
                            if (onChanged) {
                                onChanged(newVal)
                            }
                        }
                    }}
                    className={classNames('bg-black hover:bg-black transition-all duration-300 hover:text-white font-bold cursor-pointer rounded-xl px-5 py-[14px]',
                        {
                            'bg-black text-white ': isActive,
                            'text-black text-opacity-[0.65] bg-opacity-[0.04]': !isActive
                        })}>{c.name}</button>
            })}
        </div>
    )
}

export default CategorySelectList