import { ArdArtInvoiceResult } from '@/store/rtk-query/ard-art/types'
import React, { useState } from 'react'

import ArdImg from '@/assets/img/ard.jpg'
import SocialPayImg from '@/assets/img/socialpay.png'
import VisaSvg from '@/assets/svg/visa.svg'
import BankLineSvg from '@/assets/svg/bank-line.svg'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'
import BxCheck from '@/assets/svg/bx-check.svg'
import Image from 'next/image'
import { useUpdateInvoiceSocialPayMutation } from '@/store/rtk-query/ard-art/ard-art-api'
import classNames from 'classnames'
import { toast } from 'react-toastify'

type Props = {
    invoice: ArdArtInvoiceResult
}

type PaymentType = 'card' | 'socialpay' | 'ardapp' | 'socialpay' | 'mongolian-banks'

function InvoiceCard({ invoice }: Props) {

    const [selected, setSelected] = useState<PaymentType>('card')
    const [callUpdateInvoiceSocialPay, { isLoading: isSocialPayLoading }] = useUpdateInvoiceSocialPayMutation()
    const [isBanksExpanded, setIsBanksExpanded] = useState(false)

    const handleConfirm = async () => {
        if (!selected) {
            toast('Please select your payment method', {
                type: 'info'
            })
            return;
        }
        if (selected === 'socialpay' || selected === 'card') {
            const r = await callUpdateInvoiceSocialPay({
                invoiceId: invoice.id,
            }).unwrap()
            if (r.result?.response?.invoice) {
                window.location.href = `https://ecommerce.golomtbank.com/payment/mn/${r.result.response.invoice}`
            }
        }

    }

    return (
        <div className="md:shadow-xl card shadow-none w-96 bg-base-100 text-[14px]">
            <div className="card-body">
                <h2 className="card-title">Invoice Id: {invoice.id}</h2>
                <div className="flex flex-col w-full">
                    <div className="mt-4">
                        <PaymentTypeCard onClick={() => setSelected('card')} icon={<VisaSvg />} name="Credit & Debit Card" active={selected === 'card'} />
                    </div>
                    <div className="mt-4">
                        <PaymentTypeCard onClick={() => setSelected('ardapp')} icon={<Image src={ArdImg} width={32} height={32} alt="Ard" />}
                            name="Ard App (available with ARDX)" active={selected === 'ardapp'} />
                    </div>
                    <div className="mt-4">
                        <PaymentTypeCard onClick={() => setSelected('socialpay')} icon={<Image src={SocialPayImg} width={32} height={32} alt="Social Pay" />}
                            name="Social Pay" active={selected === 'socialpay'} />
                    </div>
                    <div tabIndex={0} onClick={(e) => {
                        if (isBanksExpanded && e.currentTarget) {
                            e.currentTarget.blur()
                        }
                        setIsBanksExpanded(!isBanksExpanded)
                    }} className="cursor-pointer collapse mt-4 flex-col text-dark-secondary rounded-lg bg-black bg-opacity-[0.04] p-[14px] w-full flex items-center">
                        <div className="flex justify-between w-full">
                            <div className="flex items-center">
                                <BankLineSvg />
                                <p className="ml-3">Mongolian Banks</p>
                            </div>
                            <div className="flex items-center">
                                {isBanksExpanded ? <MdExpandLess size={24} color="black" /> : <MdExpandMore size={24} color="black" />}
                            </div>
                        </div>
                        <div className="collapse-content">
                            <div className="mt-4">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex flex-col w-full space-y-1">
                        <div className="flex justify-between w-full">
                            <span className='text-terteriary'>QTY</span>
                            <span className='text-dark-secondary'>1</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className='text-terteriary'>Subtotal with USD</span>
                            <span className='text-dark-secondary'>1</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className='text-terteriary'>Subtotal with ARDX</span>
                            <span className='text-dark-secondary'></span>
                        </div>
                    </div>
                </div>
                <div className="my-1 border-b-[1px] border-black border-opacity-[0.1]">
                </div>
                <div className="flex justify-between w-full">
                    <span className='font-bold'>Total</span>
                    <span className='font-bold'>US</span>
                </div>
                <div className="justify-end mt-6 card-actions">
                    <button onClick={handleConfirm} className={classNames("btn btn-primary btn-block", { 'loading': isSocialPayLoading })}>Confirm</button>
                </div>
                <div className="mt-4">
                    <div className="flex justify-center w-full cursor-pointer" onClick={() => {
                        window.history.back()
                    }}>
                        <div><span className='text-terteriary'>Return to</span> <span className="underline">hu.rocks</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceCard

type PaymentTypeCardProps = {
    icon: JSX.Element,
    name: string,
    active: boolean,
    onClick: () => void
}

function PaymentTypeCard(props: PaymentTypeCardProps) {
    return (
        <div onClick={props.onClick} className={classNames('cursor-pointer  border-[1px] rounded-lg bg-black bg-opacity-[0.04] p-[14px] w-full flex items-center', {
            'border-black': props.active,
            'text-dark-secondary border-transparent': !props.active,
        })}>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    {props.icon}
                    <p className="ml-3">{props.name}</p>
                </div>
                {props.active ? (<div className='flex'>
                    <BxCheck />
                </div>) : (<></>)}
            </div>
        </div>
    )
}