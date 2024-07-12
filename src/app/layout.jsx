'use client'
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/partials/Header";
import Context from "@/context/context";

export default function RootLayout({ children }) {
  return (
    
      <html lang="es">
          <body className="bg">
            <Context>
              <Header/>
              <main>{children}</main>
            </Context>
          </body>
      </html>
    
  );
}
