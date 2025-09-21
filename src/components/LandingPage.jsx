// Import useNavigate hook for programmatic navigation
import { useNavigate } from "react-router-dom";
// Import React for component functionality
import React from "react";
// Import motion components from framer-motion for animations
import { motion } from "framer-motion";

// Import Card component for feature cards
import Card from "./Card";
// Import custom context hook for accessing authentication state
import { useStoreContext } from "../contextApi/ContextApi";

// Description text for the landing page (currently unused)
let desc =
  "Generate short, memorable links with ease using Linklytics's intuitive interface. Share URLs effortlessly across platforms. Optimize your sharing strategy with Linklytics. Track clicks and manage your links seamlessly to enhance your online presence. Generate short, memorable links with ease using Linklytics's intuitive interface. Share URLs effortlessly across platforms.";

// Main landing page component with hero section, features, and call-to-action
const LandingPage = () => {
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();
  // Get authentication token from global context
  const { token } = useStoreContext();
  // Debug log to check token status
  console.log("TOKEN FROM LANDING PAGE: " + token);

  // Function to navigate to dashboard page
  const dashBoardNavigateHandler = () => {
    navigate("/dashboard");
  };
  return (
    // Main landing page container with responsive padding and full height minus navbar
    <div className="min-h-[calc(100vh-64px)] lg:px-14 sm:px-8 px-4 py-32 md:py-40 bg-black">
      {/* Hero section container with centered content */}
      <div className="flex flex-col items-center justify-center lg:py-8 pt-16 pb-24 md:pb-32 gap-10 text-center">
        {/* Main content wrapper with max width constraint */}
        <div className="w-full max-w-5xl mx-auto px-6">
          {/* Animated main heading with character-by-character animation */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-bold font-roboto md:text-8xl sm:text-7xl text-6xl md:leading-[84px] sm:leading-[72px] leading-[58px] lg:w-full md:w-[90%] w-full text-center mx-auto"
          >
            {/* Split "Build shorter links," into words and characters for animation */}
            {"Build shorter links,".split(" ").map((word, wi) => (
              <span key={`w1-${wi}`} className="inline-block mr-2 align-top">
                {word.split("").map((ch, i) => (
                  <span
                    key={`l1-${wi}-${i}`}
                    className={`animated-gradient-text text-glow-yellow wave-char`}
                    style={{ animationDelay: `${(wi * 6 + i) * 0.04}s` }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            ))}
            {/* Second line with "faster." text */}
            <span className="block text-center md:text-[0.98em] sm:text-[0.98em] text-[0.98em]">
              <span className="inline-block">
                {"faster.".split("").map((ch, i) => (
                  <span
                    key={`l2-${i}`}
                    className={`animated-gradient-text text-glow-yellow wave-char`}
                    style={{ animationDelay: `${(i + 2) * 0.06}s` }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </span>
          </motion.h1>
          {/* Subtitle text with responsive sizing */}
          <p className="text-gray-300 text-lg md:text-xl my-6 md:w-[70%] masked-reveal mx-auto text-center">
            Shortify Simplifies URL Shortening For Efficient Sharing.
          </p>
          {/* Call-to-action buttons container */}
          <div className="flex items-center justify-center gap-4">
            {/* Primary CTA button */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={dashBoardNavigateHandler}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold w-44 rounded-md py-3"
            >
              Get Started
            </motion.button>
            {/* Secondary CTA button */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={dashBoardNavigateHandler}
              className="border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 w-44 rounded-md py-3"
            >
              Create Short Link
            </motion.button>
          </div>
        </div>
        {/* Hero image section */}
        <div className="flex justify-center w-full mt-8">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sm:w-[600px] w-[480px] object-contain"
            src="/project/image.png"
            alt=""
          />
        </div>
        
        {/* Statistics section with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {/* Links Created stat */}
          <div className="text-center">
            <div className="text-yellow-400 text-3xl font-bold">10M+</div>
            <div className="text-gray-400 text-sm">Links Created</div>
          </div>
          {/* Active Users stat */}
          <div className="text-center">
            <div className="text-yellow-400 text-3xl font-bold">50K+</div>
            <div className="text-gray-400 text-sm">Active Users</div>
          </div>
          {/* Uptime stat */}
          <div className="text-center">
            <div className="text-yellow-400 text-3xl font-bold">99.9%</div>
            <div className="text-gray-400 text-sm">Uptime</div>
          </div>
        </motion.div>
      </div>
      {/* Features section with dashboard preview and feature cards */}
      <div className="sm:pt-14 pt-10 mt-40 md:mt-56 lg:mt-72">
        {/* Section heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-yellow-400 font-roboto font-bold lg:w-[60%] md:w-[70%] sm:w-[80%] mx-auto text-3xl text-center"
        >
          Loved by makers and teams shipping links at scale
        </motion.p>
        {/* Dashboard preview image with hover effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 mb-10 flex justify-center group"
        >
          <div className="relative">
            {/* Glow effect background */}
            <div className="absolute inset-0 bg-yellow-400/20 rounded-2xl blur-xl group-hover:bg-yellow-400/40 transition-all duration-300"></div>
            {/* Dashboard preview image */}
            <img
              src="/project/Dash.png"
              alt="Dashboard preview"
              className="relative w-full max-w-6xl rounded-2xl object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>
        </motion.div>
        {/* Feature cards grid */}
        <div className="pt-6 pb-12 grid gap-6 sm:grid-cols-2 grid-cols-1 mt-4">
          {/* Simple URL Shortening feature card */}
          <Card
            title="Simple URL Shortening"
            desc="Create short, memorable URLs in a click with a clean and familiar interface."
            compact
          />
          {/* Powerful Analytics feature card */}
          <Card
            title="Powerful Analytics"
            desc="Track clicks, geos, and referrals with beautiful charts and export options."
            animation="sway"
            compact
          />
          {/* Enhanced Security feature card */}
          <Card
            title="Enhanced Security"
            desc="Your data is protected with best-in-class practices and private redirects."
            animation="hue"
            compact
          />
          {/* Fast and Reliable feature card */}
          <Card
            title="Fast and Reliable"
            desc="Global edge infrastructure ensures instant redirects and high availability."
            animation="float"
            compact
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;