import React, { useState, useMemo, useEffect } from 'react'
import Cookies from 'js-cookie'
import ArdImg from '@/assets/img/ard.jpg'
import SocialPayImg from '@/assets/img/socialpay.png'
import VisaSvg from '@/assets/svg/visa.svg'
import BankLineSvg from '@/assets/svg/bank-line.svg'
import { MdExpandMore, MdExpandLess, MdChevronLeft } from 'react-icons/md'
import { BiCheck } from 'react-icons/bi'
import BxCheck from '@/assets/svg/bx-check.svg'
import Image from 'next/image'
import QRImage from "react-qr-image"
import { useCreateQpayInvoiceMutation, useCreateQposInvoiceMutation, useCreateSocialpayInvoiceMutation, useLazyCheckPromoQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { ArdArtAssetDetailByIDResult, ArdArtBundleDetailResult } from '@/store/rtk-query/hux-ard-art/types'
import { useRouter } from 'next/router'
import { qpayBanks, qposBanks, QPayBank } from './banks'
import { useAppSelector } from '@/store/hooks';
import { useForm } from 'react-hook-form'
import { formatPrice } from '@/lib/utils'

import IdaxPaymentSvg from '@/assets/svg/idax-payment.svg'

type MongolianBank = QPayBank

const visibleMongolianBanks = qpayBanks.filter((qb) => qb.name !== 'Ard App')
visibleMongolianBanks.push({
    name: 'Socialpay',
    link: ``,
    logo: SocialPayImg.src,
    description: ``,
})

type Props = {
    item: ArdArtAssetDetailByIDResult | ArdArtBundleDetailResult,
    priceToUsdrate: number,
    isBundle?: boolean;
    region?: string,
}

type PaymentType = 'card' | 'socialpay' | 'ardapp' | 'socialpay' | 'mongolian-banks' | 'idax'

type PromoCodeFormData = {
    promo: string;
}

function PaymentMethodCard({ item, priceToUsdrate, region, ...props }: Props) {

    const accountId = useAppSelector(state => state.auth.ardArt.accountId)
    const email = useAppSelector(state => state.auth.profile?.email)
    const [selectedMongolianBank, setSelectedMongolianBank] = useState<MongolianBank>()
    const [qrCode, setQrCode] = useState<string>()
    const [isInvoiceUpdateLoading, setIsInvoiceUpdateLoading] = useState(false)
    const router = useRouter()
    const [selected, setSelected] = useState<PaymentType>('ardapp')
    const [callCreateInvoiceSocialPay, { isLoading: isCreateInvoiceSocialPayLoading }] = useCreateSocialpayInvoiceMutation()
    const [callCreateInvoiceQPay, { isLoading: isCreateInvoiceQpayLoading }] = useCreateQpayInvoiceMutation()
    const [callCreateInvoiceQPos, { isLoading: isCreateInvoiceQPosLoading }] = useCreateQposInvoiceMutation()
    const [isBanksExpanded, setIsBanksExpanded] = useState(false)

    const [callPromo, { isFetching: isPromoFetching, data: promoData, }] = useLazyCheckPromoQuery()

    const { register: registerPromo,
        handleSubmit: handleSubmitPromo,
        watch: watchPromo,
        setError: setPromoError,
        formState: {
            errors: promoErrors
        } } = useForm<PromoCodeFormData>({
            defaultValues: {
                promo: ''
            }
        })

    const enteredPromo = watchPromo('promo')

    const isPromoValid = useMemo(() => {
        return enteredPromo?.length && promoData?.result?.isActive ? true : false
    }, [promoData?.result?.isActive, enteredPromo])

    const priceUsd = useMemo(() => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(item.price)
    }, [item.price])

    const priceFormatted = useMemo(() => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(item.price / priceToUsdrate).substring(1)
    }, [item.price, priceToUsdrate])

    const executeCreateInvoice = async () => {
        if (!selected) {
            toast('Please select your payment method', {
                type: 'info'
            })
            return;
        }
        if (!accountId) {
            toast("Account not found")
            return;
        }
        if (selected === 'socialpay' || selected === 'card') {
            const linkParam = selected === 'card' ? 'card' : 'socialpay'
            const r = await callCreateInvoiceSocialPay({
                method: selected,
                region,
                email: email!,
                ...(props.isBundle ? (
                    {
                        type: 'bundle',
                        bundleId: item.id,
                    }
                ) : ({
                    type: 'single',
                    productId: item.id,
                })),
                amount: 1,
                accountId,
                ...(isPromoValid ? ({
                    promoCode: enteredPromo
                }) : ({}))
            }).unwrap()
            if (r.result) {
                if (r.result?.response?.invoice) {
                    window.location.href = `https://ecommerce.golomtbank.com/${linkParam}/en/${r.result.response.invoice}`
                }
            }
        } else if (selected === 'ardapp') {
            const r = await callCreateInvoiceQPos({
                ...(props.isBundle ? (
                    {
                        type: 'bundle',
                        bundleId: item.id,
                    }
                ) : ({
                    type: 'single',
                    productId: item.id,
                })),
                email: email!,
                region,
                amount: 1,
                accountId,
                ...(isPromoValid ? ({
                    promoCode: enteredPromo
                }) : ({}))
            }).unwrap()
            if (r.result) {
                router.push(`/payment-status/${r.result.invoiceId}?&type=${selected}`)
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
                const r = await callCreateInvoiceQPos({
                    ...(props.isBundle ? (
                        {
                            type: 'bundle',
                            bundleId: item.id,
                        }
                    ) : ({
                        type: 'single',
                        productId: item.id,
                    })),
                    email: email!,
                    region,
                    accountId,
                    amount: 1,
                    ...(isPromoValid ? ({
                        promoCode: enteredPromo
                    }) : ({}))
                }).unwrap()
                if (r.result) {
                    router.push(`/payment-status/${r.result.invoiceId}?type=${selected}&bank=${encodeURIComponent(selectedMongolianBank.name)}`)
                }
                return;
            }
            const r = await callCreateInvoiceQPay({
                ...(props.isBundle ? (
                    {
                        type: 'bundle',
                        bundleId: item.id,
                    }
                ) : ({
                    type: 'single',
                    productId: item.id,
                })),
                accountId,
                email: email!,
                region,
                amount: 1,
                ...(isPromoValid ? ({
                    promoCode: enteredPromo
                }) : ({}))
            }).unwrap()
            if (r.result) {
                router.push(`/payment-status/${r.result.invoiceId}?&type=${selected}&bank=${encodeURIComponent(selectedMongolianBank.name)}`)
            }

        }
    }

    const handleConfirm = async () => {
        setIsInvoiceUpdateLoading(true)
        try {
            await executeCreateInvoice()
        } catch (e) {

        }
        setIsInvoiceUpdateLoading(false)
    }

    const handleCheckPromo = async () => {
        if (!enteredPromo?.length) {
            return
        }
        const resp = await callPromo({
            code: enteredPromo,
            type: props.isBundle ? 'bundle' : 'single',
            ...(props.isBundle ? {
                bundleId: item.id,
            } : {
                productId: item.id,
            })
        })
        if (resp.data) {
            const r = resp.data
            if (!r.result) {
                setPromoError('promo', {
                    message: r.message
                })
            } else if (!r.result.isActive) {
                setPromoError('promo', {
                    message: 'Promo code is not active'
                })
            }
        }
    }

    return (
        <div className="md:shadow-xl md:mt-[100px] mt-[200px] card shadow-none max-w-[90vw] w-[464px] bg-base-100 text-[14px]">
            <div className="card-body mw-md:p-0">
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
                                <h4 className='text-[16px] max-w-[168px]'>{item.name}{region ? ` (${region})` : ``}</h4>
                                <span className='text-xs text-opacity-[0.35] text-black'>Powered by Ard</span>
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
                            <PaymentTypeCard onClick={() => setSelected('ardapp')} icon={<Image src={ArdImg} width={32} height={32} alt="Ard" />}
                                name="Ard App (available with ARDX)" active={selected === 'ardapp'} />
                        </div>
                        <div className="mt-4">
                            <PaymentTypeCard onClick={() => {
                                window.location.href = 'https://www.idax.exchange'
                            }} icon={<Image src={'/idax-payment.svg'} width={32} height={32} alt="idax" />}
                                name="IDAX (available with ARDX)" active={selected === 'idax'} />
                        </div>
                        <div className="mt-4">
                            <PaymentTypeCard onClick={() => setSelected('card')} icon={<VisaSvg />} name="Credit & Debit Card" active={selected === 'card'} />
                        </div>
                        <div tabIndex={0} onClick={(e) => {
                            if (isBanksExpanded && e.currentTarget) {
                                e.currentTarget.blur()
                            }
                            setIsBanksExpanded(!isBanksExpanded)
                        }} className={classNames('cursor-pointer border-[1px] dropdown dropdown-bottom mt-4 flex-col text-dark-secondary rounded-lg bg-black bg-opacity-[0.04] p-[14px] w-full flex items-center', {
                            ' border-black': selectedMongolianBank && ['mongolian-banks', 'socialpay'].includes(selected) ? true : false,
                        })}>
                            <div className="flex justify-between w-full">
                                {selectedMongolianBank && (selected !== 'socialpay') ? (
                                    <div className="flex items-center">
                                        {selectedMongolianBank?.logo ? <img src={selectedMongolianBank.logo} className="w-[32px] h-[32px]" /> : <BankLineSvg />}
                                        <p className="ml-3">{selectedMongolianBank?.name || 'Mongolian Banks'}</p>
                                    </div>
                                ) : (<></>)}
                                {selected === 'socialpay' ? (
                                    <div className="flex items-center">
                                        <img src={SocialPayImg.src} className="w-[32px] h-[32px]" />
                                        <p className="ml-3">Socialpay</p>
                                    </div>
                                ) : (<></>)}
                                {!selectedMongolianBank && (selected !== 'socialpay') ? (
                                    <div className="flex items-center">
                                        <BankLineSvg />
                                        <p className="ml-3">{'Mongolian Banks'}</p>
                                    </div>
                                ) : (<></>)}
                                <div className="flex items-center">
                                    {isBanksExpanded ? <MdExpandLess size={24} color="black" /> : <MdExpandMore size={24} color="black" />}
                                </div>
                            </div>
                            <div className="w-full dropdown-content max-h-[300px] overflow-y-auto">
                                <div className="flex flex-col w-full mt-4 space-y-4 bg-white">
                                    <>
                                        {visibleMongolianBanks.map((mb) => (
                                            <PaymentTypeCard key={mb.name}
                                                onClick={() => {
                                                    setSelectedMongolianBank(mb)
                                                    if (mb.name === 'Socialpay') {
                                                        setSelected('socialpay')
                                                    } else {
                                                        setSelected('mongolian-banks')
                                                    }
                                                }}
                                                active={mb.name === selectedMongolianBank?.name} name={mb.name}
                                                activeClass="bg-black bg-opacity-[0.04] border-transparent"
                                                inactiveClass='bg-white'
                                                icon={<img src={mb.logo} className={"w-[32px] h-[32px]"} />} />
                                        ))}
                                    </>
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
                        {enteredPromo?.length && promoData?.result?.isActive ? (
                            <div className="flex justify-between w-full">
                                <span className='text-terteriary'>Promo code discount</span>
                                <span className='text-dark-secondary'>{promoData.result.discountPercentage}% (-US$ {formatPrice(item.price * promoData.result.discountPercentage / 100)})</span>
                            </div>
                        ) : (<></>)}
                    </div>
                </div>
                <div className="my-1 border-b-[1px] border-black border-opacity-[0.1]">
                </div>
                <div className="flex justify-between w-full">
                    <span className='font-bold'>Total</span>
                    {enteredPromo?.length && promoData?.result?.discountPercentage ? (
                        <span className='font-bold'>US${formatPrice(item.price - item.price * promoData.result.discountPercentage / 100)}</span>
                    ) : (<span className='font-bold'>US${formatPrice(item.price)}</span>)}
                </div>
                <form onSubmit={handleSubmitPromo(handleCheckPromo)}>
                    <div className={classNames("mt-6", {
                        'hidden': !item.isPromoAble
                    })}>
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Promo code</span>
                            </label>
                            <div className="relative w-full">
                                <input onSubmit={handleCheckPromo} type="text" className="w-full text-sm input input-bordered"
                                    {...registerPromo('promo')}
                                />
                                <div className="absolute top-0 bottom-0 right-2">
                                    <div className="flex items-center h-full cursor-pointer">
                                        {!isPromoFetching && promoData?.result?.isActive ? <BiCheck size={24} /> : <></>}
                                    </div>
                                </div>
                            </div>
                            <label className="label">
                                <span className="label-text-alt text-error">{promoErrors.promo?.message}</span>
                            </label>
                        </div>
                    </div>
                    <div className="justify-end mt-6 card-actions">
                        {enteredPromo?.length && !promoData?.result ?
                            <button type="submit" onClick={handleCheckPromo} className={classNames("btn btn-primary btn-block", { 'loading': isPromoFetching })}>Check</button>
                            :
                            <button onClick={handleConfirm} className={classNames("btn btn-primary btn-block", { 'loading': isInvoiceUpdateLoading })}>Confirm</button>}
                    </div>
                </form>
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