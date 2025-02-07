import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import kalles from "@assets/images/svg/kalles.svg";
import payment2 from "@assets/images/payment2.png";
import ResponsiveFooter from "@src/components/ResponsiveFooter";

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

  return (
    <div className="w-full p-4 lg:hidden afacad-flux tracking-wider">
      <AccordionItem
        title="Get in Touch"
        isOpen={activeIndex === 0}
        onClick={() => handleToggle(0)}
      >
        <AccordionContent>
          <Link href="#!">
            <img
              src={"https://mitvana.com/wp-content/uploads/2021/08/mitvana.png"}
              alt=""
              height="10"
              className="h-16"
              priority
            />
          </Link>
          <h5 className="text-2xl font-semibold text-zinc-700 afacad-flux ">
            Get in touch
          </h5>
          <div className="mt-4 pt-2">
            <p className="d-flex align-items-start text-muted gap-2">
              <i className="pegk pe-7s-map-marker fs-24"></i>
              <span>
                184 Main Rd E, St Albans <br />{" "}
                <span className="pl__30">VIC 3021, Australia</span>
              </span>
            </p>
            <p className="d-flex align-items-start text-muted gap-2">
              <i className="pegk pe-7s-mail fs-24"></i>
              <Link href="mailto:contact@company.com" className="text-reset">
                contact@company.com
              </Link>
            </p>
            <p className="d-flex align-items-start text-muted gap-2">
              <i className="pegk pe-7s-call fs-24"></i>
              <span>+001 2233 456 </span>
            </p>
            <div className="footer-social d-flex align-items-center gap-4 mt-4">
              <Link href="https://www.facebook.com" className="d-inline-block">
                <i className="facl facl-facebook"></i>
              </Link>
              <Link href="https://twitter.com" className="d-inline-block">
                <i className="facl facl-twitter"></i>
              </Link>
              <Link href="https://www.instagram.com" className="d-inline-block">
                <i className="facl facl-instagram"></i>
              </Link>
              <Link href="https://www.linkedin.com" className="d-inline-block">
                <i className="facl facl-linkedin"></i>
              </Link>
              <Link href="https://www.pinterest.com" className="d-inline-block">
                <i className="facl facl-pinterest"></i>
              </Link>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      {footerlinks.map((item, index) => (
        <AccordionItem
          title={item.title}
          isOpen={activeIndex === index + 1}
          onClick={() => handleToggle(index + 1)}
          key={index}
        >
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {item.links.map((link, index) => (
                <a
                  key={index}
                  className=" text-muted font-medium text-lg"
                  href={link.link}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}

      <AccordionItem
        title="NewsLetter Signup"
        isOpen={activeIndex === 4}
        onClick={() => handleToggle(4)}
      >
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <p className="text-muted">
              Subscribe to our newsletter and get 10% off your first purchase
            </p>
            <form id="contact_form" className="d-block">
              <div className="footer-subscribe position-relative space-y-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  defaultValue=""
                  className="input-text form-control w-100 rounded-pill"
                  required
                />
                <button
                  type="submit"
                  className="btn bg-lima text-white rounded-pill"
                >
                  <span>Subscribe</span>
                </button>
              </div>
            </form>
            <div className="mt-3">
              <Image src={payment2} alt="" />
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

export const Footer = () => {
  return (
    <>
      <hr />
      <Accordion />
      <div className="lg:flex gap-4 lg:px-20 mt-20 pb-20 hidden">
        <div className="w-[30%]">
          <Link href="#!">
            <img
              src={"https://mitvana.com/wp-content/uploads/2021/08/mitvana.png"}
              alt=""
              height="10"
              className="h-16"
              priority
            />
          </Link>
          <h5 className="text-2xl font-semibold text-zinc-700 afacad-flux ">
            Get in touch
          </h5>
          <div className="mt-4 pt-2">
            <p className="d-flex align-items-start text-muted gap-2">
              <i className="pegk pe-7s-map-marker fs-24"></i>
              <span>
                184 Main Rd E, St Albans <br />{" "}
                <span className="pl__30">VIC 3021, Australia</span>
              </span>
            </p>
            <p className="d-flex align-items-start text-muted gap-2">
              <i className="pegk pe-7s-mail fs-24"></i>
              <Link href="mailto:contact@company.com" className="text-reset">
                contact@company.com
              </Link>
            </p>
            <p className="d-flex align-items-start text-muted gap-2">
              <i className="pegk pe-7s-call fs-24"></i>
              <span>+001 2233 456 </span>
            </p>
            <div className="footer-social d-flex align-items-center gap-4 mt-4">
              <Link href="https://www.facebook.com" className="d-inline-block">
                <i className="facl facl-facebook"></i>
              </Link>
              <Link href="https://twitter.com" className="d-inline-block">
                <i className="facl facl-twitter"></i>
              </Link>
              <Link href="https://www.instagram.com" className="d-inline-block">
                <i className="facl facl-instagram"></i>
              </Link>
              <Link href="https://www.linkedin.com" className="d-inline-block">
                <i className="facl facl-linkedin"></i>
              </Link>
              <Link href="https://www.pinterest.com" className="d-inline-block">
                <i className="facl facl-pinterest"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[50%] pt-20 flex justify-between">
          {footerlinks.map((item, index) => (
            <div key={index}>
              <h2 className="afacad-flux text-lg font-semibold text-zinc-700 mb-3">
                {item.title}
              </h2>
              <div className="flex flex-col gap-2">
                {item.links.map((link, index) => (
                  <a
                    className=" text-muted font-medium text-sm"
                    href={link.link}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="w-[20%] pt-20 flex justify-between">
          <div>
            <h2 className="afacad-flux text-lg font-semibold text-zinc-700 mb-3">
              Newsletter Signup
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-muted">
                Subscribe to our newsletter and get 10% off your first purchase
              </p>
              <form id="contact_form" className="d-block">
                <div className="footer-subscribe position-relative space-y-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    defaultValue=""
                    className="input-text form-control w-100 rounded-pill"
                    required
                  />
                  <button
                    type="submit"
                    className="btn bg-lima text-white rounded-pill"
                  >
                    <span>Subscribe</span>
                  </button>
                </div>
              </form>
              <div className="mt-3">
                <Image src={payment2} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const FooterPage = () => {
  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const year = new Date().getFullYear();

  const [open, setOpen] = useState(null);
  const handleClick = (id) => {
    if (open === id) {
      setOpen(null);
    } else {
      setOpen(id);
    }
  };

  return (
    <React.Fragment>
      <footer className="footer bg-light">
        <div className="container">
          <Row className="accordion" id="footer-accordion">
            <Col
              md={4}
              lg={3}
              className="mb-2 footer-accordion-item accordion-item"
            >
              <button
                className={`accordion-button footer-accordion-button ${open === 1 ? "" : " collapsed"
                  } px-0`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
                onClick={() => handleClick(1)}
              >
                <h5>Get in touch</h5>
              </button>
              <div
                id="collapseOne"
                className={`accordion-collapse collapse ${open === 1 ? "show" : ""
                  }`}
                data-bs-parent="#accordionExample"
              >
                <Link href="#!">
                  <img
                    src={
                      "https://mitvana.com/wp-content/uploads/2021/08/mitvana.png"
                    }
                    alt=""
                    height="29"
                    priority
                  />
                </Link>

                <div className="mt-4 pt-2">
                  <p className="d-flex align-items-start text-muted gap-2">
                    <i className="pegk pe-7s-map-marker fs-24"></i>
                    <span>
                      184 Main Rd E, St Albans <br />{" "}
                      <span className="pl__30">VIC 3021, Australia</span>
                    </span>
                  </p>
                  <p className="d-flex align-items-start text-muted gap-2">
                    <i className="pegk pe-7s-mail fs-24"></i>
                    <Link
                      href="mailto:contact@company.com"
                      className="text-reset"
                    >
                      contact@company.com
                    </Link>
                  </p>
                  <p className="d-flex align-items-start text-muted gap-2">
                    <i className="pegk pe-7s-call fs-24"></i>
                    <span>+001 2233 456 </span>
                  </p>
                  <div className="footer-social d-flex align-items-center gap-4 mt-4">
                    <Link
                      href="https://www.facebook.com"
                      className="d-inline-block"
                    >
                      <i className="facl facl-facebook"></i>
                    </Link>
                    <Link href="https://twitter.com" className="d-inline-block">
                      <i className="facl facl-twitter"></i>
                    </Link>
                    <Link
                      href="https://www.instagram.com"
                      className="d-inline-block"
                    >
                      <i className="facl facl-instagram"></i>
                    </Link>
                    <Link
                      href="https://www.linkedin.com"
                      className="d-inline-block"
                    >
                      <i className="facl facl-linkedin"></i>
                    </Link>
                    <Link
                      href="https://www.pinterest.com"
                      className="d-inline-block"
                    >
                      <i className="facl facl-pinterest"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              md={2}
              lg={2}
              className="mb-2 accordion-item footer-accordion-item"
            >
              <button
                className={`accordion-button footer-accordion-button ${open === 2 ? "" : " collapsed"
                  } px-0`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
                onClick={() => handleClick(2)}
              >
                <h5 className="afacad-flux">Categories</h5>
              </button>
              <h5 className="fw-medium d-none d-md-block afacad-flux">
                Categories
              </h5>
              <div
                id="collapseTwo"
                className={`accordion-collapse collapse ${open === 2 ? "show" : ""
                  }`}
                data-bs-parent="#accordionExample"
              >
                <div className="mt-md-4 pt-md-2">
                  <ul className="menu list-unstyled">
                    <li className="menu-item">
                      <Link href="/shop-filter-sidebar" className="text-muted">
                        Men
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="/shop-filter-sidebar" className="text-muted">
                        Women
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="/shop-1600px-layout" className="text-muted">
                        Accessories
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="/shop-1600px-layout" className="text-muted">
                        Shoes
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="/shop-1600px-layout" className="text-muted">
                        Denim
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="/shop-1600px-layout" className="text-muted">
                        Dress
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col
              md={3}
              lg={2}
              className="mb-2 accordion-item footer-accordion-item"
            >
              <button
                className={`accordion-button footer-accordion-button px-0 ${open === 3 ? "" : "collapsed"
                  }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
                onClick={() => handleClick(3)}
              >
                <h5 className="afacad-flux">Infomation</h5>
              </button>
              <h5 className="fw-medium d-none d-md-block afacad-flux">
                Infomation
              </h5>
              <div
                id="collapseThree"
                className={`accordion-collapse collapse ${open === 3 ? "show" : ""
                  }`}
                data-bs-parent="#accordionExample"
              >
                <div className="mt-md-4 pt-md-2">
                  <ul className="menu list-unstyled">
                    <li className="menu-item">
                      <Link href="#!" className="text-muted">
                        About Us
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="#!" className="text-muted">
                        Contact Us
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="#!" className="text-muted">
                        Terms &amp; Conditions
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="#!" className="text-muted">
                        Returns &amp; Exchanges
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="#!" className="text-muted">
                        Shipping &amp; Delivery
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="#!" className="text-muted">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col
              md={3}
              lg={2}
              className="mb-2 accordion-item footer-accordion-item"
            >
              <button
                className={`accordion-button footer-accordion-button px-0 ${open === 4 ? "" : "collapsed"
                  }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
                onClick={() => handleClick(4)}
              >
                <h5 className="afacad-flux">Useful links</h5>
              </button>
              <h5 className="fw-medium d-none d-md-block afacad-flux">
                Useful links
              </h5>
              <div
                id="collapseFour"
                className={`accordion-collapse collapse ${open === 4 ? "show" : ""
                  }`}
                data-bs-parent="#accordionExample"
              >
                <div className="mt-md-4 pt-md-2">
                  <ul className="menu list-unstyled">
                    <li className="menu-item">
                      <Link href="#!" className="text-muted">
                        Store Location
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="#!" className="text-muted">
                        Latest News
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="#!" className="text-muted">
                        My Account
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="#!" className="text-muted">
                        Size Guide
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="#!" className="text-muted">
                        FAQs 2
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="#!" className="text-muted">
                        FAQs
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col
              md={10}
              lg={3}
              className="mb-2 accordion-item footer-accordion-item"
            >
              <button
                className={`accordion-button footer-accordion-button px-0 ${open === 5 ? "" : "collapsed"
                  }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
                onClick={() => handleClick(5)}
              >
                <h5 className="afacad-flux">Newsletter Signup</h5>
              </button>
              <h5 className="fw-medium d-none d-md-block afacad-flux">
                Newsletter Signup
              </h5>
              <div
                id="collapseFive"
                className={`accordion-collapse collapse ${open === 5 ? "show" : ""
                  }`}
                data-bs-parent="#accordionExample"
              >
                <div className="mt-md-4 pt-md-2">
                  <p className="text-muted">
                    Subscribe to our newsletter and get 10% off your first
                    purchase
                  </p>
                  <form id="contact_form" className="d-block">
                    <div className="footer-subscribe position-relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        className="border-dark input-text form-control w-100 rounded-pill"
                        required
                      />
                      <button
                        type="submit"
                        className="btn btn-dark position-absolute rounded-pill"
                      >
                        <span>Subscribe</span>
                      </button>
                    </div>
                  </form>
                  <div className="mt-3">
                    <Image src={payment2} alt="" priority />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </footer>

      <div className="footer-alt mb-5 mb-lg-0 py-4">
        <Container>
          <Row className="justify-between text-center text-lg-start">
            <Col lg={6} className="text-muted">
              Copyright © {year}
              <Link href="#!" className="link-info">
                {" "}
                Kalles
              </Link>{" "}
              all rights reserved. Powered by{" "}
              <span className="text-dark">The4</span>
            </Col>
            <Col lg={6}>
              <ul
                id="footer-menu"
                className="mt-2 mt-lg-0 list-unstyled d-flex align-items-center mb-0 justify-content-lg-end justify-content-center flex-wrap"
              >
                <li className="menu-item ">
                  <Link href="/shop-filter-sidebar" className="text-muted mx-2">
                    Shop
                  </Link>
                </li>
                <li className="menu-item ">
                  <Link href="#!" className="text-muted mx-2">
                    About Us
                  </Link>
                </li>
                <li className="menu-item ">
                  <Link href="#!" className="text-muted mx-2">
                    Contact
                  </Link>
                </li>
                <li className="menu-item ">
                  <Link href="#!" className="text-muted mx-2">
                    Blog
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      {/* responsive footer */}

      {/* scroll to top */}
      <Link
        href="#"
        onClick={scrollToTop}
        className="position-fixed bg-white border rounded d-flex align-items-center justify-content-center shadow"
        id="nt_backtop"
      >
        <i className="pr pegk pe-7s-angle-up"></i>
      </Link>

      <div className="backdrop-shadow d-none"></div>
      <ResponsiveFooter />
    </React.Fragment>
  );
};

export default FooterPage;
