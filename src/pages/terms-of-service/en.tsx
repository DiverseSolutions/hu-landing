import Footer from '@/components/footer/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

type Props = {}

function TermsOfServiceEN({ }: Props) {
    return (
        <>
            <Navbar />
            <div className="h-[100px] w-full" style={{
                background: `radial-gradient(105.33% 76.33% at 50% 95.88%, #721C1C 0.01%, rgba(0, 0, 0, 0) 100%)`,
                backgroundColor: 'black'
            }}>
                <div className="flex items-center justify-center w-full h-full">
                    <p className="text-4xl text-center text-white">
                        Law enforcement
                    </p>
                </div>
                <div className="mt-8">
                    <div className="flex justify-center w-full">
                        <div className="md:max-w-[800px] w-full md:px-0 px-8">
                            <p className="text-xl font-bold">
                                TERMS AND CONDITION OF SERVICE
                            </p>
                            <p className="mt-8">
                                Dear Customer, in order to avoid any risks and misunderstandings that may arise when using the services of our www.hu.rocks website, you must fully familiarize yourself with and accept the following terms of service.
                            </p>
                            <div className="mt-8">
                                <p><strong>CLARIFICATION:</strong></p>
                                <ul className='pl-8 list-disc'>
                                    <li>The Terms of Service will create a binding and legal contractual relationship between the Service Provider and the customer.</li>
                                    <li>These Terms of Service may be updated or changed depending on the relevant laws of Mongolia, international agreements, or decisions of related parties.</li>
                                    <li>By clicking the &quot;Accept&quot; button, the Customer indicates that he/she has read, understood, and accepted all the terms, conditions, and requirements specified in these Terms of Service.</li>
                                    <li>The Service Provider may extend its services, add new services, and update the terms of service related to them during the period when the customer receives the service.</li>
                                    <li>Any changes to the Terms of Service will be effective from the time they are posted on the Platform.</li>
                                    <li>If the customer continues to receive the service even after the Terms of Service are updated, the customer will be deemed to have accepted the Terms of Service.</li>
                                </ul>
                                <p className='my-4'><strong>TERMS AND CONDITIONS OF SERVICE</strong></p>
                                <p>These TERMS AND CONDITIONS OF SERVICE (hereinafter &ldquo;Terms of Service&rdquo;) describes the terms and conditions for providing the Customer with the promotion of the performance of the HU band, purchase and sale of tickets and related services through the www.hu.rocks website by Ard Financial Group JSC (hereinafter &ldquo;Service Provider&rdquo;).&nbsp;</p>
                                <ol>
                                    <li className='list-decimal'>Terms of Service</li>
                                    <ol className='pl-8 list-decimal'>
                                        <li><span>The HU band&apos;s virtual concert will be held in a virtual space on </span><a className='text-blue-600 underline' href="http://www.metaland.mn" target="_blank" rel="noreferrer">www.metaland.mn</a><span> platform created by MetaForce company.</span></li>
                                        <li><span>The customer will register on the </span><a className='text-blue-600 underline' href="http://www.hu.rocks" target="_blank" rel="noreferrer">www.hu.rocks</a><span> website and purchase the ticket, and with this registration, a double registration will be created on the </span><a className='text-blue-600 underline' href="http://www.metaland.mn" target="_blank" rel="noreferrer">www.metaland.mn</a><span>&nbsp; and </span><a className='text-blue-600 underline' href="http://www.ard.art" target="_blank" rel="noreferrer">www.ard.art</a><span>&nbsp; websites.</span></li>
                                        <li><span>The tickets you purchase, motions and characters will become an asset in form of an NFT and will become the property of the Customer and it can be traded to others through Secondary trading on the </span><a className='text-blue-600 underline' href="https://ard.art" target="_blank" rel="noreferrer">https://ard.art</a><span> marketplace platform.</span></li>
                                        <li>The ustomer will register on the <a className='text-blue-600 underline' href="http://www.hu.rocks" target="_blank" rel="noreferrer">www.hu.rocks</a>&nbsp; website and purchase the ticket, and with this registration, a double registration will be created on the <a className='text-blue-600 underline' href="http://www.metaland.mn" target="_blank" rel="noreferrer">www.metaland.mn</a>&nbsp; and <a className='text-blue-600 underline' href="http://www.ard.art" target="_blank" rel="noreferrer">www.ard.art</a>&nbsp; websites.</li>
                                        <li>When logging in to the <a className='text-blue-600 underline' href="http://www.metaland.mn" target="_blank" rel="noreferrer">www.metaland.mn</a>&nbsp; website, you can log in directly using the username and password registered on the <a className='text-blue-600 underline' href="http://www.hu.rocks" target="_blank" rel="noreferrer">www.hu.rocks</a>&nbsp; website.</li>
                                        <li>When accessing the <a className='text-blue-600 underline' href="https://ard.art" target="_blank" rel="noreferrer">https://ard.art</a>&nbsp; website, it is necessary to create a new password and log in with the login name registered on the <a className='text-blue-600 underline' href="http://www.hu.rocks" target="_blank" rel="noreferrer">www.hu.rocks</a>&nbsp; website using the &quot;reset password&quot; mode.</li>
                                    </ol>
                                    <li className='list-decimal'>Conditions</li>
                                    <ol className='pl-8 list-decimal'>
                                        <li><span>All the information posted on the web page can be viewed freely by the Customer, and in order to order and buy tickets, it is necessary to register and log in as a Member.</span></li>
                                        <li><span>The customer registers as a member by accurately entering his/her name, password, and email address in the &quot;Register&quot; field.</span></li>
                                        <li><span>The Customer&apos;s personal information will not be used for any purpose other than providing the Customer with purchased tickets, membership and attraction information, technical or billing information.</span></li>
                                        <li><span>The customer is responsible for protecting the confidentiality and security of his/her member&apos;s name, password, and any actions (such as purchasing tickets) performed under his/her authority. The Service Provider is not responsible for the risks and damages caused by the Customer&apos;s failure to ensure the security of his personal information.</span></li>
                                        <li><span>Any complaints, suggestions or requests related to Hu Rocks&apos; performance will be received at hurocks@ardsupport.mn, and the Service Provider will respond within 72 hours.</span></li>
                                    </ol>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default TermsOfServiceEN