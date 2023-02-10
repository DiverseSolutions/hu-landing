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
                value: <span className="font-bold text-sm opacity-[0.65]">Windows® 7/Vista/XP</span>,
            },
            {
                name: 'Processor',
                value: <span className="font-bold text-sm opacity-[0.65] text-right">Intel® Core™ 2 Duo E6600 or<br />AMD Phenom™ X3 8750 <br />processor or better</span>
            },
            {
                name: 'Memory',
                value: <span className="font-bold text-sm opacity-[0.65]">2GB RAM</span>
            },
            {
                name: 'Graphics',
                value: <span className="font-bold text-sm opacity-[0.65] text-right">Video card must be 256 MB or<br />more and should be a DirectX 9-<br />compatible with support for Pixel<br />Shader 3.0</span>
            },
            {
                name: 'DirectX',
                value: <span className="font-bold text-sm opacity-[0.65]">Version 9.0c</span>
            },
            {
                name: 'Storage',
                value: <span className="font-bold text-sm opacity-[0.65]">15 GB available space</span>
            },
        ]
    },
    {
        name: 'macOS',
    },
    {
        name: 'Linux',
    },
]

function SystemRequirementsSection() {

    const [activeIndex, setActiveIndex] = useState(systemRequirementSpecs[0].name)
    const [isRequirementsVisible, setIsRequirementsVisible] = useState(true)
    const fields = useMemo(() => {
        const spec = systemRequirementSpecs.find((spec) => spec.name === activeIndex)
        return spec?.fields || []
    }, [activeIndex, systemRequirementSpecs])

    return (
        <div>
            <div className="flex items-center mt-6 ml-4">
                <p className="text-2xl font-bold">System Requirements</p>
                <span className="ml-2"><AlertWarningSvg /></span>
            </div>
            <div className="mt-6">
                <div className="border-2 p-6 rounded-xl border-black border-opacity-[0.2] space-y-4">
                    <div className="flex justify-between w-full">
                        <div className="flex">
                            <div className="mb-4 tabs">
                                {systemRequirementSpecs.map((spec) => (
                                    <a key={spec.name} onClick={() => setActiveIndex(spec.name)} className={classNames('text-base tab', { 'tab-active tab-bordered border-b': activeIndex === spec.name })}>{spec.name}</a>
                                ))}
                            </div>
                        </div>
                        <div className="flex cursor-pointer">
                            {isRequirementsVisible ? <MdExpandMore onClick={() => setIsRequirementsVisible(false)} size={24} /> : <MdExpandLess onClick={() => setIsRequirementsVisible(true)} size={24} />}
                        </div>
                    </div>
                    {isRequirementsVisible ? (
                        <div>
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