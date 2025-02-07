import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useRef } from 'react'

function Bestseller() {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -300, // Adjust this value to match the card's width + gap
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 300, // Adjust this value to match the card's width + gap
                behavior: "smooth",
            });
        }
    }; 
    const cards = Array.from({ length: 20 }).map((_, index) => (
        <div className="min-w-[18rem] h-full" key={index}>
            <div className="w-full h-[24rem] bg-white">
                <Image
                    src="https://mitvana.com/wp-content/uploads/2022/06/MITV-037-300x420.jpg"
                    alt="product image"
                    className="w-full h-full"
                    width={100}
                    height={100}
                />
            </div>
            <div className="text-center mt-3 font-medium text-lg">
                <p>FOOTCARE CREAM</p>
                <p>
                    MRP: <span className="line-through">₹900</span> ₹300.00
                </p>
            </div>
        </div>
    ));

    return (
        <div className='text-customPrimary mt-24 bg-[#fbf4e1] py-24 px-4 md:px-[3rem] lg:px-[6rem] flex flex-col items-center'>
            <h2 className='text-center font-semibold text-4xl mb-2'>Our Best Selling Range</h2>
            <div className='flex w-1/2 justify-evenly text-lg font-medium'>
                <button className='border-b border-customPrimary'>Skincare</button>
                <button>Haircare</button>
                <button>Bath & Body</button>
            </div>
            <div className="w-full flex flex-col justify-center items-center mt-8 relative">
                {/* Navigation Buttons */}
                <div className="absolute flex justify-between w-[108%]">
                    <button
                        onClick={scrollLeft}
                    >
                        <ChevronLeft size={40} strokeWidth={1} />
                    </button>
                    <button
                        onClick={scrollRight}
                    >
                        <ChevronRight size={40} strokeWidth={1} />
                    </button>
                </div>

                {/* Scrollable Container */}
                <div
                    ref={scrollRef}
                    className="w-full h-[28rem] flex items-center gap-8 overflow-x-auto scroll-smooth"
                >
                    {cards}
                </div>
            </div>
        </div>
    )
}

export default Bestseller