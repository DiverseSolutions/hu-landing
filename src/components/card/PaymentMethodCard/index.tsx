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
import { useCreatePaypalInvoiceMutation, useCreateQpayInvoiceMutation, useCreateQposInvoiceMutation, useCreateSocialpayInvoiceMutation, useLazyCheckPromoQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { ArdArtAssetDetailByIDResult, ArdArtBundleDetailResult } from '@/store/rtk-query/hux-ard-art/types'
import { useRouter } from 'next/router'
import { qpayBanks, qposBanks, QPayBank } from './banks'
import { useAppSelector } from '@/store/hooks';
import { useForm } from 'react-hook-form'
import { formatPrice } from '@/lib/utils'

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

type PaymentType = 'card' | 'socialpay' | 'ardapp' | 'socialpay' | 'mongolian-banks' | 'idax' | 'paypal'

type PromoCodeFormData = {
    promo: string;
}

function PaymentMethodCard({ item, priceToUsdrate, region, ...props }: Props) {

    const accountId = useAppSelector(state => state.auth.ardArt.accountId)
    const email = useAppSelector(state => state.auth.profile?.email)
    const [selectedMongolianBank, setSelectedMongolianBank] = useState<MongolianBank>()
    const [qrCode, setQrCode] = useState<string>()
    const [isInvoiceCreateLoading, setIsInvoiceCreateLoading] = useState(false)
    const router = useRouter()
    const [selected, setSelected] = useState<PaymentType>('ardapp')
    const [callCreateInvoiceSocialPay, { isLoading: isCreateInvoiceSocialPayLoading }] = useCreateSocialpayInvoiceMutation()
    const [callCreateInvoiceQPay, { isLoading: isCreateInvoiceQpayLoading }] = useCreateQpayInvoiceMutation()
    const [callCreateInvoiceQPos, { isLoading: isCreateInvoiceQPosLoading }] = useCreateQposInvoiceMutation()
    const [callPaypalInvoice, { isLoading: isCreatePaypalInvoiceLoading }] = useCreatePaypalInvoiceMutation()
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

    const executeCreateInvoice = async (selected: PaymentType) => {
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
        if (selected === 'paypal') {
            const r = await callPaypalInvoice({
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
            if (r.result?.response?.links?.length) {
                const approveLink = r.result.response.links.find((link) => (link.rel === 'approve') && (link.method === 'GET'))
                if (approveLink) {
                    window.location.href = approveLink.href
                }
            }
            return
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
        setIsInvoiceCreateLoading(true)
        try {
            await executeCreateInvoice(selected)
        } catch (e) {
            console.error(e)
        }
        setIsInvoiceCreateLoading(false)
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
        <div className="md:shadow-xl md:mt-[100px] card shadow-none max-w-[90vw] w-[464px] bg-base-100 text-[14px]">
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
                                window.open('https://hu.idax.exchange', '_blank')?.focus()
                            }} icon={<Image src={"/idax-payment.svg"} width={32} height={32} alt="IDAX" />}
                                name="IDAX (available with ARDX)" active={selected === 'idax'} />
                        </div>
                        <div className="mt-4">
                            <PaymentTypeCard onClick={() => {
                                setSelected('paypal')
                            }} icon={<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICAgIDxwYXRoIGZpbGw9IiMwMDljZGUiIGQ9Ik0gMjAuOTA1IDkuNSBDIDIxLjE4NSA3LjQgMjAuOTA1IDYgMTkuNzgyIDQuNyBDIDE4LjU2NCAzLjMgMTYuNDExIDIuNiAxMy42OTcgMi42IEwgNS43MzkgMi42IEMgNS4yNzEgMi42IDQuNzEgMy4xIDQuNjE1IDMuNiBMIDEuMzM5IDI1LjggQyAxLjMzOSAyNi4yIDEuNjIgMjYuNyAyLjA4OCAyNi43IEwgNi45NTYgMjYuNyBMIDYuNjc1IDI4LjkgQyA2LjU4MSAyOS4zIDYuODYyIDI5LjYgNy4yMzYgMjkuNiBMIDExLjM1NiAyOS42IEMgMTEuODI1IDI5LjYgMTIuMjkyIDI5LjMgMTIuMzg2IDI4LjggTCAxMi4zODYgMjguNSBMIDEzLjIyOCAyMy4zIEwgMTMuMjI4IDIzLjEgQyAxMy4zMjIgMjIuNiAxMy43OSAyMi4yIDE0LjI1OCAyMi4yIEwgMTQuODIxIDIyLjIgQyAxOC44NDUgMjIuMiAyMS45MzUgMjAuNSAyMi44NzEgMTUuNSBDIDIzLjMzOSAxMy40IDIzLjE1MyAxMS43IDIyLjAyOSAxMC41IEMgMjEuNzQ4IDEwLjEgMjEuMjc5IDkuOCAyMC45MDUgOS41IEwgMjAuOTA1IDkuNSI+PC9wYXRoPgogICAgPHBhdGggZmlsbD0iIzAxMjE2OSIgZD0iTSAyMC45MDUgOS41IEMgMjEuMTg1IDcuNCAyMC45MDUgNiAxOS43ODIgNC43IEMgMTguNTY0IDMuMyAxNi40MTEgMi42IDEzLjY5NyAyLjYgTCA1LjczOSAyLjYgQyA1LjI3MSAyLjYgNC43MSAzLjEgNC42MTUgMy42IEwgMS4zMzkgMjUuOCBDIDEuMzM5IDI2LjIgMS42MiAyNi43IDIuMDg4IDI2LjcgTCA2Ljk1NiAyNi43IEwgOC4yNjcgMTguNCBMIDguMTczIDE4LjcgQyA4LjI2NyAxOC4xIDguNzM1IDE3LjcgOS4yOTYgMTcuNyBMIDExLjYzNiAxNy43IEMgMTYuMjI0IDE3LjcgMTkuNzgyIDE1LjcgMjAuOTA1IDEwLjEgQyAyMC44MTIgOS44IDIwLjkwNSA5LjcgMjAuOTA1IDkuNSI+PC9wYXRoPgogICAgPHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSA5LjQ4NSA5LjUgQyA5LjU3NyA5LjIgOS43NjUgOC45IDEwLjA0NiA4LjcgQyAxMC4yMzIgOC43IDEwLjMyNiA4LjYgMTAuNTEzIDguNiBMIDE2LjY5MiA4LjYgQyAxNy40NDIgOC42IDE4LjE4OSA4LjcgMTguNzUzIDguOCBDIDE4LjkzOSA4LjggMTkuMTI3IDguOCAxOS4zMTQgOC45IEMgMTkuNTAxIDkgMTkuNjg4IDkgMTkuNzgyIDkuMSBDIDE5Ljg3NSA5LjEgMTkuOTY4IDkuMSAyMC4wNjMgOS4xIEMgMjAuMzQzIDkuMiAyMC42MjQgOS40IDIwLjkwNSA5LjUgQyAyMS4xODUgNy40IDIwLjkwNSA2IDE5Ljc4MiA0LjYgQyAxOC42NTggMy4yIDE2LjUwNiAyLjYgMTMuNzkgMi42IEwgNS43MzkgMi42IEMgNS4yNzEgMi42IDQuNzEgMyA0LjYxNSAzLjYgTCAxLjMzOSAyNS44IEMgMS4zMzkgMjYuMiAxLjYyIDI2LjcgMi4wODggMjYuNyBMIDYuOTU2IDI2LjcgTCA4LjI2NyAxOC40IEwgOS40ODUgOS41IFoiPjwvcGF0aD4KPC9zdmc+Cg" alt="" aria-label="pp"></img>}
                                title={<img className='h-4 ml-3' src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTAwIDMyIiB4bWxucz0iaHR0cDomI3gyRjsmI3gyRjt3d3cudzMub3JnJiN4MkY7MjAwMCYjeDJGO3N2ZyIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pbllNaW4gbWVldCI+PHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSAxMiA0LjkxNyBMIDQuMiA0LjkxNyBDIDMuNyA0LjkxNyAzLjIgNS4zMTcgMy4xIDUuODE3IEwgMCAyNS44MTcgQyAtMC4xIDI2LjIxNyAwLjIgMjYuNTE3IDAuNiAyNi41MTcgTCA0LjMgMjYuNTE3IEMgNC44IDI2LjUxNyA1LjMgMjYuMTE3IDUuNCAyNS42MTcgTCA2LjIgMjAuMjE3IEMgNi4zIDE5LjcxNyA2LjcgMTkuMzE3IDcuMyAxOS4zMTcgTCA5LjggMTkuMzE3IEMgMTQuOSAxOS4zMTcgMTcuOSAxNi44MTcgMTguNyAxMS45MTcgQyAxOSA5LjgxNyAxOC43IDguMTE3IDE3LjcgNi45MTcgQyAxNi42IDUuNjE3IDE0LjYgNC45MTcgMTIgNC45MTcgWiBNIDEyLjkgMTIuMjE3IEMgMTIuNSAxNS4wMTcgMTAuMyAxNS4wMTcgOC4zIDE1LjAxNyBMIDcuMSAxNS4wMTcgTCA3LjkgOS44MTcgQyA3LjkgOS41MTcgOC4yIDkuMzE3IDguNSA5LjMxNyBMIDkgOS4zMTcgQyAxMC40IDkuMzE3IDExLjcgOS4zMTcgMTIuNCAxMC4xMTcgQyAxMi45IDEwLjUxNyAxMy4xIDExLjIxNyAxMi45IDEyLjIxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSAzNS4yIDEyLjExNyBMIDMxLjUgMTIuMTE3IEMgMzEuMiAxMi4xMTcgMzAuOSAxMi4zMTcgMzAuOSAxMi42MTcgTCAzMC43IDEzLjYxNyBMIDMwLjQgMTMuMjE3IEMgMjkuNiAxMi4wMTcgMjcuOCAxMS42MTcgMjYgMTEuNjE3IEMgMjEuOSAxMS42MTcgMTguNCAxNC43MTcgMTcuNyAxOS4xMTcgQyAxNy4zIDIxLjMxNyAxNy44IDIzLjQxNyAxOS4xIDI0LjgxNyBDIDIwLjIgMjYuMTE3IDIxLjkgMjYuNzE3IDIzLjggMjYuNzE3IEMgMjcuMSAyNi43MTcgMjkgMjQuNjE3IDI5IDI0LjYxNyBMIDI4LjggMjUuNjE3IEMgMjguNyAyNi4wMTcgMjkgMjYuNDE3IDI5LjQgMjYuNDE3IEwgMzIuOCAyNi40MTcgQyAzMy4zIDI2LjQxNyAzMy44IDI2LjAxNyAzMy45IDI1LjUxNyBMIDM1LjkgMTIuNzE3IEMgMzYgMTIuNTE3IDM1LjYgMTIuMTE3IDM1LjIgMTIuMTE3IFogTSAzMC4xIDE5LjMxNyBDIDI5LjcgMjEuNDE3IDI4LjEgMjIuOTE3IDI1LjkgMjIuOTE3IEMgMjQuOCAyMi45MTcgMjQgMjIuNjE3IDIzLjQgMjEuOTE3IEMgMjIuOCAyMS4yMTcgMjIuNiAyMC4zMTcgMjIuOCAxOS4zMTcgQyAyMy4xIDE3LjIxNyAyNC45IDE1LjcxNyAyNyAxNS43MTcgQyAyOC4xIDE1LjcxNyAyOC45IDE2LjExNyAyOS41IDE2LjcxNyBDIDMwIDE3LjQxNyAzMC4yIDE4LjMxNyAzMC4xIDE5LjMxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSA1NS4xIDEyLjExNyBMIDUxLjQgMTIuMTE3IEMgNTEgMTIuMTE3IDUwLjcgMTIuMzE3IDUwLjUgMTIuNjE3IEwgNDUuMyAyMC4yMTcgTCA0My4xIDEyLjkxNyBDIDQzIDEyLjQxNyA0Mi41IDEyLjExNyA0Mi4xIDEyLjExNyBMIDM4LjQgMTIuMTE3IEMgMzggMTIuMTE3IDM3LjYgMTIuNTE3IDM3LjggMTMuMDE3IEwgNDEuOSAyNS4xMTcgTCAzOCAzMC41MTcgQyAzNy43IDMwLjkxNyAzOCAzMS41MTcgMzguNSAzMS41MTcgTCA0Mi4yIDMxLjUxNyBDIDQyLjYgMzEuNTE3IDQyLjkgMzEuMzE3IDQzLjEgMzEuMDE3IEwgNTUuNiAxMy4wMTcgQyA1NS45IDEyLjcxNyA1NS42IDEyLjExNyA1NS4xIDEyLjExNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny41IDQuOTE3IEwgNTkuNyA0LjkxNyBDIDU5LjIgNC45MTcgNTguNyA1LjMxNyA1OC42IDUuODE3IEwgNTUuNSAyNS43MTcgQyA1NS40IDI2LjExNyA1NS43IDI2LjQxNyA1Ni4xIDI2LjQxNyBMIDYwLjEgMjYuNDE3IEMgNjAuNSAyNi40MTcgNjAuOCAyNi4xMTcgNjAuOCAyNS44MTcgTCA2MS43IDIwLjExNyBDIDYxLjggMTkuNjE3IDYyLjIgMTkuMjE3IDYyLjggMTkuMjE3IEwgNjUuMyAxOS4yMTcgQyA3MC40IDE5LjIxNyA3My40IDE2LjcxNyA3NC4yIDExLjgxNyBDIDc0LjUgOS43MTcgNzQuMiA4LjAxNyA3My4yIDYuODE3IEMgNzIgNS42MTcgNzAuMSA0LjkxNyA2Ny41IDQuOTE3IFogTSA2OC40IDEyLjIxNyBDIDY4IDE1LjAxNyA2NS44IDE1LjAxNyA2My44IDE1LjAxNyBMIDYyLjYgMTUuMDE3IEwgNjMuNCA5LjgxNyBDIDYzLjQgOS41MTcgNjMuNyA5LjMxNyA2NCA5LjMxNyBMIDY0LjUgOS4zMTcgQyA2NS45IDkuMzE3IDY3LjIgOS4zMTcgNjcuOSAxMC4xMTcgQyA2OC40IDEwLjUxNyA2OC41IDExLjIxNyA2OC40IDEyLjIxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC43IDEyLjExNyBMIDg3IDEyLjExNyBDIDg2LjcgMTIuMTE3IDg2LjQgMTIuMzE3IDg2LjQgMTIuNjE3IEwgODYuMiAxMy42MTcgTCA4NS45IDEzLjIxNyBDIDg1LjEgMTIuMDE3IDgzLjMgMTEuNjE3IDgxLjUgMTEuNjE3IEMgNzcuNCAxMS42MTcgNzMuOSAxNC43MTcgNzMuMiAxOS4xMTcgQyA3Mi44IDIxLjMxNyA3My4zIDIzLjQxNyA3NC42IDI0LjgxNyBDIDc1LjcgMjYuMTE3IDc3LjQgMjYuNzE3IDc5LjMgMjYuNzE3IEMgODIuNiAyNi43MTcgODQuNSAyNC42MTcgODQuNSAyNC42MTcgTCA4NC4zIDI1LjYxNyBDIDg0LjIgMjYuMDE3IDg0LjUgMjYuNDE3IDg0LjkgMjYuNDE3IEwgODguMyAyNi40MTcgQyA4OC44IDI2LjQxNyA4OS4zIDI2LjAxNyA4OS40IDI1LjUxNyBMIDkxLjQgMTIuNzE3IEMgOTEuNCAxMi41MTcgOTEuMSAxMi4xMTcgOTAuNyAxMi4xMTcgWiBNIDg1LjUgMTkuMzE3IEMgODUuMSAyMS40MTcgODMuNSAyMi45MTcgODEuMyAyMi45MTcgQyA4MC4yIDIyLjkxNyA3OS40IDIyLjYxNyA3OC44IDIxLjkxNyBDIDc4LjIgMjEuMjE3IDc4IDIwLjMxNyA3OC4yIDE5LjMxNyBDIDc4LjUgMTcuMjE3IDgwLjMgMTUuNzE3IDgyLjQgMTUuNzE3IEMgODMuNSAxNS43MTcgODQuMyAxNi4xMTcgODQuOSAxNi43MTcgQyA4NS41IDE3LjQxNyA4NS43IDE4LjMxNyA4NS41IDE5LjMxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5NS4xIDUuNDE3IEwgOTEuOSAyNS43MTcgQyA5MS44IDI2LjExNyA5Mi4xIDI2LjQxNyA5Mi41IDI2LjQxNyBMIDk1LjcgMjYuNDE3IEMgOTYuMiAyNi40MTcgOTYuNyAyNi4wMTcgOTYuOCAyNS41MTcgTCAxMDAgNS42MTcgQyAxMDAuMSA1LjIxNyA5OS44IDQuOTE3IDk5LjQgNC45MTcgTCA5NS44IDQuOTE3IEMgOTUuNCA0LjkxNyA5NS4yIDUuMTE3IDk1LjEgNS40MTcgWiI+PC9wYXRoPjwvc3ZnPg" alt="" aria-label="paypal"></img>} active={selected === 'paypal'} />
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
                            <button onClick={handleConfirm} className={classNames("btn btn-primary btn-block", { 'loading': isInvoiceCreateLoading })}>Confirm</button>}
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
    name?: string,
    title?: React.ReactNode,
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
                    {props.name ? <p className="ml-3">{props.name}</p> : <></>}
                    {props.title ? props.title : <></>}
                </div>
                {props.active ? (<div className='flex'>
                    <BxCheck />
                </div>) : (<></>)}
            </div>
        </div>
    )
}