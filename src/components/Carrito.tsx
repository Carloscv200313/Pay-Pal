"use client"
import { IconShoppingCart } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
export const Carrito = () => {
    const [cantidad, setCantidad] = useState(0);
    useEffect(() => {
        const valor = localStorage.getItem("carrito");
        const carrito = valor ? JSON.parse(valor) : [];
        setCantidad(carrito.length);
    }, [])
    return (
        <div className="bg-amber-600 p-5 rounded-full cursor-pointer">
            <IconShoppingCart stroke={2} />
            <span className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center">{cantidad}</span>    
        </div>
    )
}
