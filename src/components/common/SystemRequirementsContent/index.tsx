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
            {
                name: 'Download Link',
                value: <a href="https://d36xgupx7xb4yr.cloudfront.net/public/TheHU.rar" rel="noreferrer" target="_blank" className="font-bold text-sm text-opacity-[0.93] bg-black bg-opacity-[0.93] text-white rounded-xl p-1 px-4 py-2">Windows Download</a>
            },
        ]
    },
    {
        name: 'MacOS',
        fields: [
            {
                name: 'Name',
                value: <span className="font-bold text-sm opacity-[0.65]">Macbook Pro 2021</span>,
            },
            {
                name: 'Processor',
                value: <span className="font-bold text-sm opacity-[0.65] text-right">Apple M1 pro chip</span>
            },
            {
                name: 'Memory',
                value: <span className="font-bold text-sm opacity-[0.65]">16GB RAM</span>
            },
            {
                name: 'OS',
                value: <span className="font-bold text-sm opacity-[0.65]">MacOS 13 Ventura</span>
            },
            {
                name: 'Storage',
                value: <span className="font-bold text-sm opacity-[0.65]">20 GB available space</span>
            },
            {
                name: 'Download Link',
                value: <a href="https://d36xgupx7xb4yr.cloudfront.net/public/TheHU.app.zip" rel="noreferrer" target="_blank" className="font-bold text-sm text-opacity-[0.93] bg-black bg-opacity-[0.93] text-white rounded-xl p-1 px-4 py-2">MacOS Download</a>
            },
        ]
    },
    {
        name: 'Doesn’t meet the requirements?',
        content: `No problem, we got you covered! In our exclusive, cinematic version of the director’s cut edition you will be able to view the FULL concert from the comfort of your home or wherever you have internet access.`
    },
]

type Props = {
    defaultVisible?: boolean
}

function SystemRequirementsContent({
    defaultVisible
}: Props) {

    const [activeIndex, setActiveIndex] = useState(systemRequirementSpecs[0].name)
    const specs = useMemo(() => {
        const spec = systemRequirementSpecs.find((spec) => spec.name === activeIndex)
        return {
            fields: spec?.fields || [],
            content: spec?.content || undefined
        }
    }, [activeIndex, systemRequirementSpecs])

    return (
        <div className="w-full h-full">
            <div className="h-full p-6 space-y-4">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <div className="flex items-center w-full tabs">
                            {systemRequirementSpecs.map((spec) => (
                                <a key={spec.name} onClick={() => setActiveIndex(spec.name)} className={classNames('text-sm md:text-base tab', { 'tab-active tab-bordered border-b': activeIndex === spec.name })}>{spec.name}</a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='h-full mt-8'>
                    {specs?.fields ? (specs?.fields.map((field, idx) => (
                        <div key={field.name} className={classNames("flex w-full justify-between border-b border-black border-opacity-[0.1] pb-1", { 'mt-6': idx !== 0 })}>
                            <span className="text-sm opacity-[0.65]">{field.name}:</span>
                            {field.value}
                        </div>
                    ))) : <></>}
                    {specs?.content ? (
                        <div dangerouslySetInnerHTML={{
                            __html: specs.content
                        }}>

                        </div>
                    ) : (<></>)}
                </div>
            </div>
        </div>
    )
}

export default SystemRequirementsContent