import React from 'react'
import crueltyFree from '@assets/images/new-home/cruelty free.svg'
import science from '@assets/images/new-home/science.svg'
import natural from '@assets/images/new-home/natural.png'
import chemicalFree from '@assets/images/new-home/chemical free.svg'
import care from '@assets/images/new-home/care.png'
import Image from 'next/image'
const promises = [
    {
        img: crueltyFree,
        text: "Cruelty Free"
    },
    {
        img: science,
        text: "Ancient Wisdom Modern Science"
    },
    {
        img: natural,
        text: "Natural Actives"
    },
    {
        img: chemicalFree,
        text: "Free From Harmful Chemicals"
    },
    {
        img: care,
        text: "Made with Love"
    },
]

function Promises() {
    return (
        <div className='text-customPrimary mt-24'>
            <h2 className='text-center font-semibold text-4xl mb-14 playfair-display'>Mitvana's Promise</h2>
            <div className='w-full flex justify-evenly flex-wrap '>
                {
                    promises.map((promise, index) => (
                        <div key={index}>
                            <div className='h-28 w-28 md:h-32 md:w-32 grid place-items-center'>
                                <Image src={promise.img} alt="img" className='h-full w-full'/>
                            </div>
                            <div className='w-28 md:w-32 text-center'>
                                <p className='text-base font-semibold'>{promise.text}</p>
                            </div>
                        </div>
                    ))
                }



            </div>
        </div>
    )
}

export default Promises