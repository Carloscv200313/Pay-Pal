"use client"
import React, { useState } from 'react';
import Image from 'next/image';

interface Producto {
    id: number;
    cantidad: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
}

interface Props {
    producto: Producto;
    cantidad: number;
    setCantidad: React.Dispatch<React.SetStateAction<number>>;
}

export const Carts: React.FC<Props> = ({ producto, cantidad, setCantidad }) => {
    const [clicked, setClicked] = useState(false);
    const agregar = () => {
        const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');
        if(!clicked){
            const nuevoCarrito = [...carritoActual, producto];
            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
            setCantidad(cantidad + 1); // Actualiza la cantidad usando la función del estado
            setClicked(true);
        }else{
            const nuevoCarrito: Producto[] = carritoActual.filter((carrito: Producto) => carrito.id !== producto.id)
            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
            setCantidad(cantidad - 1); // Actualiza la cantidad usando la función del estado
            setClicked(false);
        }
    };
    return (
        <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">

                <div className="relative flex items-end overflow-hidden rounded-xl">
                    <Image
                        priority
                        width={500}
                        height={500}
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full h-40 object-cover rounded-md"
                    />
                </div>
                <div className="mt-1 p-2">
                    <h2 className="text-slate-700">{producto.nombre}</h2>
                    <p className="mt-1 text-sm text-slate-400">{producto.descripcion}</p>
                    <div className="mt-3 flex items-end justify-between">
                        <p className="text-lg font-bold text-blue-500">${producto.precio}</p>
                        <div className={`flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 cursor-pointer ${clicked ? "bg-red-600 text-white hover:bg-red-600 " : "bg-blue-500 text-white hover:bg-blue-600"} `}  onClick={agregar}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                            </svg>
                            <button className="text-sm">
                                {clicked ? "Delete cart":"Add cart"}
                            </button>
                        </div>
                    </div>
                </div>
        </article>
    );
};
