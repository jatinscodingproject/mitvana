import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // Importing icons

const NewFooter = () => {
  return (
    <footer className="footer bg-light">
      <div className="container">
        <div className="row accordion" id="footer-accordion">
          {/* Get in touch Section */}
          <div className="col-lg-3 col-md-4 mb-2 footer-accordion-item accordion-item">
            <button
              className="accordion-button footer-accordion-button px-0 collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              <h5 className="font-playfair">Get in touch</h5>
            </button>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#footer-accordion"
            >
              <div className="mt-4 pt-2">
                <p className="d-flex align-items-start text-muted gap-2">
                  <FaMapMarkerAlt className="fs-24" />
                  <span>
                    184 Main Rd E, St Albans
                    <br />
                    <span className="pl-30">VIC 3021, Australia</span>
                  </span>
                </p>
                <p className="d-flex align-items-start text-muted gap-2">
                  <FaEnvelope className="fs-24" />
                  <a className="text-reset" href="mailto:contact@company.com">
                    contact@company.com
                  </a>
                </p>
                <p className="d-flex align-items-start text-muted gap-2">
                  <FaPhoneAlt className="fs-24" />
                  <span>+001 2233 456</span>
                </p>
                <div className="footer-social d-flex align-items-center gap-4 mt-4">
                  <a className="d-inline-block" href="https://www.facebook.com">
                    <i className="facl facl-facebook"></i>
                  </a>
                  <a className="d-inline-block" href="https://twitter.com">
                    <i className="facl facl-twitter"></i>
                  </a>
                  <a className="d-inline-block" href="https://www.instagram.com">
                    <i className="facl facl-instagram"></i>
                  </a>
                  <a className="d-inline-block" href="https://www.linkedin.com">
                    <i className="facl facl-linkedin"></i>
                  </a>
                  <a className="d-inline-block" href="https://www.pinterest.com">
                    <i className="facl facl-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="col-lg-2 col-md-2 mb-2 accordion-item footer-accordion-item">
            <button
              className="accordion-button footer-accordion-button px-0 collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <h5 className="font-playfair">Categories</h5>
            </button>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#footer-accordion"
            >
              <div className="mt-md-4 pt-md-2">
                <ul className="menu list-unstyled">
                  <li className="menu-item">
                    <a className="text-muted" href="/shop-filter-sidebar">
                      Men
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/shop-filter-sidebar">
                      Women
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/shop-1600px-layout">
                      Accessories
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/shop-1600px-layout">
                      Shoes
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/shop-1600px-layout">
                      Denim
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/shop-1600px-layout">
                      Dress
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="col-lg-2 col-md-3 mb-2 accordion-item footer-accordion-item">
            <button
              className="accordion-button footer-accordion-button px-0 collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <h5 className="font-playfair">Information</h5>
            </button>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#footer-accordion"
            >
              <div className="mt-md-4 pt-md-2">
                <ul className="menu list-unstyled">
                  <li className="menu-item">
                    <a className="text-muted" href="/home-cosmetics#!">
                      About Us
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/home-cosmetics#!">
                      Contact Us
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/home-cosmetics#!">
                      Terms & Conditions
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/home-cosmetics#!">
                      Returns & Exchanges
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/home-cosmetics#!">
                      Shipping & Delivery
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/home-cosmetics#!">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Useful Links Section */}
          <div className="col-lg-2 col-md-3 mb-2 accordion-item footer-accordion-item">
            <button
              className="accordion-button footer-accordion-button px-0 collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              <h5 className="font-playfair">Useful links</h5>
            </button>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              data-bs-parent="#footer-accordion"
            >
              <div className="mt-md-4 pt-md-2">
                <ul className="menu list-unstyled">
                  <li className="menu-item">
                    <a className="text-muted" href="/home-cosmetics#!">
                      Store Location
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/home-cosmetics#!">
                      Latest News
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/home-cosmetics#!">
                      My Account
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/home-cosmetics#!">
                      Size Guide
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/home-cosmetics#!">
                      FAQs 2
                    </a>
                  </li>
                  <li className="menu-item">
                    <a className="text-muted" href="/home-cosmetics#!">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter Signup Section */}
          <div className="col-lg-3 col-md-10 mb-2 accordion-item footer-accordion-item">
            <button
              className="accordion-button footer-accordion-button px-0 collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              <h5 className="font-playfair">Newsletter Signup</h5>
            </button>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              data-bs-parent="#footer-accordion"
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
                      className="input-text form-control w-100 rounded-pill"
                      required
                    />
                    <button
                      type="submit"
                      className="btn bg-lima text-white position-absolute rounded-pill"
                    >
                      <span>Subscribe</span>
                    </button>
                  </div>
                </form>
                <div className="mt-3">
                  <img
                    alt=""
                    loading="lazy"
                    width="265"
                    height="21"
                    src="assets/imgs/template/secure-checkout.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
