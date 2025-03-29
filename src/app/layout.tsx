import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "VIGILANTE - Plataforma de Seguridad Inteligente",
  description: "Sistema integral de monitoreo y alertas de seguridad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es"><head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head><body className="min-h-screen bg-vtwhite text-vtdarkblue flex flex-col">
        <NavBar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-vtblue text-vtwhite py-6">
          <div className="container mx-auto px-6 text-center text-sm">
            <p>© {new Date().getFullYear()} VIGILANTE - Todos los derechos reservados</p>
          </div>
        </footer>
      </body></html>
  );
}