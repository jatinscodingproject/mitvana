import React from 'react'
import Image from 'next/image'
import wellness from '@assets/images/new-home/wellness.jpg'
import commitment from '@assets/images/new-home/commitment.jpg'

function Commitment() {
    return (
        <div className='text-customPrimary mt-28 grid md:grid-cols-2 gap-[3rem] px-[3rem] lg:px-[6rem] mb-[3rem]'>
            <div className='flex flex-col'>
                <div className=''>
                    <h3 className='font-base text-4xl'>Your Wellness Journey</h3>
                    <span className='text-2xl text-[#5c808a]'>Our Intuitive Care</span>
                    <p className='my-4 text-lg font-light text-[#5c808a]'>At Mitvana, we believe that wellness is a deeply personal journey that begins with our inner conscious self. By harnessing the unique herbal knowledge of ancient India, we wish to be your partners in your wellness journey.</p>
                </div>
                <div>
                    <Image src={wellness} alt='img' className='w-full h-full rounded-xl' />
                </div>
            </div>
            <div className='flex flex-col md:flex-col-reverse'>
                <div className=''>
                    <h3 className='font-base text-4xl mt-3'>Our Commitment</h3>
                    <p className='my-4 text-lg font-light text-[#5c808a]'>Research and quality is the heart & soul of Mitvana. We closely examine natural sources to formulate dermatology grade personal care for you. No product reaches its final stages without clinical testing and trials first. A strong sense of well-being and a healthy sustainable lifestyle is our motivation behind every creation at our labs.</p>
                </div>
                <div>
                    <Image src={commitment} alt='img' className='w-full h-full rounded-xl' />
                </div>
            </div>
        </div>
    )
}

export default Commitment