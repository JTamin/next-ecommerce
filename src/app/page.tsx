import Product from "@/components/Product";

type Product = {
  id: number,
  name: string,
  price: number,
  description: string,
  image: string
}
export default async function Home() {
  const res = await fetch('http://localhost/wp/wp-json/custom-api/v2/product');
  const products: Product[] = await res.json();
  return (
    <>
      <Product products={products} />
    </>
  )
}
