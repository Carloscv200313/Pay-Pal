import React, { useState } from "react";

interface Agregar_CarritoProps {
    producto: {
        id: number;
        cantidad: number;
        nombre: string;
        descripcion: string;
        precio: number;
        imagen: string;
    };
}

export const Agregar_Carrito: React.FC<Agregar_CarritoProps> = ({ producto }) => {
    const [clicked, setClicked] = useState(false);

    const agregar = () => {
        const valor = localStorage.getItem("carrito");
        const carrito = valor ? JSON.parse(valor) : [];

        if (clicked) {
            const nuevoCarrito = carrito.filter((item: { id: number }) => item.id !== producto.id);
            localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio: producto.precio,
            });
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }

        setClicked(!clicked);
    };

    return (
        <div>
            <button
                className={`px-4 py-2 rounded-md ${clicked ? "bg-red-600 text-white" : "bg-blue-500 text-white"}`}
                onClick={agregar}
            >
                {clicked ? "Cancelar pedido" : "Agregar al carrito"}
            </button>
        </div>
    );
};
