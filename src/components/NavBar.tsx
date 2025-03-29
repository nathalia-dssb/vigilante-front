"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import Logo from "@/public/Logo.svg";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Manejar scroll y cerrar menú al cambiar tamaño de pantalla
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Resources", href: "/resources" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-vtdarkblue/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/10 dark:border-gray-800/10"
          : "bg-vtdarkblue dark:bg-gray-900 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={Logo}
                alt="Logo de Vigilante"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-vtwhite dark:text-white">
                Vigilante
              </span>
            </Link>
          </div>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-vtwhite dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 font-medium px-3 py-2 rounded-md"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Botones desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" asChild className="text-vtwhite hover:bg-vtblue/20">
              <Link href="/login">Log In</Link>
            </Button>
            <Button variant="default" asChild className="bg-vtblue hover:bg-vtblue/90">
              <Link href="/register">Register</Link>
            </Button>
          </div>

          {/* Botón móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-vtwhite hover:text-white hover:bg-vtblue/20 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-vtdarkblue/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-vtblue/20">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-vtwhite hover:bg-vtblue/20"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 pb-2 border-t border-vtblue/20 space-y-2">
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start text-vtwhite hover:bg-vtblue/20"
            >
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Log In
              </Link>
            </Button>
            <Button
              variant="default"
              asChild
              className="w-full justify-start bg-vtblue hover:bg-vtblue/90"
            >
              <Link href="/register" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}