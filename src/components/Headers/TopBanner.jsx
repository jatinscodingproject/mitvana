import Link from "next/link";
import Countdown from "react-countdown";
import React, { useState, useEffect } from "react";
import { getShippingCharges } from "@src/api/services/shippingCharges";

const TopBanner = ({ topclass }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [bannerText, setBannerText] = useState(false);

  useEffect(() => {
    const getText = async () => {
      const res = await getShippingCharges();
      console.log("eh", res);
      setBannerText(res?.topBannerText);
    };

    setIsClient(true);
    getText();
  }, []);

  // Define the target date
  const targetDate = new Date("2027/01/01").getTime();

  // Helper function to pad single digits with a leading zero
  const padWithZero = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  // Renderer for the countdown
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>Time&apos;s up!</span>;
    } else {
      // Calculate weeks from days
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;

      // Render the countdown with padded values
      return (
        <span>
          {weeks} weeks {padWithZero(remainingDays)} days {padWithZero(hours)}:
          {padWithZero(minutes)}:{padWithZero(seconds)}
        </span>
      );
    }
  };

  return (
    <React.Fragment>
      {bannerText && (
        <div className={topclass}>
          <div
            className={`t_header fs-13 d-flex align-items-center ${
              !isOpen ? "d-none" : ""
            }`}
          >
            <div className="container-fluid">
              <div className="d-flex gap-2">
                <div className="col text-center text-white">{bannerText}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TopBanner;
