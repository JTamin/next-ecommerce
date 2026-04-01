"use client";

import { Activity, useState } from "react";
import Link from "next/link";
import { BsCart3 } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";
import { useCartContext } from "@/context/cartContext";
import { Cart } from "./Cart";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { setIsShow, isShow, totalCartQty } = useCartContext()

    return (
        <>
            <nav
                className={`w-full backdrop-blur-md transition-all duration-300 ease-in-out ${open
                    ? "bg-zinc-600/90 shadow-lg py-4"
                    : "bg-zinc-500/70 py-1"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4  flex items-center justify-between">
                    <button
                        onClick={() => setOpen(!open)}
                        className="relative w-6 h-6 md:hidden"
                    >
                        <HiMenu
                            size={24}
                            className={`absolute top-0 transition-all duration-300 ease-in-out ${open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                                }`}
                        />
                        <HiX
                            size={24}
                            className={`absolute top-0 transition-all duration-300 ease-in-out ${open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                                }`}
                        />
                    </button>

                    <div className="text-lg font-semibold mx-auto md:mx-0">
                        <Link href="/">
                            {/* <Image
                            src="/shop-logo.png"
                            alt="Logo"
                            width={100}
                            height={40}
                            className="h-auto w-auto"
                        /> */}
                        </Link>
                    </div>

                    <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <li>
                            <Link href="/" className=" transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/cart" className=" transition">
                                Cart
                            </Link>
                        </li>
                    </ul>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <BsCart3 className="text-xl" onClick={() => setIsShow(prev => !prev)} />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                                {/* total cart item quantity */}
                                {totalCartQty}
                            </span>
                        </div>
                    </div>
                </div>

                {open && (
                    <div className="md:hidden px-4 pb-4">
                        <ul className="flex flex-col gap-3 text-sm font-medium text-center">
                            <li>
                                <Link href="/" onClick={() => setOpen(false)}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" onClick={() => setOpen(false)}>
                                    Cart
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>

        </>
    );
}