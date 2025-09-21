// Import React for component functionality
import React from "react";
// Import social media icons from react-icons
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// Footer component that displays brand information, copyright, and social media links
const Footer = () => {
  return (
    // Footer container with black background, padding, z-index, and yellow border
    <footer className="bg-black text-gray-300 py-8 z-40 relative border-t border-yellow-500/20">
      {/* Footer content container with responsive layout */}
      <div className="container mx-auto px-6 lg:px-14 flex flex-col lg:flex-row lg:justify-between items-center gap-4">
        {/* Brand section with logo and tagline */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-2 text-yellow-400">Shortify</h2>
          <p className="text-gray-400">Simplifying URL shortening for efficient sharing</p>
        </div>

        {/* Copyright notice */}
        <p className="mt-4 lg:mt-0">
          &copy; 2025 Shortify. All rights reserved.
        </p>

        {/* Social media links section */}
        <div className="flex space-x-6 mt-4 lg:mt-0">
          {/* Facebook link */}
          <a href="#" className="hover:text-yellow-400">
            <FaFacebook size={24} />
          </a>
          {/* Twitter link */}
          <a href="#" className="hover:text-yellow-400">
            <FaTwitter size={24} />
          </a>
          {/* Instagram link */}
          <a href="#" className="hover:text-yellow-400">
            <FaInstagram size={24} />
          </a>
          {/* LinkedIn link */}
          <a href="#" className="hover:text-yellow-400">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
    
  );
};

// Export the component as default
export default Footer;
