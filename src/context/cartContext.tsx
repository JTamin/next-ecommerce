"use client"
import { Cart } from "@/components/Cart";
import { setAuthCookie } from "@/utils/setCookies";
import Cookies from "js-cookie";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type CartProviderProps = {
    children: React.ReactNode
}
type Product = {
    id: number,
    name: string,
    price: number,
    description: string,
    image: string
}

type CartItem = Product & {
    id: number,
    quantity: number
}

type CartContextType = {
    cart: CartItem[],
    addCart: (product: Product) => void,
    decrease: (id: number) => void,
    deleteItem: (id: number) => void,
    clearCart: () => void,
    cartTotal: () => number,
    itemQty: (id: number) => number,
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>,
    isShow: boolean,
    totalCartQty: number,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

const CartContext = createContext({} as CartContextType)

export const CartProvider = ({ children }: CartProviderProps) => {

    useEffect(() => {
        setAuthCookie(process.env.NEXT_PUBLIC_TEST_TOKEN)
    }, [])

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L3dwIiwiaWF0IjoxNzc1MDA1NDU0LCJuYmYiOjE3NzUwMDU0NTQsImV4cCI6MTc3NTYxMDI1NCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSIsInVzZXIiOnsiSUQiOiIxIiwidXNlcl9sb2dpbiI6IkFkbWluIiwidXNlcl9wYXNzIjoiJHdwJDJ5JDEwJEM1Rk9BTlFUYm9KZ285NUx0c2ZvWXVQY2FhRmFSSXRtQzVEZkQ5Lkw3RnhJSm1TdGJCSUkuIiwidXNlcl9uaWNlbmFtZSI6ImFkbWluIiwidXNlcl9lbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJfdXJsIjoiaHR0cDovL2xvY2FsaG9zdC93cCIsInVzZXJfcmVnaXN0ZXJlZCI6IjIwMjUtMTItMDUgMDI6NDk6NTIiLCJ1c2VyX2FjdGl2YXRpb25fa2V5IjoiIiwidXNlcl9zdGF0dXMiOiIwIiwiZGlzcGxheV9uYW1lIjoiQWRtaW4ifX19fQ.TXr8xZF360n-2AOTQE8z09RZthWoPAJwK5YNmw2yrKI";
    const [cart, setCart] = useState<CartItem[]>([])
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pendingSync, setPendingSync] = useState<{
        cart: CartItem[];
        prevCart: CartItem[];
    } | null>(null);

    const addCart = useCallback(
        (product: Product) => {
            setCart(prev => {
                let updatedCart: CartItem[];
                const prevCart = [...prev]
                const existingProduct = prev?.find(item => item.id === product.id);
                if (existingProduct) {
                    updatedCart = prev.map(item => {
                        return item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    })
                } else {
                    updatedCart = [...prev, { ...product, quantity: 1 }]
                }

                setPendingSync({ cart: updatedCart, prevCart });
                return updatedCart
            })
        }, [cart])
    const decrease = (id: number) => {
        setCart(prev =>
            prev.map(item => item.id === id && item.quantity >= 0
                ? { ...item, qauntity: item.quantity - 1 }
                : item
            ).filter(item => item.quantity > 0)
        )
    }
    const deleteItem = (id: number) => {
        setCart(prev =>
            prev.filter(item => item.id !== id)
        )
    }
    const clearCart = () => {
        setCart([])
    }
    const cartTotal = () => {
        const total = cart.reduce((curr, item) => curr + item.price * item.quantity, 0)
        return total;
    }
    const itemQty = (id: number) => {
        const qty = cart.find(item => item.id === id)?.quantity ?? 0
        return qty
    }
    const totalCartQty = cart.reduce((curr, item) => curr + item.quantity, 0)


    useEffect(() => {
        if (!pendingSync) return;
        setIsLoading(true)
        const syncCart = async () => {
            const payload = pendingSync.cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            }))
            console.log(`payload:${JSON.stringify(payload)}`)
            try {
                const res = await fetch("http://localhost/wp/wp-json/custom-api/v2/add-to-cart", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        product_id: payload[0].product_id,
                        quantity: payload[0].quantity
                    })
                });
                const data = await res.json();
                console.log("API RESPONSE:", data);

                if (!res.ok) {
                    setCart(pendingSync.prevCart);
                    console.log('res is not ok')
                }
                setIsLoading(false)
                setPendingSync(null);
            } catch (error) {
                setCart(pendingSync.prevCart);
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        };

        syncCart();
    }, [pendingSync]);

    return (
        <CartContext.Provider value={{ cart, addCart, decrease, deleteItem, clearCart, cartTotal, itemQty, setIsShow, isShow, totalCartQty, isLoading, setIsLoading }}>
            <Cart />
            {children}
        </CartContext.Provider>
    )
}
export const useCartContext = () => {
    return useContext(CartContext)
}