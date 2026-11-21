import Link from "next/link";
export default function Footer(){
return <footer className="site-footer"><div className="container"><div className="footer-grid">
<div><div className="footer-brand">RBD Machine Tools Pvt. Ltd.</div><p>POWERING INDIAN FARMERS.</p><p>Jaipur, Rajasthan, India<br/>+91 9694949030 · info@rbdmachine.com</p></div>
<div><h4>Explore</h4><p><Link href="/products/">Machines</Link><br/><Link href="/story/">Our Story</Link><br/><Link href="/network/">Dealer Network</Link></p></div>
<div><h4>Support</h4><p><Link href="/contact/">Enquiry</Link><br/><Link href="/service/">After-Sales Support</Link><br/><a href="https://www.rbdmachine.com" target="_blank" rel="noopener">Original RBD Store</a></p></div>
</div><div className="footer-bottom">© RBD Machine Tools Pvt. Ltd. · This digital experience uses original RBD catalogue/product references. 3D assets and working video marked pending where not supplied.</div></div></footer>
}