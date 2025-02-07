import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import footerIcons from "../assets/images/footer-icons.png";
import kalles from "@assets/images/svg/kalles.svg";
import payment2 from "@assets/images/payment2.png";
import ResponsiveFooter from "./ResponsiveFooter";
import toast from "react-hot-toast";
import { postSubscribeEmail } from "@src/api/services/subscribeService";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { color } from "framer-motion";
import { Weight } from "lucide-react";

const footerlinks = [
  {
    title: "Categories",
    links: [
      {
        name: "Men",
        link: "",
      },
      {
        name: "Women",
        link: "",
      },
      {
        name: "Accessories",
        link: "",
      },
      {
        name: "Shoes",
        link: "",
      },
      {
        name: "Denim",
        link: "",
      },
      {
        name: "Dress",
        link: "",
      },
    ],
  },
  {
    title: "Infomation",
    links: [
      {
        name: "About Us",
        link: "",
      },
      {
        name: "contact Us",
        link: "",
      },
      {
        name: "Terms & Conditions",
        link: "",
      },
      {
        name: "Returns & Exchanges",
        link: "",
      },
      {
        name: "Shipping & Delivery",
        link: "",
      },
      {
        name: "Privacy Policy",
        link: "",
      },
    ],
  },

  {
    title: "Useful links",
    links: [
      {
        name: "Store Location",
        link: "",
      },
      {
        name: "Latest News",
        link: "",
      },
      {
        name: "Link3",
        link: "",
      },
      {
        name: "My Account",
        link: "",
      },
      {
        name: "Size Guide",
        link: "",
      },
      {
        name: "FAQs 2",
        link: "",
      },
      {
        name: "FAQs",
        link: "",
      },
    ],
  },
];

// AccordionItem component for individual items
const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border-b last:border-none">
      <button
        onClick={onClick}
        className="w-full text-left p-4 flex justify-between items-center"
      >
        <span className="text-lg font-medium">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform transform ${isOpen ? "rotate-180" : "rotate-0"
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && <div className="p-4 text-zinc-700">{children}</div>}
    </div>
  );
};

// Main Accordion component
const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the active accordion
    } else {
      setActiveIndex(index); // Open the clicked accordion
    }
  };

  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    if (validateEmail(email)) {
      console.log("Valid Email:", email);
      const obj = { email };
      await postSubscribeEmail(obj);
    } else {
      console.error("Invalid Email");
      toast.error("Please enter a valid email address.");
    }
  };
  return (
    <div className="w-full p-4 lg:hidden afacad-flux tracking-wider">
      <AccordionItem
        title="Get In Touch"
        isOpen={activeIndex === 0}
        onClick={() => handleToggle(0)}
      >
        <AccordionContent>
          <div className="flex flex-col gap-3">
            {/* Phone Number */}
            <div className="flex items-center gap-2 text-zinc-700 font-light">
              <FaPhoneAlt className="text-zinc-500" />
              <span>+918025203871</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-zinc-700 font-light">
              <FaEnvelope className="text-zinc-500" />
              <span>info@matxinlabs.com</span>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-zinc-500" />
                <h6 className="text-base text-zinc-800 font-light">
                  Matxin Labs Pvt Ltd
                </h6>
              </div>
              <p className="text-zinc-700 font-light">
                No: L-21, F-4, Sector-14, JeevanBhima Nagar
              </p>
              <p className="text-zinc-700 font-light">
                Bangalore-546895, India
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        title="Categories"
        isOpen={activeIndex === 1}
        onClick={() => handleToggle(1)}
      >
        <AccordionContent>
          <div className="flex flex-col gap-3">
            <a href="/product-category/skin-care" className="text-zinc-700 font-light">
              Skin Care
            </a>
            <a href="/product-category/hair-care" className="text-zinc-700 font-light">
              Hair Care </a>
            <a href="/product-category/hair-cleanser" className="text-zinc-700 font-light">
              Hair Cleanser
            </a>
            <a href="/product-category/body-bath" className="text-zinc-700 font-light">
              Baby & Bath
            </a>
            <a
              href="/product-category/oils-treatment"
              className="text-zinc-700 font-light"
            >
              Oils & Treatment
            </a>
            <a
              href="/product-category/face-care"
              className="text-zinc-700 font-light"
            >
              Face Care
            </a>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        title="More Categories"
        isOpen={activeIndex === 2}
        onClick={() => handleToggle(2)}
      >
        <AccordionContent>
          <div className="flex flex-col gap-3">
            <a href="/product-category/body-butters" className="text-zinc-700 font-light">
            Body Butters
            </a>
            <a href="/product-category/serum-treatment" className="text-zinc-700 font-light">
            Serum & Treatment</a>
            <a href="/product-category/mens-range" className="text-zinc-700 font-light">
            Mens Range
            </a>
            <a href="/product-category/hair-creams" className="text-zinc-700 font-light">
            Hair Creams
            </a>
            <a
              href="/product-category/hand-care"
              className="text-zinc-700 font-light"
            >
             Hand Care
            </a>
            <a
              href="/product-category/hair-serums"
              className="text-zinc-700 font-light"
            >
             Hair Serums
            </a>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        title="Information"
        isOpen={activeIndex === 3}
        onClick={() => handleToggle(3)}
      >
        <AccordionContent>
          <div className="flex flex-col gap-3">
            <a href="#" className="text-zinc-700 font-light">
              About Us
            </a>
            <a href="/faq" className="text-zinc-700 font-light">
              FAQs
            </a>
            <a href="/terms-of-service" className="text-zinc-700 font-light">
              Terms & Conditions
            </a>
            <a href="/refund_returns" className="text-zinc-700 font-light">
              Returns & Exchanges
            </a>
            <a
              href="/shipping-delivery-policy"
              className="text-zinc-700 font-light"
            >
              Shipping & Delivery
            </a>
            <a
              href="/privacy-policy"
              className="text-zinc-700 font-light"
            >
              Privacy & Policy
            </a>
          </div>
        </AccordionContent>
      </AccordionItem>



      <AccordionItem
        title="Keep In Touch"
        isOpen={activeIndex === 3}
        onClick={() => handleToggle(3)}
      >
        <AccordionContent>
          <div className="flex flex-col items-start gap-3">
            <p className="text-zinc-700 font-semibold">
              Get Special discounts to your inbox
            </p>
            <div className="w-full flex items-center gap-2">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-1/2 px-2 py-1 text-sm rounded outline-none"
              />
              <button
                onChange={handleSubscribe}
                className="text-sm px-3 py-1 bg-[#6e8456] text-white rounded"
              >
                Subscribe
              </button>
            </div>
            <div className="w-full flex justify-start">
              <Image
                src={footerIcons}
                alt="icons"
                width={"100%"}
                height={100}
                className="w-2/3"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

// Custom AccordionContent component for flexibility
const AccordionContent = ({ children }) => {
  return <div>{children}</div>;
};

const FooterCosmetics = () => {
  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const year = new Date().getFullYear();

  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    if (validateEmail(email)) {
      console.log("Valid Email:", email);
      const obj = { email };
      await postSubscribeEmail(obj);
    } else {
      console.error("Invalid Email");
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <div className="bg-light pt-24 pb-20">
      <Accordion />

      {/* Main Section for Mitvana, Support, and Keep In Touch */}
      <div className="lg:grid lg:grid-cols-12 gap-2 lg:px-10 pb-10 border-b border-white hidden lg:block">

        {/* Mitvana Section - col-span-3 */}
        <div className="col-span-3 text-center">
          <h2 className="text-4xl font-bold text-gray-700">Mitvana</h2>
          <div className="mt-4 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-zinc-500" />
              <span className="text-zinc-700 font-light">+918025203871</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-zinc-500" />
              <span className="text-zinc-700 font-light">info@matxinlabs.com</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-zinc-500" />
                <h6 className="text-base text-zinc-700 font-light">Matxin Labs Pvt Ltd</h6>
              </div>
              <p className="text-zinc-700 font-light">L-21, F-4, Sector 14, LIC Colony,</p>
              <p className="text-zinc-700 font-light">Jeevan Bima Nagar, Bengaluru,</p>
              <p className="text-zinc-700 font-light">Karnataka 560075, India</p>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="https://www.facebook.com" className="d-inline-block">
              <i className="facl facl-facebook text-zinc-500 text-xl"></i>
            </Link>
            <Link href="https://twitter.com" className="d-inline-block">
              <i className="facl facl-twitter text-zinc-500 text-xl"></i>
            </Link>
            <Link href="https://www.instagram.com" className="d-inline-block">
              <i className="facl facl-instagram text-zinc-500 text-xl"></i>
            </Link>
            <Link href="https://www.linkedin.com" className="d-inline-block">
              <i className="facl facl-linkedin text-zinc-500 text-xl"></i>
            </Link>
            <Link href="https://www.pinterest.com" className="d-inline-block">
              <i className="facl facl-pinterest text-zinc-500 text-xl"></i>
            </Link>
          </div>
        </div>

        {/* Support Section - col-span-2 */}
        <div className="col-span-2 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Categories</h2>
          <div className="mt-4 flex flex-col items-center gap-3">
            <a href="/product-category/skin-care" className="text-zinc-700 font-light">Skin Care</a>
            <a href="/product-category/hair-care" className="text-zinc-700 font-light">Hair Care</a>
            <a href="/product-category/hair-cleanser" className="text-zinc-700 font-light">Hair Cleanser</a>
            <a href="/product-category/body-bath" className="text-zinc-700 font-light">Baby & Bath</a>
            <a href="/product-category/oils-treatment" className="text-zinc-700 font-light">Oil & Treatment</a>
            <a href="/product-category/face-care" className="text-zinc-700 font-light">Face Care</a>
          </div>
        </div>

        <div className="col-span-2 text-center">
          <h2 className="text-xl font-semibold text-gray-700">More Categories</h2>
          <div className="mt-4 flex flex-col items-center gap-3">
            <a href="/product-category/body-butters" className="text-zinc-700 font-light">Body Butters</a>
            <a href="/product-category/serum-treatment" className="text-zinc-700 font-light">Serum & Treatment</a>
            <a href="/product-category/mens-range" className="text-zinc-700 font-light">Mens Range</a>
            <a href="/product-category/hair-creams" className="text-zinc-700 font-light">Hair Creams</a>
            <a href="/product-category/hand-care" className="text-zinc-700 font-light">Hand Care</a>
            <a href="product-category/hair-serums" className="text-zinc-700 font-light">Hair Serums</a>
          </div>
        </div>

        {/* Information Section - col-span-2 */}
        <div className="col-span-2 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Infomation</h2>
          <div className="mt-4 flex flex-col items-center gap-3">
            <a href="#" className="text-zinc-700 font-light">About Us</a>
            <a href="/faq" className="text-zinc-700 font-light">FAQs</a>
            <a href="/terms-of-service" className="text-zinc-700 font-light">Terms & Conditions</a>
            <a href="/refund_returns" className="text-zinc-700 font-light">Returns & Exchanges</a>
            <a href="/shipping-delivery-policy" className="text-zinc-700 font-light">Shipping & Delivery</a>
            <a href="/privacy-policy" className="text-zinc-700 font-light">Privacy Policy</a>
          </div>
        </div>

        {/* Useful links Section - col-span-2 */}
        

        {/* Keep In Touch Section - col-span-3 */}
        <div className="col-span-3 lg:col-span-2 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Keep In Touch</h2>
          <div className="mt-4 flex flex-col items-center gap-3">
            <p className="text-zinc-700 font-semibold">Get Special discounts to your inbox</p>
            <div className="w-full flex justify-center items-center gap-2">
              {/* Email input and Subscribe button in the same row */}
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-1/2 px-2 py-2 text-sm rounded outline-none"
              />
              <button
                onClick={handleSubscribe}
                className="text-sm px-3 py-2 bg-[#6e8456] text-white rounded"
              >
                Subscribe
              </button>
            </div>
            <div className="w-full flex justify-center">
              <Image src={footerIcons} alt="icons" width={"100%"} height={100} className="w-2/3" />
            </div>
          </div>
        </div>

      </div>


      {/* Footer Section */}
      <div className="flex justify-between lg:px-20 pt-20">
        <div className="w-3/5 flex justify-start items-center">
          <p>
            @2024 <span style={{ color: "#6e8456", fontWeight: "bold" }}>Mitvana</span>. All Rights are Reserved
          </p>
        </div>
        <div className="w-1/5 flex justify-end items-center">
          <Image src={payment2} alt="" />
        </div>
      </div>

      <div className="backdrop-shadow d-none"></div>
      <ResponsiveFooter />
    </div>

  );

};

export default FooterCosmetics;
