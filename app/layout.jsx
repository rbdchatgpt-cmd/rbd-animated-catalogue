import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
export const metadata={title:{default:"RBD Product Collection 2026–27",template:"%s | RBD Product Collection"},description:"RBD Machine Tools 2026–27 digital product catalogue. Explore machinery, compare reference specifications and enquire directly.",metadataBase:new URL("https://rbd-field-cinema-next.onrender.com"),openGraph:{title:"RBD Product Collection 2026–27",description:"Premium interactive machinery catalogue · Powering Indian Farmers.",type:"website"},robots:{index:true,follow:true}};
export default function RootLayout({children}){return <html lang="en"><body><Header/><main>{children}</main><Footer/></body></html>}
