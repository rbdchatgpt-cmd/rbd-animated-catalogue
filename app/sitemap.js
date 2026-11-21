export const dynamic="force-static";
import {products} from "../lib/products";
export default function sitemap(){const base="https://rbd-field-cinema-next.onrender.com";return ["/","/products/","/compare/",...products.map(p=>"/products/"+p.slug+"/")].map(path=>({url:base+path,changeFrequency:"monthly",priority:path==="/"?1:(path==="/products/"?0.95:0.8)}))}