import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

import { BiChevronLeft, BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { MdChevronRight } from 'react-icons/md'

type Props = {}

const FAQ = [
    {
        question: 'When is the virtual concert?',
        answer: `The concert will be held on March 30, 2023, at 21:00 local time based on region. The concert can be accessed from anywhere in the world, so choose the best time zone from the following three regions. 
        Asia-Pacific: 21:00 Ulaanbaatar Time (UTC +08:00)
        Europe: 21:00 Western European Time  (UTC +00:00)
        North and South America: 21:00 Pacific Standard Time (UTC -08:00)`
    },
    {
        question: 'How to watch the concert?',
        answer: `1. Register at hu.rocks and purchase a ticket by buying a bundle. Bundles include access to the concert as well as items and emotes for your avatar. For the best experience possible, please be sure to check if your device meets our system requirements.
        2. Download the game to your computer and log in. The game will be available to download on March 27, 2022.
        3. Access to the game according to the selected time zone on the day of the concert.`
    },
    {
        question: `How to register at www.hu.rocks?`,
        answer: `1. Click the Sign-Up button.
        2.  Create an account by providing a username email address, and password for future use.
        3. Enter the 6-digit verification code sent to the email you provided.`
    },
    {
        question: `How to buy a ticket?`,
        answer: `1. Click the Buy ticket button and click on a bundle that you would like to purchase
        2. Select the time zone and the region that best suits you and click purchase.
        3. Select your payment method and click on Confirm.
        4. Once the transaction is complete, you should receive a confirmation email with your ticket information.
        `
    },
    {
        question: `How to reset password?`,
        answer: `1. Click on the Forget Password button.
        2. Enter your registered email address and enter the code you received.
        3. Create a password for future use.
        `
    },
    {
        question: `How to login if I forgot my username?`,
        answer: `You can log in with your registered email address.`
    },
    {
        question: `How many tickets can one person purchase?`,
        answer: `You can purchase an unlimited number of tickets and bundles.`
    },
    {
        question: `What are the advantages of NFT tickets?`,
        answer: `It remains your asset after the game and can be traded.`
    },
    {
        question: `Where do I navigate to in the Metaverse?`,
        answer: `There is no need to find a location as you will spawn at the designated place.`
    },
    {
        question: `How many types of tickets are there?`,
        answer: `There are four ticket types: Early bird, Gold, Silver and Bronze. Tickets include in game items and emotes of varying rarity.`
    },
    {
        question: `The difference between the tickets?`,
        answer: `Gold, Silver, and Bronze tickets have in game items and emotes of verting rarity. All items, clothing and emotes you purchased will remain to you as NFTs.`
    },
    {
        question: `Will I need a VR headset?`,
        answer: `VR headsets are not required and not compatible with the current version of the concert.`
    },
    {
        question: `Can I cancel my tickets?`,
        answer: `Tickets are non-refundable but you can transfer your ticket to a third party.`
    },
    {
        question: `How do I transfer my ticket?`,
        answer: `1. Click on the Send NFT button below your ticket.

        2. Enter the registered email address of the transferee.
        `
    },
]

type Faq = typeof FAQ[0]

function HelpCenterPage({ }: Props) {

    const router = useRouter()

    const [activeAq, setActiveQa] = useState<Faq>()

    const [isTopQuestionsVisible, setIsTopQuestionsVisible] = useState(true)

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        const q = router.query.q
        if (q) {
            const decodedQ = decodeURIComponent(q as string)
            const qa = FAQ.find((fa) => fa.question == decodedQ);
            if (qa) {
                setActiveQa(qa)
            } else {
                setActiveQa(undefined)
            }
        } else {
            setActiveQa(undefined)
        }
        console.log(router.query)
    }, [router.query, router.isReady])


    return (
        <>
            <div className="w-full" style={{

            }}>
                <div className="flex items-center justify-center w-full h-full">
                    <div className='h-[100px] flex w-full justify-center items-center' style={{
                        background: `radial-gradient(105.33% 76.33% at 50% 95.88%, #721C1C 0.01%, rgba(0, 0, 0, 0) 100%)`,
                        backgroundColor: 'black'
                    }}>
                        <div className="relative overflow-x-auto w-full md:w-[800px] px-2 md:px-0 flex items-center h-full">
                            <p className="w-full text-4xl text-center text-white">
                                {activeAq ? 'FAQ' : 'Help Center'}
                            </p>
                            <div className="absolute left-0">
                                <div onClick={() => {
                                    router.back()
                                }} className="flex cursor-pointer">
                                    <BiChevronLeft size={32} color="white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex justify-center w-full">
                        <div className="md:w-[800px] px-2 md:px-0">
                            <div>
                                <p className="font-bold text-[24px]">Law Enforcement</p>
                                <div className="mt-4">
                                    <div className="flex items-center w-full">
                                        <Link href={"/terms-of-service/en"} className="h-full cursor-pointer mr-2 items-center flex w-full justify-between p-6 rounded-lg border border-black border-opacity-[0.2]">
                                            <p className="font-bold">Terms of Service</p>
                                            <MdChevronRight />
                                        </Link>
                                        <Link href={"/privacy-policy/en"} className="h-full cursor-pointer ml-2 items-center flex w-full justify-between p-6 rounded-lg border border-black border-opacity-[0.2]">
                                            <p className="font-bold">Privacy Policy</p>
                                            <MdChevronRight />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center mt-12">
                                <p>Help center</p>
                                <span className='ml-2 opacity-[0.2]'>&gt;</span>
                                <p className='ml-2'>FAQ</p>
                                <span className='ml-2 opacity-[0.2]'>&gt;</span>
                                <p className='ml-2'>Top Question</p>
                                {activeAq ? (
                                    <>
                                        <span className='ml-2 opacity-[0.2]'>&gt;</span>
                                        <p className='ml-2'>{activeAq.question}</p>
                                    </>
                                ) : (<></>)}
                            </div>
                            {activeAq ? (
                                <>
                                    <div className="mt-9">
                                        <div className="flex items-center">
                                            <div className="opacity-[0.65]">Updated on 2023-03-13</div>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <p className="text-xl">{activeAq.question}</p>
                                        <div className="mt-8" style={{
                                            whiteSpace: 'pre-line'
                                        }} dangerouslySetInnerHTML={{
                                            __html: activeAq.answer

                                        }}>

                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="mt-8">
                                    <div className="w-full p-6 rounded-lg border border-black border-opacity-[0.2]">
                                        <div onClick={() => {
                                            setIsTopQuestionsVisible(!isTopQuestionsVisible)
                                        }} className="flex justify-between w-full cursor-pointer">
                                            <p className="font-bold">Top questions</p>
                                            {isTopQuestionsVisible ? <BiChevronDown size={24} /> : <BiChevronUp size={24} />}
                                        </div>
                                        {isTopQuestionsVisible ? (FAQ.map((faq) => (
                                            <button key={faq.question} onClick={() => {
                                                const q = encodeURIComponent(faq.question)
                                                router.push({
                                                    pathname: '/help',
                                                    query: {
                                                        q
                                                    },
                                                })
                                            }} className='mt-6 w-full text-left cursor-pointer border-b border-opacity-[0.2] border-black py-4'>{faq.question}</button>
                                        ))) : (<></>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HelpCenterPage