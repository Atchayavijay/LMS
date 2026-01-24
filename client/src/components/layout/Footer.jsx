import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed with email:', email);
  };

  const footerLinks = {
    product: [
      { name: 'Landing Page', href: '#' },
      { name: 'Popup Builder', href: '#' },
      { name: 'Web-design', href: '#' },
      { name: 'Content', href: '#' },
      { name: 'Integrations', href: '#' }
    ],
    useCases: [
      { name: 'Web-designers', href: '#' },
      { name: 'Marketers', href: '#' },
      { name: 'Small Business', href: '#' },
      { name: 'Website Builder', href: '#' }
    ],
    resources: [
      { name: 'Academy', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Themes', href: '#' },
      { name: 'Hosting', href: '#' },
      { name: 'Developers', href: '#' },
      { name: 'Support', href: '#' }
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Teams', href: '#' },
      { name: 'Contact Us', href: '#' }
    ]
  };

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Use', href: '#' },
    { name: 'Sales and Refunds', href: '#' },
    { name: 'Legal', href: '#' },
    { name: 'Site Map', href: '#' }
  ];

  return (
    <footer className="relative w-full pt-40 pb-20 px-4 font-satoshi selection:bg-primary-pink/30  ">
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-14 mb-20">
          {/* Product Column */}
          <div>
            <h3 className="text-white text-[20px] font-bold mb-8 tracking-tight">Product</h3>
            <ul className="space-y-5">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white text-[15px] hover:text-white/80 transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases Column */}
          <div>
            <h3 className="text-white text-[20px] font-bold mb-8 tracking-tight">Use Cases</h3>
            <ul className="space-y-5">
              {footerLinks.useCases.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white text-[15px] hover:text-white/80 transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-white text-[20px] font-bold mb-8 tracking-tight">Resources</h3>
            <ul className="space-y-5">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white text-[15px] hover:text-white/80 transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white text-[20px] font-bold mb-8 tracking-tight">Company</h3>
            <ul className="space-y-5">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white text-[15px] hover:text-white/80 transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/10 mb-12"></div>

        {/* Newsletter & Social - Perfectly Aligned */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10">
          {/* Email Subscription - Button Inside Input */}
          <form onSubmit={handleSubscribe} className="relative w-full md:w-auto">
            <div className="relative w-full md:w-[400px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email Address"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-5 pr-32 py-3.5 text-white text-[15px] placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-all backdrop-blur-sm shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#4a3b3e]/80 hover:bg-[#5a4b4e] border border-white/10 text-white text-[13px] font-medium px-6 rounded-[10px] transition-all whitespace-nowrap backdrop-blur-md shadow-lg"
              >
                Subscribe
              </button>
            </div>
          </form>

          {/* Social Icons - White initially with zoom hover */}
          <div className="flex gap-4">
            <a href="#" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a href="#" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a href="#" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
              <Linkedin className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Legal Links & Copyright - Corrected Sizing */}
        <div className="space-y-8">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {legalLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-white text-[14px] hover:text-white/80 transition-colors font-medium">
                {link.name}
              </a>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white text-[13px] tracking-wide">© 2021 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
