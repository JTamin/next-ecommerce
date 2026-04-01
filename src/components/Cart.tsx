"use client"
import { useCartContext } from "@/context/cartContext"
import Image from "next/image"

export const Cart = () => {
    const { setIsShow, isShow, cart, } = useCartContext()
    return (
        <div >
            <div
                className={`fixed z-50 top-0 right-0 h-full w-full sm:w-100 bg-zinc-300 shadow-lg transition-transform duration-300 ${isShow ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="sticky top-0 z-10 bg-white p-4 border-b flex justify-between items-center">
                    <h2 className="font-semibold">Cart</h2>
                    <button onClick={() => setIsShow(prev => !prev)} className="text-black">✕</button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {cart.map(item => (
                        <div className="grid grid-cols-2" key={item.id}>
                            <div>
                                <Image src={item.image}
                                    alt="image"
                                    width={300}
                                    height={50}
                                />
                            </div>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <button>-</button>
                            <span>1</span>
                            <button>+</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
