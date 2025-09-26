// app/layout.tsx
import "./globals.css";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import { SearchProvider } from "./pages/SearchContext";

export const metadata = {
  title: "My App",
  description: "Next.js App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white bg-gradient-to-br from-[#181023] to-[#3b1a6d]">
        <SearchProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
