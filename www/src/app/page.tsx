"use client"

import React, { useState } from 'react';
import { X, Facebook, Instagram, ChevronDown, Search, Menu } from 'lucide-react';

const BDPAHomepage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const slides = [
    {
      title: "NATIONAL CYBER CZAR KEYNOTES BDPACON '24",
      image: "/api/placeholder/800/600",
      link: "#"
    },
    {
      title: "BDPA CELEBRATES 50 YEARS OF EXCELLENCE",
      image: "/api/placeholder/800/600",
      link: "#"
    },
    {
      title: "NEW TECH INITIATIVES ANNOUNCED",
      image: "/api/placeholder/800/600",
      link: "#"
    }
  ];

  const TopBar = () => (
    <div className="bg-blue-500 text-white py-2 px-4 flex justify-between items-center text-sm">
      <div className="flex items-center space-x-4">
        <span>info@bdpa.org</span>
        <div className="flex space-x-2">
          <Facebook size={16} />
          <X size={16} />
          <Instagram size={16} />
        </div>
      </div>
      <div className="hidden md:flex space-x-4">
        <span>Tech and Career Talks</span>
        <span>Conferences</span>
        <span>Events</span>
        <span>News</span>
        <span>Partnerships</span>
        <span>BETF</span>
        <span>bdpatoday®</span>
        <span>PTTV™</span>
      </div>
    </div>
  );

  const NavBar = () => (
    <nav className="bg-white py-4 px-6 flex justify-between items-center shadow-md">
      <div className="text-3xl font-bold text-blue-700">BDPA</div>
      <div className="hidden md:flex space-x-6 text-gray-700">
        <NavItem text="Home" />
        <NavItem text="BDPACON '24" />
        <NavItem text="About" />
        <NavItem text="Membership" hasSubmenu />
        <NavItem text="Programs" hasSubmenu />
        <NavItem text="Chapters" hasSubmenu />
        <NavItem text="Partnership Registration" />
        <NavItem text="Donate" />
      </div>
      <div className="flex items-center space-x-4">
        <Search className="text-gray-500" />
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
          <Menu className="text-gray-700" />
        </button>
      </div>
    </nav>
  );

  const NavItem = ({ text, hasSubmenu = false }) => (
    <div className="relative group">
      <span className="cursor-pointer flex items-center">
        {text}
        {hasSubmenu && <ChevronDown size={16} className="ml-1" />}
      </span>
      {hasSubmenu && (
        <div className="absolute hidden group-hover:block bg-white shadow-md py-2 mt-1">
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">Submenu Item 1</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">Submenu Item 2</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">Submenu Item 3</a>
        </div>
      )}
    </div>
  );

  const Carousel = () => (
    <div className="relative h-[500px] bg-blue-900">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-between p-12 transition-opacity duration-500 ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={slide.image} alt={slide.title} className="w-1/2 h-auto object-cover rounded-lg shadow-lg" />
          <div className="w-1/2 pl-12 text-white">
            <h2 className="text-4xl font-bold mb-6">{slide.title}</h2>
            <a
              href={slide.link}
              className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition-colors"
            >
              Review the full story to discover more →
            </a>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === activeSlide ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <NavBar />
      <main className="flex-grow">
        <Carousel />
        {/* Add more sections here */}
      </main>
      <footer className="bg-gray-800 text-white py-8 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About BDPA</h3>
            <p>Diverse Tech Talent Since 1975</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Membership</a></li>
              <li><a href="#" className="hover:underline">Programs</a></li>
              <li><a href="#" className="hover:underline">Chapters</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>info@bdpa.org</p>
            <div className="flex space-x-4 mt-2">
              <Facebook size={20} />
              <X size={20} />
              <Instagram size={20} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          © 2024 BDPA. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default BDPAHomepage;