import Image from "next/image"

type Products = {
    id: number,
    name: string,
    price: number,
    description: string,
    image: string
}
type ProductProps = {
    products: Products[]
}
const Product = async ({ products }: ProductProps) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-10">
            {products.map((p) => (
                <div key={p.id}
                    className="bg-zinc-700 text-zinc-100 rounded-lg shadow-md overflow-hidden flex flex-col items-center "
                >
                    <div className="w-full h-60 flex items-center justify-center overflow-hidden">
                        <Image
                            src={p.image}
                            alt={p.name}
                            width={500}
                            height={200}
                            className="object-contain transition-transform duration-300 hover:scale-110"
                        />
                    </div>
                    <h1 className="mt-4 text-lg font-semibold text-center">{p.name}</h1>
                    <p className="mt-2 text-center font-medium">{p.price}</p>
                    <p className="mt-2 text-blue-500 cursor-pointer">view details</p>
                    <button className="mt-4 bg-yellow-500 w-full text-white px-6 py-2 rounded  transition">
                        Add to cart
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Product
