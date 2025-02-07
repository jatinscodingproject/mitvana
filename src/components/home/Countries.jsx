import React from 'react'
import Image from 'next/image'
import countries from '@assets/images/new-home/countries.jpg'

function Countries() {
  return (
    <div className='text-customPrimary mt-24'>
            <h2 className='text-center font-semibold text-4xl mb-14'>22 Countries & Counting</h2>
            <div className='w-full grid place-items-center'>
            <Image src={countries} alt="img" className='w-5/6'/>
            </div>

    </div>
  )
}

export default Countries