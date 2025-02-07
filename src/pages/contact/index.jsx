import React, { useState } from "react";
import FooterCosmetics from "@src/components/FooterCosmetics";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import { DataService } from "@src/api/axios";
import ReCAPTCHA from "react-google-recaptcha";
function Index() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value); // Ensures it's only true when the captcha is completed
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setResponseMessage("Name, email, and message are required.");
      return;
    }

    setLoading(true);
    try {
      DataService.post("/settings/contact", formData, false)
        .then((res) => {
          console.log(res.data);
          setResponseMessage(res?.data?.message);
          if (res?.data?.success) {
            setFormData({
              name: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      setResponseMessage("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <HeaderCosmetics />
      <div className="container my-10">
        <div className="lg:px-20 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8 order-2">
            <div>
              <p className="text-xl font-semibold text-customPrimary">
                Location Map
              </p>
              <hr className="my-2" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4885.369571614994!2d77.64953463558068!3d12.968945432325338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14000ed3224f%3A0xe926c69ba305bfa9!2sLIC%20Colony%2C%20Sector%2011%2C%20New%20Tippasandra%2C%20Bengaluru%2C%20Karnataka%20560075!5e1!3m2!1sen!2sin!4v1737622255716!5m2!1sen!2sinhttps://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4885.440338368841!2d77.6600733!3d12.9653411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae140417d6d1e9%3A0x4878c8cf733f67b!2sMatxin%20Labs%20Pvt%20Ltd!5e1!3m2!1sen!2sin!4v1737622868868!5m2!1sen!2sin"
                width="100%"
                height="300"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div>
              <p className="text-xl font-semibold text-customPrimary">
                Mitvana
              </p>
              <hr className="my-2" />
              <div className="font-base space-y-3">
                <div>
                  <p>No. L-21, F-4 LIC Colony, Sector-14</p>
                  <p>JeevanBhima Nagar</p>
                  <p>Bangalore - 560075. India.</p>
                </div>
                <p className="text-gray-600">info@matxinlabs.com</p>
                <p>+91 8025203871 (10am-6pm; Mon-Sat)</p>
              </div>
            </div>
          </div>
          <div className="order-1">
            <p className="text-xl font-semibold text-customPrimary">
              Get in touch
            </p>
            <hr className="my-2" />
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Your Name*</label>
                <input
                  type="text"
                  name="name"
                  className="border outline-none px-3 py-1 text-base"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Your Email*</label>
                <input
                  type="email"
                  name="email"
                  className="border outline-none px-3 py-1 text-base"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Your Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="border outline-none px-3 py-1 text-base"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="border outline-none px-3 py-1 text-base"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Your Message*</label>
                <textarea
                  rows="6"
                  name="message"
                  className="border outline-none px-3 py-1 text-base"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <ReCAPTCHA
                onChange={handleCaptchaChange}
                sitekey="6LcZN8EqAAAAAJahPwqGoHQXp78JUlaSYSxMfLHE"
              />
              <button
                type="submit"
                className="w-full text-base font-semibold text-white py-2 px-4 bg-[#6d8355]"
                disabled={loading || !captchaVerified}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
            {responseMessage && (
              <p className="text-sm text-red-500 mt-2">{responseMessage}</p>
            )}
          </div>
        </div>
      </div>
      <FooterCosmetics />
    </>
  );
}

export default Index;
