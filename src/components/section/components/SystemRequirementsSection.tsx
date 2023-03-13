import classNames from 'classnames';
import React, { useState, useMemo } from 'react';
import AlertWarningSvg from '@/assets/svg/alert-warning.svg'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

const systemRequirementSpecs = [
    {
        name: 'Windows',
        fields: [
            {
                name: 'OS',
                value: <span className="font-bold text-sm opacity-[0.65]">Windows 10/11</span>,
            },
            {
                name: 'Processor',
                value: <span className="font-bold text-sm opacity-[0.65] text-right">Intel® Core™ i5-8500 Processor AMD Ryzen 5 3500</span>
            },
            {
                name: 'Memory',
                value: <span className="font-bold text-sm opacity-[0.65]">16GB RAM</span>
            },
            {
                name: 'Graphics',
                value: <span className="font-bold text-sm opacity-[0.65] text-right">GeForce GTX 1060 6GB or AMD RX580</span>
            },
            {
                name: 'DirectX',
                value: <span className="font-bold text-sm opacity-[0.65]">Version 12</span>
            },
            {
                name: 'Storage',
                value: <span className="font-bold text-sm opacity-[0.65]">20 GB available space</span>
            },
        ]
    },
]

type Props = {
    defaultVisible?: boolean
}
function SystemRequirementsSection({
    defaultVisible
}: Props) {

    const [activeIndex, setActiveIndex] = useState(systemRequirementSpecs[0].name)
    const [isRequirementsVisible, setIsRequirementsVisible] = useState(defaultVisible === undefined ? true : defaultVisible)
    const fields = useMemo(() => {
        const spec = systemRequirementSpecs.find((spec) => spec.name === activeIndex)
        return spec?.fields || []
    }, [activeIndex, systemRequirementSpecs])

    return (
        <div>
            <div className="flex items-center w-full mt-6 ml-4">
                <p className="text-2xl font-bold">System Requirements</p>
                <span className="ml-2"><AlertWarningSvg /></span>
            </div>
            <div className="w-full mt-6">
                <div className="border-2 p-6 rounded-xl border-black border-opacity-[0.2] space-y-4">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <div className="flex items-center w-full tabs">
                                {systemRequirementSpecs.map((spec) => (
                                    <a key={spec.name} onClick={() => setActiveIndex(spec.name)} className={classNames('text-base tab', { 'tab-active tab-bordered border-b': activeIndex === spec.name })}>{spec.name}</a>
                                ))}
                            </div>
                        </div>
                        <div className="flex cursor-pointer">
                            {isRequirementsVisible ? <MdExpandLess onClick={() => setIsRequirementsVisible(false)} size={24} /> : <MdExpandMore onClick={() => setIsRequirementsVisible(true)} size={24} />}
                        </div>
                    </div>
                    {isRequirementsVisible ? (
                        <div className='mt-8'>
                            {fields.map((field, idx) => (
                                <div key={field.name} className={classNames("flex w-full justify-between border-b border-black border-opacity-[0.1] pb-1", { 'mt-6': idx !== 0 })}>
                                    <span className="text-sm opacity-[0.65]">{field.name}:</span>
                                    {field.value}
                                </div>
                            ))}
                        </div>
                    ) : (<></>)}
                </div>
            </div>
        </div>
    )
}

export default SystemRequirementsSection