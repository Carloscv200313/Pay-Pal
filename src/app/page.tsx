import { Carrito } from "@/components/Carrito";
import { Carts } from "@/components/Carts";
import { Productos } from "@/components/Objetos";

export default function Home() {
  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute top-10 right-10">
        <Carrito />
      </div>
      <h1 className="text-7xl font-serif">Tienda virtual</h1>
      <div className="grid grid-cols-4 gap-10 sm:grid-cols-4">
        {Productos.map((producto) => (
          <Carts key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}
