import React from "react";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";
const AboutPage = () => {
  return (
    <div className="lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] bg-black">
      <div className="w-full sm:py-14 py-10">
        <h1 className="font-bold animated-gradient-text text-glow-yellow sm:text-5xl text-4xl mb-4">
          About Shortify
        </h1>
        <p className="text-gray-300 md:w-[70%] sm:w-[85%] w-full mb-10 masked-reveal">
          Shortify makes it effortless to create short links, manage them at scale, and understand performance with real-time analytics — all with privacy and speed.
        </p>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 md:w-[90%]">
          <section className="gradient-border card-hover">
            <div className="card-surface rounded-[11px] p-6">
              <div className="flex items-start gap-4">
                <FaLink className="text-yellow-400 text-3xl" />
                <div>
                  <h2 className="text-yellow-400 text-2xl font-bold">Simple URL Shortening</h2>
                  <p className="text-gray-300 text-base mt-1">
                    Create short, memorable URLs in seconds with an intuitive and familiar interface. Seamlessly customize slugs, set expirations, and add UTM parameters to keep campaigns tidy and measurable.
                  </p>
                  <ul className="mt-3 text-gray-400 text-sm list-disc pl-5 space-y-1">
                    <li>Custom aliases and branded domains</li>
                    <li>One-click copy and quick sharing</li>
                    <li>Expiration and password protection</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="gradient-border card-hover">
            <div className="card-surface rounded-[11px] p-6">
              <div className="flex items-start gap-4">
                <FaShareAlt className="text-yellow-400 text-3xl" />
                <div>
                  <h2 className="text-yellow-400 text-2xl font-bold">Powerful Analytics</h2>
                  <p className="text-gray-300 text-base mt-1">
                    Track clicks, locations, devices, and referrals with clear visualizations. Compare performance across channels and export datasets for your BI workflows.
                  </p>
                  <ul className="mt-3 text-gray-400 text-sm list-disc pl-5 space-y-1">
                    <li>Realtime and historical trends</li>
                    <li>Geo, device, and referrer breakdowns</li>
                    <li>CSV export and API access</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="gradient-border card-hover">
            <div className="card-surface rounded-[11px] p-6">
              <div className="flex items-start gap-4">
                <FaEdit className="text-yellow-400 text-3xl" />
                <div>
                  <h2 className="text-yellow-400 text-2xl font-bold">Enhanced Security</h2>
                  <p className="text-gray-300 text-base mt-1">
                    Private redirects and best-in-class practices keep your data and links protected. Enforce access controls and monitor misuse with automated safeguards.
                  </p>
                  <ul className="mt-3 text-gray-400 text-sm list-disc pl-5 space-y-1">
                    <li>Role-based access controls</li>
                    <li>Bot/threat mitigation and rate limiting</li>
                    <li>Signed links and audit logs</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="gradient-border card-hover">
            <div className="card-surface rounded-[11px] p-6">
              <div className="flex items-start gap-4">
                <FaChartLine className="text-yellow-400 text-3xl" />
                <div>
                  <h2 className="text-yellow-400 text-2xl font-bold">Fast and Reliable</h2>
                  <p className="text-gray-300 text-base mt-1">
                    Global edge infrastructure ensures instant redirects and high availability. Your links stay fast and reliable under load with smart caching and failover.
                  </p>
                  <ul className="mt-3 text-gray-400 text-sm list-disc pl-5 space-y-1">
                    <li>Edge caching across multiple regions</li>
                    <li>99.9%+ uptime and automatic failover</li>
                    <li>Scales seamlessly with traffic spikes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;