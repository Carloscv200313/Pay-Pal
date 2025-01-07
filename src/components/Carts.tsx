import React from 'react'
import Image from 'next/image'
import { Button_carrito } from './Button_carrito';

interface Producto {
    id: number;
    cantidad: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
}
export const Carts = ({ producto }: { producto: Producto }) => {
    return (
        <div key={producto.id} >
            <Image 
                width={100}
                height={100}
                src={producto.imagen} 
                alt={producto.nombre} 
                className="w-full h-40 object-cover rounded-md" />
            <div className="flex flex-col justify-between">
                <div>
                    <h2>{producto.nombre}</h2>
                    <p className="text-sm text-gray-500">{producto.descripcion}</p>
                    <p className="text-lg font-bold">${producto.precio}</p>
                </div>
                <Button_carrito producto={producto} />
            </div>
        </div>
    )
}
