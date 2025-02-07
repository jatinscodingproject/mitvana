import FooterCosmetics from "@src/components/FooterCosmetics";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import React from "react";
import NewFooter from "@src/components/new_footer";

const ShippingDeliveryPolicy = () => {
  return (
    <React.Fragment>
      <HeaderCosmetics />
      <div className="mt-4 custom-bg px-5 py-3 custom-text px-md-10">
        <h1 className="afacad-flux fs-1 text-center fw-medium  display-5">
        Shipping & Delivery Policy
        </h1>
        <p className="work-sans fs-5 text-center">Home / Shipping & Delivery Policy</p>
      </div>
      <section
        class="elementor-section elementor-top-section elementor-element elementor-element-37353e2e elementor-section-boxed elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no"
        data-id="37353e2e"
        data-element_type="section"
        style={{width:"80%" , margin:"auto", paddingTop:"30px" ,  paddingBottom:"30px" }}
        data-settings='{"_ha_eqh_enable":false}'
      >
        <div class="elementor-container elementor-column-gap-default">
          <div
            class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-7d740633"
            data-id="7d740633"
            data-element_type="column"
          >
            <div class="elementor-widget-wrap elementor-element-populated">
              <div
                class="elementor-element elementor-element-328d1ebc elementor-widget elementor-widget-text-editor"
                data-id="328d1ebc"
                data-element_type="widget"
                data-widget_type="text-editor.default"
              >
                <div class="elementor-widget-container">
                  <p>
                    <span style={{ fontWeight: 400 }}>
                      STANDARD SHIPPING TIME:&nbsp; <strong>3-5</strong>&nbsp;
                      <strong>BUSINESS DAYS</strong>
                    </span>
                  </p><br />
                  <ul>
                    <li style={{ fontWeight: 400 }} aria-level="1">
                      <span style={{ fontWeight: 400 }}>
                        All orders are shipped from our facility in Bangalore,
                        Karnataka through reputed courier partners.
                      </span>
                    </li>
                    <li style={{ fontWeight: 400 }} aria-level="1">
                      <span style={{ fontWeight: 400 }}>
                        Shipping information is relayed through email, on the
                        email id specified at the time of order placement.
                      </span>
                    </li>
                    <li style={{ fontWeight: 400 }} aria-level="1">
                      <span style={{ fontWeight: 400 }}>
                        Delivery of each order will be to the registered address
                        of the customer as mentioned at the time of order
                        placement only.
                      </span>
                    </li>
                    <li style={{ fontWeight: 400 }} aria-level="1">
                      <span style={{ fontWeight: 400 }}>
                        Reverse Pick-ups are arranged only for returns of
                        damaged or incorrect deliveries. NO reverse pick-up is
                        arranged for any kind of exchanges.
                      </span>
                    </li>
                    <li style={{ fontWeight: 400 }} aria-level="1">
                      <span style={{ fontWeight: 400 }}>
                        Delivery of the shipment is subject to the Courier
                        Company. Mitvana only guarantees timely dispatch within
                        the delivery time mentioned, post order and/or payment
                        confirmation, and is not liable for any delay in
                        delivery by the courier partner.&nbsp;
                      </span>
                    </li>
                    <li style={{ fontWeight: 400 }} aria-level="1">
                      <span style={{ fontWeight: 400 }}>
                        Shipping and handling rates may vary based on product,
                        packaging, size, volume, type and location of delivery.
                        The shipping and handling charges are given at the time
                        of check out and consumers will know about this before
                        making payments.
                      </span>
                    </li>
                  </ul>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterCosmetics />
    </React.Fragment>
  );
};
export default ShippingDeliveryPolicy;
