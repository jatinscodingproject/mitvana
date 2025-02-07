import HeaderCosmetics from '@src/components/HeaderCosmetics'
import React from 'react'
import img1 from '@assets/images/story/img1.jpg'
import img2 from '@assets/images/story/img2.jpg'
import certified from '@assets/images/story/certified.png'
import customers from '@assets/images/story/customers3.svg'
import global from '@assets/images/story/global3.svg'
import Image from 'next/image'
import FooterCosmetics from '@src/components/FooterCosmetics'
import NewFooter from "@src/components/new_footer";

function OurStory() {
    return (
        <div>
            <HeaderCosmetics />
            <div className='container lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-8 mt-20 text-customPrimary'>
                <div>
                    <p className='text-lg font-semibold'>Wellness is a journey, and we believe that it is one of the most personal experiences beginning with our inner selves. At Mitvana, we’re harnessing the unique herbal knowledge of ancient India to be your partners in this wellness journey.</p>
                </div>

                <div className='w-full'>
                    <div className='w-full aspect-square rounded-xl overflow-hidden'>
                        <Image src={img1} alt='img' className='w-full h-full object-cover' />
                    </div>
                </div>

                <div className='space-y-5 text-customPrimary md:col-span-2 lg:col-span-1'>
                    <p className='text-base font-medium'>We're going to save you the time to read through how we're a well-researched head to toe premium brand, crafting products to meet international standards. What you really want is personal care that tunes into your personal journey effectively; not just products but a way of life that is more honest, effective & responsible. And we're here to deliver. Before you start your own journey with Mitvana, you might want to know how ours began.</p>
                    <h5 className='font-semibold text-lg'>THE VISIONARY DOYEN OF HERBAL RESEARCH IN INDIA</h5>
                    <p className='text-base font-medium'>Established in 2011 in Bangalore, India by <strong>Dr. S.K Mitra</strong>, our motivation. Dr Mitra has been previously a partner and Executive Director with the Himalaya Drug Company and CEO of Zandu-Emami group, a veteran in the field of herbal products' research and development for the last 3 decades, he has dedicated his years to make personal care accessible and efficient for all.</p>
                </div>

            </div>
            <div className='lg:px-20 py-[50px]'>
                <div className='container grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <div className='w-full aspect-square border rounded-xl flex flex-col items-center justify-center gap-20 p-4'>
                        <div className='aspect-square h-[50%]'>
                            <Image src={customers} alt='img' className='w-full h-full object-cover' />
                        </div>
                        <div className='text-center text-customPrimary'>
                            <h1 className='text-6xl'>500K+</h1>
                            <p className='text-xl'>Happy customers</p>
                        </div>
                    </div>
                    <div className='w-full aspect-square border rounded-xl flex flex-col items-center justify-center gap-20 p-4'>
                        <div className='aspect-square h-[50%]'>
                            <Image src={global} alt='img' className='w-full h-full object-cover' />
                        </div>
                        <div className='text-center text-customPrimary'>
                            <h1 className='text-6xl'>22+</h1>
                            <p className='text-xl'>Counties</p>
                        </div>
                    </div>
                    <div className='w-full aspect-square border rounded-xl flex flex-col items-center justify-center gap-20 p-4'>
                        <div className='aspect-square h-[50%]'>
                            <Image src={certified} alt='img' className='w-full h-full object-cover' />
                        </div>
                        <div className='text-center text-customPrimary'>
                            <h1 className='text-6xl'>63+</h1>
                            <p className='text-xl'>Products</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className='lg:px-20 py-[50px] bg-[#fbf4df]'>
                <div className='container flex justify-between flex-col md:flex-row gap-5'>

                    <div className='md:w-[40%]'>
                        <div className='w-full aspect-square rounded-xl overflow-hidden'>
                            <Image src={img2} alt='img' className='w-full h-full object-cover' />
                        </div>
                    </div>
                    <div className='md:w-[56%] space-y-5'>
                        <h4 className='text-2xl font-semibold'> Our Promise</h4>
                        <p className='text-customPrimary text-base font-medium'>To say that Natural Herbs are an important element of our production process would be an understatement. As our name suggests, we're Mit-vana or 'friends of the forest. At our core, we're focussed on staying connected to nature. Our natural elements are sourced from responsible suppliers who cultivate these plants using healthy and safe agricultural practices, free from pesticides and any other toxic chemicals, with the extraction of herbs done using only what's good and true - pure water.</p>
                        <p className='text-customPrimary text-base font-medium mb-10'>We believe that only the most authentic and natural personal care can be your meet,your friend, on this journey. And so, our promise is to deliver care that is innovative yet intuitive, products that meet quality standards and at the same time, suit your personal needs, and a way of life that is in tune with your wellness journey.</p>
                        <a href='/shop'>
                        <button className='textx-base font-semibold text-white py-2 px-4 bg-[#6d8355]'>EXPLORE OUR PRODUCTS</button>
                        </a>
                    </div>
                </div>

            </div>
            <FooterCosmetics />
        </div>
    )
}

export default OurStory