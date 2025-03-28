import Link from "next/link"
import { Button } from "./ui/button" // Asegúrate de tener el componente Button de shadcn
import Image from "next/image"
import Logo from "@/public/Logo.svg"; // Asegúrate de tener el SVG en la carpeta public

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-vtdarkblue dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Columna 1: Logo y nombre */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              {/* Reemplaza con tu logo */}
              <Image
                src={Logo}
                alt="Logo de MiEmpresa"
                width={120}
                height={120}
                className="h-8 w-auto gap-5"
                />;
              <span className="text-xl font-bold text-vtwhite dark:text-vtblack">
                Vigilante
              </span>
            </Link>
          </div>

          {/* Columna 2: Categorías (centro) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-vtwhite dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium"
            >
              Products
            </Link>
            <Link 
              href="/resources" 
              className="text-vtwhite dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium"
            >
              Resources
            </Link>
            <Link 
              href="/blog" 
              className="text-vtwhite dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium"
            >
              Blog
            </Link>
          </div>

          {/* Columna 3: Botones (derecha) */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/LogIn">
                Log In
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/Register">
                Register
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}