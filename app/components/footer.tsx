import React from "react";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="mt-12 py-12 border-t-2 dark:border-neutral-7">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <Logo />
          <p className="text-sm mt-4">
            Capturing moments that last a lifetime. Based in Kumasi, serving clients worldwide.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-lg  mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#services" className="hover:">Services</a></li>
            <li><a href="#portfolio" className="hover:">Portfolio</a></li>
            <li><a href="#testimonials" className="hover:">Testimonials</a></li>
            <li><a href="#contact" className="hover:">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-lg  mb-3">Contact Us</h4>
          <ul className="text-sm">
            <li className="flex items-center gap-2">
              {/* <div className="i-solar-mailbox-bold-duotone"/> */}
              <a href="mailto:info@yourstudio.com" className="hover:">info@corusstudio.com</a>
            </li>
            <li>+233 55 119 3325</li>
            <li>Kumasi, Ghana</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 mt-12 pt-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm">&copy; {new Date().getFullYear()} Corus Studio. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:">
              <div className="i-logos-facebook"/>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:">
              <div className="i-skill-icons-instagram"/>
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:">
              <div className="i-si-twitter-duotone"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
