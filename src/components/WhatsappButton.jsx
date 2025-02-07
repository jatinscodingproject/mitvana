// components/WhatsappButton.jsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/9113076157" // Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <FaWhatsapp size={40} color="#25D366" />
    </a>
  );
};

export default WhatsappButton;
