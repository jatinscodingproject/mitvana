import { useState, useRef, useEffect } from 'react'
import { Input } from "../../components/ui/input"

export default function CardOffers() {
    const [couponCode, setCouponCode] = useState('')
    const scrollContainerRef = useRef(null)

    const offers = [
        {
            title: "Buy Any 3 Products @ FLAT ₹899",
            code: "GET3",
            description: "Add 3 or more eligible items to avail this offer.",
            isValid: false,
        },
        {
            title: "Save Upto 35%",
            code: "REDEEM35",
            description: "Add eligible items worth ₹730 more to avail this offer.",
            isValid: true,
        },
        {
            title: "Flat 20% Off + 5% Prepaid Off",
            code: "SAVE25",
            description: "Add eligible items worth ₹330 more to avail this offer.",
            isValid: false,
        },
    ]

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current
        if (scrollContainer) {
            let isDown = false
            let startX;
            let scrollLeft;

            scrollContainer.addEventListener('mousedown', (e) => {
                isDown = true
                startX = e.pageX - scrollContainer.offsetLeft
                scrollLeft = scrollContainer.scrollLeft
            })

            scrollContainer.addEventListener('mouseleave', () => {
                isDown = false
            })

            scrollContainer.addEventListener('mouseup', () => {
                isDown = false
            })

            scrollContainer.addEventListener('mousemove', (e) => {
                if (!isDown) return
                e.preventDefault()
                const x = e.pageX - scrollContainer.offsetLeft
                const walk = (x - startX) * 2
                scrollContainer.scrollLeft = scrollLeft - walk
            })
        }
    }, [])

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div
                ref={scrollContainerRef}
                className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x"
            >
                {offers.map((offer, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col flex-shrink-0 justify-between w-[280px] md:w-auto snap-start"
                    >
                        <div>
                            <h3 className="text-lg font-semibold mb-2">{offer.title}</h3>
                            <div className="flex justify-between items-center mb-2">
                                <button className="text-sm text-blue-600 hover:underline">View details</button>
                                <span className="text-sm text-gray-600">{offer.code}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{offer.description}</p>
                        </div>
                        <div className='flex gap-2 flex-row-reverse'>
                            <button disabled={!offer.isValid} className={`bg-white  ${offer.isValid ? "text-green-400" : "text-[#5e5d5d]"}`}>Apply</button>
                        </div>
                    </div>
                ))}
                <div
                    className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-between flex-shrink-0 w-[280px] md:w-auto snap-start"
                >
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Have a coupon code?</h3>
                        <Input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode.toUpperCase()}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="mb-4"
                        />
                    </div>
                    <div className='flex gap-2 flex-row-reverse'>
                        <button className={` bg-white ${couponCode.length > 0 ? 'text-green-400' : 'text-[#5e5d5d]'}`}>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}