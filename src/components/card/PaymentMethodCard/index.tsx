import { ArdArtInvoiceResult } from '@/store/rtk-query/ard-art/types'
import React, { useState, useMemo } from 'react'
import { isMobile } from 'react-device-detect';

import ArdImg from '@/assets/img/ard.jpg'
import SocialPayImg from '@/assets/img/socialpay.png'
import VisaSvg from '@/assets/svg/visa.svg'
import BankLineSvg from '@/assets/svg/bank-line.svg'
import { MdExpandMore, MdExpandLess, MdChevronLeft } from 'react-icons/md'
import BxCheck from '@/assets/svg/bx-check.svg'
import Image from 'next/image'
import QRImage from "react-qr-image"
import { useUpdateInvoiceQPayMutation, useUpdateInvoiceQPosMutation, useUpdateInvoiceSocialPayMutation } from '@/store/rtk-query/ard-art/ard-art-api'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { ArdArtAssetDetailByIDResult } from '@/store/rtk-query/hux-ard-art/types'
import { useRouter } from 'next/router'
import { qpayBanks, qposBanks, QPayBank } from './banks'

type MongolianBank = QPayBank

const visibleMongolianBanks = qpayBanks.filter((qb) => qb.name !== 'Ard App')

type Props = {
    invoice: ArdArtInvoiceResult
    item: ArdArtAssetDetailByIDResult,
    priceToUsdrate: number,
}

type PaymentType = 'card' | 'socialpay' | 'ardapp' | 'socialpay' | 'mongolian-banks'



function PaymentMethodCard({ invoice, item, priceToUsdrate }: Props) {

    const [qrCode, setQrCode] = useState<string>()
    const [selectedMongolianBank, setSelectedMongolianBank] = useState<MongolianBank>()
    const [isInvoiceUpdateLoading, setIsInvoiceUpdateLoading] = useState(false)
    const router = useRouter()
    const [selected, setSelected] = useState<PaymentType>('card')
    const [callUpdateInvoiceSocialPay, { isLoading: isUpdateInvoiceSocialPayLoading }] = useUpdateInvoiceSocialPayMutation()
    const [callUpdateInvoiceQPay, { isLoading: isUpdateInvoiceQpayLoading }] = useUpdateInvoiceQPayMutation()
    const [callUpdateInvoiceQPos, { isLoading: isUpdateInvoiceQPosLoading }] = useUpdateInvoiceQPosMutation()
    const [isBanksExpanded, setIsBanksExpanded] = useState(false)

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

    const executeInvoiceUpdate = async () => {
        if (!selected) {
            toast('Please select your payment method', {
                type: 'info'
            })
            return;
        }
        if (selected === 'socialpay' || selected === 'card') {
            const r = await callUpdateInvoiceSocialPay({
                invoiceId: invoice.id,
                productId: item.id,
            }).unwrap()
            if (r.result) {
                if (r.result?.response?.invoice) {
                    window.location.href = `https://ecommerce.golomtbank.com/payment/en/${r.result.response.invoice}`
                }
            }
        } else if (selected === 'ardapp') {
            const r = await callUpdateInvoiceQPos({
                invoiceId: invoice.id,
            }).unwrap()
            if (r.result) {
                if (isMobile) {
                    window.location.href = `ard://q?qPay_QRcode=${r.result.response.qrCode}`
                } else {
                    // setQrCode(r.result.response.qrCode)
                    router.push(`/payment-status?productId=${item.id}&invoiceId=${invoice.id}&type=ardapp`)
                }
            }
        } else if (selectedMongolianBank) {
            let qpayBank: MongolianBank | undefined
            let qPosBank: MongolianBank | undefined
            qPosBank = qposBanks.find((q) => q.name === selectedMongolianBank.name)
            if (!qPosBank) {
                qpayBank = qpayBanks.find((q) => q.name === selectedMongolianBank.name)
            }
            if (!qpayBank && !qPosBank) {
                toast("Bank not found.", {
                    type: "error"
                })
                return;
            }
            if (qPosBank) {
                const r = await callUpdateInvoiceQPos({
                    invoiceId: invoice.id,
                }).unwrap()
                if (r.result) {
                    if (isMobile) {
                        window.location.href = `${selectedMongolianBank.link}${r.result.response.qrCode}`
                    } else {
                        // setQrCode(r.result.response.qrCode)
                        router.push(`/payment-status?productId=${item.id}&invoiceId=${invoice.id}&type=${selected}&bank=${encodeURIComponent(selectedMongolianBank.name)}`)
                    }
                }
                return;
            }
            const r = await callUpdateInvoiceQPay({
                invoiceId: invoice.id,
            }).unwrap()
            if (r.result) {
                if (isMobile) {
                    window.location.href = `${selectedMongolianBank.link}${r.result.response.qr_text}`
                } else {
                    // setQrCode(r.result.response.qr_text)
                    router.push(`/payment-status?productId=${item.id}&invoiceId=${invoice.id}&type=${selected}&bank=${encodeURIComponent(selectedMongolianBank.name)}`)
                }
            }

        }
    }

    const handleConfirm = async () => {
        setIsInvoiceUpdateLoading(true)
        try {
            await executeInvoiceUpdate()
        } catch (e) {

        }
        setIsInvoiceUpdateLoading(false)
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
                {qrCode ? (
                    <div className='flex flex-col w-full mt-4'>
                        <div className={classNames('cursor-pointer rounded-lg  p-[14px] w-full flex items-center text-dark-secondary border-transparent bg-black bg-opacity-[0.04]')}>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    <img src={selectedMongolianBank?.logo ? selectedMongolianBank.logo : selected === 'ardapp' ? ArdImg.src : ''} className="w-[32px] h-[32px]" />
                                    <p className="ml-3">{selectedMongolianBank?.name ? selectedMongolianBank.name : selected === 'ardapp' ? 'Ard App' : ''}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-center w-full">
                                <div className="flex flex-col items-center justify-center w-full">
                                    <div className="flex w-full max-w-[200px] h-auto aspect-square">
                                        <QRImage background='#fff' transparent text={qrCode} color="black">{qrCode}</QRImage>
                                    </div>
                                    <div className="mt-2">
                                        <p className='text-sm text-center text-terteriary'>You can pay with QR code using your smart banking app.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (<></>)}
                {!qrCode ? (
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
                        }} className={classNames('cursor-pointer border-[1px] dropdown dropdown-bottom mt-4 flex-col text-dark-secondary rounded-lg bg-black bg-opacity-[0.04] p-[14px] w-full flex items-center', {
                            ' border-black': selectedMongolianBank && selected === 'mongolian-banks' ? true : false,
                        })}>
                            <div className="flex justify-between w-full">
                                <div className="flex items-center">
                                    {selectedMongolianBank?.logo ? <img src={selectedMongolianBank.logo} className="w-[32px] h-[32px]" /> : <BankLineSvg />}
                                    <p className="ml-3">{selectedMongolianBank?.name || 'Mongolian Banks'}</p>
                                </div>
                                <div className="flex items-center">
                                    {isBanksExpanded ? <MdExpandLess size={24} color="black" /> : <MdExpandMore size={24} color="black" />}
                                </div>
                            </div>
                            <div className="w-full dropdown-content max-h-[300px] overflow-y-auto">
                                <div className="flex flex-col w-full mt-4 space-y-4 bg-white">
                                    {visibleMongolianBanks.map((mb) => (
                                        <PaymentTypeCard key={mb.name}
                                            onClick={() => {
                                                setSelected('mongolian-banks')
                                                setSelectedMongolianBank(mb)
                                            }}
                                            active={mb.name === selected} name={mb.name}
                                            activeClass="bg-black bg-opacity-[0.04] border-transparent"
                                            inactiveClass='bg-white'
                                            icon={<img src={mb.logo} className={"w-[32px] h-[32px]"} />} />
                                    ))}
                                </div>
                            </div>
                        </div>
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
                        <div className="flex justify-between w-full">
                            <span className='text-terteriary'>Subtotal with ARDX</span>
                            <span className='text-dark-secondary'>ARDX{priceFormatted}</span>
                        </div>
                    </div>
                </div>
                <div className="my-1 border-b-[1px] border-black border-opacity-[0.1]">
                </div>
                <div className="flex justify-between w-full">
                    <span className='font-bold'>Total</span>
                    <span className='font-bold'>US{priceUsd}</span>
                </div>
                <div className="justify-end mt-6 card-actions">
                    <button onClick={handleConfirm} className={classNames("btn btn-primary btn-block", { 'loading': isInvoiceUpdateLoading })}>Confirm</button>
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

export default PaymentMethodCard

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
            [props.inactiveClass || 'text-dark-secondary border-transparent border-[1px] bg-black bg-opacity-[0.04]']: !props.active,
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