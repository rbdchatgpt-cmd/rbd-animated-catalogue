import {products,getProduct} from "../../../lib/products";
import ProductPageClient from "../../../components/ProductPageClient";
import {notFound} from "next/navigation";
export function generateStaticParams(){return products.map(p=>({slug:p.slug}))}
export function generateMetadata({params}){const p=getProduct(params.slug);return p?{title:p.name,description:p.intro,alternates:{canonical:"/products/"+p.slug+"/"}}:{title:"Machine not found"}}
export default function ProductDetails({params}){const product=getProduct(params.slug);if(!product)notFound();return <ProductPageClient product={product}/>}