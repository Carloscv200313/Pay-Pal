"use client"
import { Carrito } from "@/components/Carrito";
import { Carts } from "@/components/Carts";
import { Footer } from "@/components/Footer";
import { Productos } from "@/components/Objetos";
import { useState } from "react";

export default function Home() {
  const [cantidad, setCantidad] = useState(0)
  return (
    <div className="bg-white h-screen">
      <div className="absolute top-10 right-10">
        <Carrito cantidad={cantidad} />
      </div>
      <div className=" py-14 bg-white">
        <h1 className="text-center text-2xl font-bold text-gray-800">Todos los productos</h1>
      </div>
      <section className="py-10  bg-gray-100 grid w-full grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Productos.map((producto) => (
          <Carts key={producto.id} producto={producto} setCantidad={setCantidad} cantidad={cantidad} />
        ))}
      </section>
      <Footer />
    </div>
  );
}
