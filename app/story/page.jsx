import Link from "next/link";
import DocumentaryExperience from "../../components/DocumentaryExperience";
export const metadata={title:"Our Journey | RBD Machine Tools",description:"The story of RBD Machine Tools, its founders and Shark Tank India Season 4 appearance, with RBD-authorised documentary media slots."};
export default function Story(){
return <><section className="inner-hero"><div className="container"><div className="eyebrow">RBD documentary collection</div><h1>From a dream to<br/>a national brand.</h1><p>A story of Indian enterprise, practical agricultural equipment and a national television appearance. Watch the original film chapters as approved RBD-owned media becomes available.</p></div></section>
<section className="doc-section"><div className="container"><div className="eyebrow dark">From Rajasthan to the national stage</div><h2 className="section-heading">Six chapters.<br/>One RBD journey.</h2><p className="muted" style={{maxWidth:750,marginBottom:35}}>Select a chapter to explore the company timeline. Original video sources are not yet supplied, so the film slots are marked rather than filled with unrelated stock or television footage.</p><DocumentaryExperience/></div></section>
<section className="section-pad" style={{background:"#10271c",color:"white"}}><div className="container"><div className="eyebrow">Recognition and responsible reporting</div><h2 className="section-heading">A story rooted in facts.</h2><div className="feature-grid" style={{maxWidth:1000}}>
 <div className="panel"><h3>Established in 2020</h3><p className="muted">Year supported by RBD public company records.</p></div>
 <div className="panel"><h3>Shark Tank India</h3><p className="muted">RBD's appearance on Season 4 in 2025.</p></div>
 <div className="panel"><h3>Company recognition</h3><p className="muted">Award media, certificates and recognition details are awaiting source verification before promotion.</p></div>
 <div className="panel"><h3>Our growing presence</h3><p className="muted">Jaipur, Ahmedabad and Malur are listed in the official RBD contact information.</p></div>
 </div><div style={{marginTop:35}}><Link href="/contact/" className="btn btn-gold">Explore an RBD partnership ↗</Link></div></div></section>
 </>;
}
