"use client";
import Link from "next/link";
import {useEffect,useMemo,useRef,useState} from "react";
import {Menu,X,Search,ArrowUpRight,GitCompareArrows} from "lucide-react";
import {products} from "../lib/products";

export default function Header(){
 const [menu,setMenu]=useState(false),[search,setSearch]=useState(false),[q,setQ]=useState("");
 const input=useRef(null);
 const found=useMemo(()=>products.filter(p=>(p.name+" "+p.models.join(" ")+" "+p.applications.join(" ")).toLowerCase().includes(q.trim().toLowerCase())),[q]);
 useEffect(()=>{if(search)input.current?.focus()},[search]);
 useEffect(()=>{const handle=e=>{if(e.key==="Escape"){setSearch(false);setMenu(false)}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();setSearch(v=>!v)}};window.addEventListener("keydown",handle);return()=>window.removeEventListener("keydown",handle)},[]);
 const close=()=>{setMenu(false);setSearch(false)};
 return <>
 <header className="site-header catalogue-header">
 <Link href="/" onClick={close} className="site-logo" aria-label="RBD Product Collection home"><span className="logo-frame" role="img" aria-label="Original RBD logo from the supplied catalogue"/><span className="site-logo-text">PRODUCT COLLECTION<br/>2026—27</span></Link>
 <nav className="catalogue-nav" aria-label="Product catalogue navigation"><Link href="/#collection">PRODUCT COLLECTION</Link><Link href="/products/">ALL 14 MACHINES</Link><Link href="/compare/">COMPARE MODELS</Link></nav>
 <div className="catalogue-nav-actions"><button type="button" className="nav-icon" title="Search RBD products" aria-label="Search products" onClick={()=>setSearch(v=>!v)}><Search size={18}/></button><a className="pdf-top-link" href="/RBD-Catalogue-Web.pdf" download>PDF ↓</a><button className="mobile-menu-toggle" type="button" aria-label="Toggle product catalogue navigation" aria-expanded={menu} onClick={()=>setMenu(v=>!v)}>{menu?<X/>:<Menu/>}</button></div>
 </header>
 {menu&&<nav className="catalogue-drawer" aria-label="Mobile product navigation"><Link href="/#collection" onClick={close}>EXPLORE COLLECTION</Link><Link href="/products/" onClick={close}>ALL PRODUCTS</Link><Link href="/compare/" onClick={close}>COMPARE MODELS</Link><a href="/RBD-Catalogue-Web.pdf" download onClick={close}>DOWNLOAD PDF CATALOGUE</a></nav>}
 {search&&<div className="search-overlay" role="dialog" aria-modal="true" aria-label="Catalogue search"><div className="search-panel">
 <div className="search-top"><h2>Find your machine.</h2><button onClick={close} type="button" aria-label="Close search"><X/></button></div>
 <label htmlFor="catalogue-search" className="search-label">Product name, model or application</label><div className="search-input-wrap"><Search size={18}/><input ref={input} value={q} onChange={e=>setQ(e.target.value)} id="catalogue-search" placeholder="Search 7 HP, power reaper, spray…"/></div>
 <div className="search-results"><span className="search-count">{found.length} products in this collection</span>{found.map(p=><Link href={"/products/"+p.slug+"/"} onClick={close} className="search-result" key={p.slug}><div><b>{p.name}</b><small>{p.models.slice(0,3).join(" · ")}</small></div><ArrowUpRight size={16}/></Link>)}{!found.length&&<p>No products found. Try another model or category.</p>}</div><div className="search-bottom">ESC to close · Ctrl/⌘ + K to search</div>
 </div></div>}
 </>;
}