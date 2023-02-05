import { ArdArtInvoiceResult } from '@/store/rtk-query/ard-art/types'
import React, { useState, useMemo, useEffect } from 'react'
import { isMobile } from 'react-device-detect';

import ArdImg from '@/assets/img/ard.jpg'
import SocialPayImg from '@/assets/img/socialpay.png'
import VisaSvg from '@/assets/svg/visa.svg'
import SuccessCheckSvg from '@/assets/svg/success-check.svg'
import BankLineSvg from '@/assets/svg/bank-line.svg'
import { MdExpandMore, MdExpandLess, MdChevronLeft } from 'react-icons/md'
import BxCheck from '@/assets/svg/bx-check.svg'
import Image from 'next/image'
import QRImage from "react-qr-image"
import { useLazyGetInvoiceQuery, useUpdateInvoiceQPayMutation, useUpdateInvoiceQPosMutation, useUpdateInvoiceSocialPayMutation } from '@/store/rtk-query/ard-art/ard-art-api'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { ArdArtAssetDetailByIDResult } from '@/store/rtk-query/hux-ard-art/types'
import { useRouter } from 'next/router'
import { qpayBanks, qposBanks, QPayBank } from './banks'

type MongolianBank = QPayBank

type PaymentType = 'card' | 'socialpay' | 'ardapp' | 'socialpay' | 'mongolian-banks'


type Props = {
    invoice: ArdArtInvoiceResult
    item: ArdArtAssetDetailByIDResult,
    priceToUsdrate: number,
    bank?: string,
    isCheckLoading?: boolean,
    type: PaymentType
}


function PaymentStatusCard({ invoice: invoiceData, item, priceToUsdrate, bank, type, ...props }: Props) {

    const [invoice, setInvoice] = useState(invoiceData)
    const [selectedMongolianBank, setSelectedMongolianBank] = useState<MongolianBank | undefined>(() => {
        if (type === 'mongolian-banks') {
            return qpayBanks.find((q) => q.name === bank)
        }
        return undefined
    })

    const qrCode = useMemo(() => {
        if (invoice.method === 'qpos') {
            return invoice.qrCode
        }
        if (invoice.method === 'qpay' && invoice.successResponse) {
            const qpayResp = JSON.parse(invoice.successResponse)
            return qpayResp.qr_text || undefined
        }
        return undefined;
    }, [invoice])

    const [callGetInvoice, { isFetching: isGetInvoiceLoading }] = useLazyGetInvoiceQuery()

    const router = useRouter()
    const [selected, setSelected] = useState<PaymentType>(type)

    const isSuccess = useMemo(() => {
        if (invoice.status === 'SUCCESS') {
            return true;
        }
        return false
    }, [invoice.status])

    const priceUsd = useMemo(() => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(item.price * priceToUsdrate)
    }, [item.price, priceToUsdrate])

    const priceFormatted = useMemo(() => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(item.price).substring(1)
    }, [item.price, priceToUsdrate])

    const handleCheckTransaction = async () => {
        const f = await callGetInvoice({
            invoiceId: invoice.id
        }).unwrap()
        if (f.result) {
            setInvoice(f.result)
        }
    }

    return (
        <div className="md:shadow-xl card shadow-none w-96 bg-base-100 text-[14px]">
            <div className="card-body">
                <div>
                    <MdChevronLeft className='cursor-pointer' size={24} color="black" onClick={() => {
                        router.back()
                    }} />
                </div>
                <div className="mt-4">
                    <div className="flex">
                        <img src={item.imageUrl} alt={item.name} className="max-w-[64px] object-contain rounded-lg h-auto" />
                        <div className="flex justify-between w-full h-full ml-2">
                            <div className="flex flex-col justify-center h-full ">
                                <h4 className='text-[16px] max-w-[168px]'>{item.name}</h4>
                                <span className='text-xs text-opacity-[0.35] text-black'>Hosted by The Hu</span>
                            </div>
                            <div className="flex">
                                <span className='text-sm' style={{ color: 'rgba(39, 41, 55, 0.75)' }}>US{priceUsd}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {!isSuccess ? (
                    <div className='flex flex-col w-full mt-4'>
                        <div className={classNames('cursor-pointer rounded-lg  p-[14px] w-full flex items-center text-dark-secondary border-transparent bg-black bg-opacity-[0.04]')}>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    {selected === 'ardapp' || selectedMongolianBank ? (
                                        <>
                                            <img src={selectedMongolianBank?.logo ? selectedMongolianBank.logo : selected === 'ardapp' ? ArdImg.src : ''} className="w-[32px] h-[32px]" />
                                            <p className="ml-3">{selectedMongolianBank?.name ? selectedMongolianBank.name : selected === 'ardapp' ? 'Ard App' : ''}</p>
                                        </>
                                    ) : (<></>)}
                                    {selected === 'card' ? (
                                        <PaymentTypeCard onClick={() => { }} icon={<VisaSvg />} name="Credit & Debit Card" active={selected === 'card'} />
                                    ) : (<></>)}
                                    {selected === 'socialpay' ? (
                                        <PaymentTypeCard onClick={() => setSelected('socialpay')} icon={<Image src={SocialPayImg} width={32} height={32} alt="Social Pay" />}
                                            name="Social Pay" active={selected === 'socialpay'} />
                                    ) : (<></>)}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-center w-full">
                                {invoice.method === 'qpay' || invoice.method === 'qpos' && qrCode ? (
                                    <div className="flex flex-col items-center justify-center w-full">
                                        <div className="flex w-full max-w-[200px] h-auto aspect-square">
                                            <QRImage background='#fff' transparent text={qrCode} color="black">{qrCode}</QRImage>
                                        </div>
                                        <div className="mt-2">
                                            <p className='text-sm text-center text-terteriary'>You can pay with QR code using your smart banking app.</p>
                                        </div>
                                    </div>
                                ) : (<></>)}
                            </div>
                        </div>
                    </div>
                ) : (<></>)}
                {isSuccess ? (
                    <div className="flex flex-col items-center w-full mt-4">
                        <SuccessCheckSvg />
                        <p className="mt-2 text-2xl font-bold text-center max-w-[200px]">
                            Your Transaction has been made
                        </p>
                    </div>
                ) : (<></>)}
                <div className="mt-4">
                    <div className="flex flex-col w-full space-y-1">
                        <div className="flex justify-between w-full">
                            <span className='text-terteriary'>QTY</span>
                            <span className='text-dark-secondary'>1</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className='text-terteriary'>Subtotal with USD</span>
                            <span className='text-dark-secondary'>{priceUsd}</span>
                        </div>
                        {/* <div className="flex justify-between w-full">
                            <span className='text-terteriary'>Subtotal with ARDX</span>
                            <span className='text-dark-secondary'>ARDX{priceFormatted}</span>
                        </div> */}
                    </div>
                </div>
                <div className="my-1 border-b-[1px] border-black border-opacity-[0.1]">
                </div>
                <div className="flex justify-between w-full">
                    <span className='font-bold'>Total</span>
                    <span className='font-bold'>US{priceUsd}</span>
                </div>
                {!isSuccess ? (
                    <div>
                        <div className="justify-end mt-6 card-actions">
                            <button onClick={handleCheckTransaction} className={classNames("btn btn-primary btn-block", { 'loading': isGetInvoiceLoading })}>Check Transaction</button>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-center w-full cursor-pointer" onClick={() => {
                                router.back()
                            }}>
                                <div><span className='text-terteriary'>Return to</span> <span className="underline">hu.rocks</span></div>
                            </div>
                        </div>
                    </div>
                ) : (<></>)}
                {isSuccess ? (
                    <div>
                        <div className="justify-end mt-6 card-actions">
                            <button onClick={() => {
                                router.push('/profile')
                            }} className={classNames("btn btn-primary btn-block")}> Return to hu.rocks</button>
                        </div>
                    </div>
                ) : (<></>)}
            </div>
        </div >
    )
}

export default PaymentStatusCard

type PaymentTypeCardProps = {
    icon: JSX.Element,
    name: string,
    active: boolean,
    onClick: () => void,
    activeClass?: string,
    inactiveClass?: string
}

function PaymentTypeCard(props: PaymentTypeCardProps) {
    return (
        <div onClick={props.onClick} className={classNames('cursor-pointer rounded-lg  p-[14px] w-full flex items-center', {
            [props.activeClass || 'border-black bg-black bg-opacity-[0.04] border-[1px]']: props.active,
            [props.inactiveClass || 'text-dark-secondary border-transparent bg-black bg-opacity-[0.04]']: !props.active,
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