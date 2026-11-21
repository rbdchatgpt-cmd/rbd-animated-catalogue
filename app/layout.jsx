import "./globals.css";
import "./catalogue.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
export const metadata={title:{default:"RBD Machine Tools | Product Collection 2026–27",template:"%s | RBD Catalogue"},description:"Premium interactive agricultural machinery product catalogue. Browse, compare and enquire about authentic RBD products.",metadataBase:new URL("https://rbd-field-cinema-next.onrender.com"),openGraph:{title:"RBD Machine Tools — Product Collection 2026–27",description:"Explore fourteen RBD agricultural machinery categories and enquire directly.",type:"website"},robots:{index:true,follow:true}};
export default function RootLayout({children}){return <html lang="en"><body><Header/><main id="main-content">{children}</main><Footer/></body></html>}