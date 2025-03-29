'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import Logo from "@/public/Logo.svg"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Efecto para el scroll y cerrar menú al cambiar tamaño de pantalla
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Resources", href: "/resources" },
    { name: "Blog", href: "/blog" },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-vtdarkblue/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/10 dark:border-gray-800/10' 
        : 'bg-vtdarkblue dark:bg-gray-900 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y botón móvil */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <Image
                src={Logo}
                alt="Vigilante Logo"
                width={40}
                height={40}
                className="h-8 w-auto mr-3"
              />
              <span className="text-xl font-bold text-white dark:text-white">
                VIGILANTE
              </span>
            </Link>

            {/* Botón móvil */}
            <button
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Botones auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-white hover:bg-vtwhite/90">
              <Link href="/LogIn">
                Iniciar Sesión
              </Link>
            </Button>
            <Button asChild className="bg-white text-vtdarkblue hover:bg-white/90">
              <Link href="/userRegister">
                Regitrarse
              </Link>
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <div className="md:hidden pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-700 space-y-2">
              <Button variant="ghost" asChild className="w-full text-white hover:bg-white/10">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Log In
                </Link>
              </Button>
              <Button asChild className="w-full bg-white text-vtdarkblue hover:bg-white/90">
                <Link href="/userRegister" onClick={() => setIsOpen(false)}>
                  userRegister
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}