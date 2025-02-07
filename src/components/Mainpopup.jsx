import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from "next/link";
import bg from "@assets/images/mainpopup/bg.jpeg";
import p1 from "@assets/images/mainpopup/p1.jpg";
import p2 from "@assets/images/mainpopup/p2.jpg";
import p3 from "@assets/images/mainpopup/p3.jpg";
import p4 from "@assets/images/mainpopup/p4.jpg";
import { FaCopy } from 'react-icons/fa'; // For copy icon


export default function MainPopup() {
    const [isOpen, setIsOpen] = useState(true);
    const [couponCode] = useState('DISCOUNT2025'); // Example coupon code

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    if (!isOpen) return null;

    const handleCopyCoupon = () => {
        navigator.clipboard.writeText(couponCode);
        alert('Coupon code copied!');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="bg-white rounded-lg shadow-lg w-[90vw] sm:w-[80vw] md:w-[80vw] lg:w-[60vw] h-[70vh] sm:h-[50vh] md:h-[50vh] flex flex-col md:flex-row relative"
            >
                {/* Left Side (Sticky Image + Coupon Section) */}
                <div className="relative w-full md:w-1/2 h-full flex flex-col items-center justify-center">
                    {/* Background Image */}
                    <Image
                        src={bg}
                        alt="Popup Background"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg md:rounded-l-lg"
                    />

                    {/* Black Overlay */}
                    <div className="absolute inset-0 bg-black/50 rounded-t-lg md:rounded-l-lg"></div>

                    {/* Heading */}
                    <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 text-white text-center w-[90%] md:w-[80%]">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Wait Before You Leave...</h1>
                        <p className="text-sm sm:text-lg md:text-xl">Get 15% off on your order</p>
                    </div>


                    {/* Coupon Code Box */}
                    <div className="absolute top-[45%] md:top-[50%] left-1/2 transform -translate-x-1/2 text-white py-2 sm:py-3 px-6 rounded-xl border border-white bg-black/50 flex flex-col items-center justify-center w-[90%] sm:w-[80%] md:w-[70%]">
                        <div className="flex items-center gap-3">
                            <p className="text-base sm:text-lg text-center font-bold">{couponCode}</p>
                            <button
                                onClick={handleCopyCoupon}
                                className="text-white p-1 sm:p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                            >
                                <FaCopy />
                            </button>
                        </div>
                    </div>



                    {/* Instructions (Hidden on sm & md, visible on lg and larger) */}
                    <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 text-white text-center w-[90%] md:w-[80%] hidden md:block">
                        <p className="text-sm sm:text-lg md:text-xl">Use the code at checkout to get 15% off</p>
                    </div>

                    {/* CTA Button - Adjusted Margin for Small & Medium Devices */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-6 rounded-lg text-lg mt-4 md:mt-6"
                    >
                        Explore More
                    </button>


                </div>


                {/* Right Side (Products - Vertical Alignment and Scrollable) */}
                

                <div className="w-full md:w-1/2 h-full overflow-hidden flex flex-col">
                    <div className="md:p-5 p-3">
                        <h1 className="border-b-2 border-black mb-2 text-xl sm:text-2xl">Recommended Products</h1>
                    </div>

                    {/* Scrollable Product List */}
                    <div className="overflow-y-auto max-h-[calc(60vh-150px)] pl-5 pr-5 space-y-2">
                        {/* Product 1 */}
                        <Link href="/product/neem-tooth-paste">
                            <div className="p-3 rounded-lg w-full flex cursor-pointer hover:bg-gray-100 transition">
                                <div className="w-[30%]">
                                    <Image
                                        src={p1}
                                        alt="Product 1"
                                        className="w-full h-[auto] object-cover rounded-lg"
                                    />
                                </div>
                                <div className="w-[70%] pl-4 flex flex-col justify-center">
                                    <p className="mt-2 text-start text-xl font-bold">Neem Tooth Paste</p>
                                    <p className="text-start text-lg">₹125.00</p>
                                </div>
                            </div>
                        </Link>

                        {/* Product 2 */}
                        <Link href="/product/anti-dandruff-hair-oil">
                            <div className="p-3 rounded-lg w-full flex cursor-pointer hover:bg-gray-100 transition">
                                <div className="w-[30%]">
                                    <Image
                                        src={p2}
                                        alt="Product 2"
                                        className="w-full h-[auto] object-cover rounded-lg"
                                    />
                                </div>
                                <div className="w-[70%] pl-4 flex flex-col justify-center">
                                    <p className="mt-2 text-start text-xl font-bold">Anti Dandruff Hair Oil</p>
                                    <p className="text-start text-lg">₹350.00</p>
                                </div>
                            </div>
                        </Link>

                        {/* Product 3 */}
                        <Link href="/product/energizing-body-polish-scrub-with-orange-turmeric-walnut">
                            <div className="p-3 rounded-lg w-full flex cursor-pointer hover:bg-gray-100 transition">
                                <div className="w-[30%]">
                                    <Image
                                        src={p3}
                                        alt="Product 3"
                                        className="w-full h-[auto] object-cover rounded-lg"
                                    />
                                </div>
                                <div className="w-[70%] pl-4 flex flex-col justify-center">
                                    <p className="mt-2 text-start text-xl font-bold">Energizing Body Polish Scrub With Orange Turmeric & Walnut</p>
                                    <p className="text-start text-lg">₹425.00</p>
                                </div>
                            </div>
                        </Link>

                        {/* Product 4 */}
                        <Link href="/product/deep-moisturising-body-wash-with-honey-apricot">
                            <div className="p-3 rounded-lg w-full flex cursor-pointer hover:bg-gray-100 transition">
                                <div className="w-[30%]">
                                    <Image
                                        src={p4}
                                        alt="Product 4"
                                        className="w-full h-[auto] object-cover rounded-lg"
                                    />
                                </div>
                                <div className="w-[70%] pl-4 flex flex-col justify-center">
                                    <p className="mt-2 text-start text-xl font-bold">Deep Moisturizing Body Wash With Honey & Apricot</p>
                                    <p className="text-start text-lg">₹300.00</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>


                {/* Close Button inside the Popup */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-2 text-black text-3xl bg-white/50 rounded-full p-0"
                >
                    ✖
                </button>
            </motion.div>
        </div>
    );
}
