"use client"
import { Agregar_Carrito } from './Agregar_Carrito';
import { Button_Cantidad } from './Button_Cantidad';
import { useState } from 'react';
interface Producto {
    id: number;
    cantidad: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
}
export const Button_carrito = ({ producto }: { producto: Producto }) => {
    const [contador, setContador] = useState(1);
    return (
        <div>
            <Button_Cantidad cantidad={producto.cantidad} contador={contador} setContador={setContador} />
            <Agregar_Carrito contador={contador} producto={producto} />
        </div>
    )
}
