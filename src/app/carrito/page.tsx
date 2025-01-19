'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Carrito_Vacio from '@/components/Carrito_Vacio'
import Link from 'next/link'
interface ProductoOriginal {
    id: number;
    cantidad: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    cantidadEnCarrito: number;
    categoria: string;
}

interface ProductoCarrito extends Omit<ProductoOriginal, 'cantidad'> {
    cantidadEnCarrito: number;
    cantidadMaxima: number;
}

export default function CarritoDeCompras() {
    const [productosEnCarrito, setProductosEnCarrito] = useState<ProductoCarrito[]>([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const productosGuardados = localStorage.getItem('carrito')
        if (productosGuardados) {
            const productosOriginales: ProductoOriginal[] = JSON.parse(productosGuardados)
            const productosInicializados = productosOriginales.map(producto => ({
                ...producto,
                cantidadEnCarrito: 1,
                cantidadMaxima: producto.cantidad
            }))
            setProductosEnCarrito(productosInicializados)
        }
    }, [])

    useEffect(() => {
        const nuevoTotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidadEnCarrito), 0)
        setTotal(nuevoTotal)
    }, [productosEnCarrito])

    const actualizarCantidad = (id: number, incremento: number) => {
        setProductosEnCarrito(prevProductos => prevProductos.map(producto => {
            if (producto.id === id) {
                const nuevaCantidad = producto.cantidadEnCarrito + incremento
                if (nuevaCantidad > 0 && nuevaCantidad <= producto.cantidadMaxima) {
                    return { ...producto, cantidadEnCarrito: nuevaCantidad }
                }
            }
            return producto
        }))
    }

    const eliminarProducto = (id: number) => {
        const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');
        const nuevoCarrito: ProductoOriginal[] = carritoActual.filter((carrito: ProductoOriginal) => carrito.id !== id)
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
        setProductosEnCarrito(prevProductos => prevProductos.filter(producto => producto.id !== id))
    }
    const Confirmar=()=>{
        localStorage.setItem('pedido', JSON.stringify(productosEnCarrito))
        localStorage.setItem('total', JSON.stringify(total))
    }
    if (productosEnCarrito.length == 0) {
        return <Carrito_Vacio />
    }
    return (
        <div className="container mx-auto p-4 flex ">
            <div className="flex items-center justify-center flex-wrap gap-4 w-3/4">
                {productosEnCarrito.map(producto => (
                    <Card key={producto.id} className="flex flex-col">
                        <CardContent className='p-5'>
                            <Image
                                src={producto.imagen || "/placeholder.svg"}
                                alt={producto.nombre}
                                width={1000}
                                height={1000}
                                priority
                                className="w-full h-48 object-cover mb-2"
                            />
                            <h2 className="text-lg font-semibold">{producto.nombre}</h2>
                            <p className="text-sm text-gray-600">{producto.descripcion}</p>
                            <p className="text-lg font-bold mt-2">${producto.precio.toFixed(2)}</p>
                            <div className="flex items-center justify-between mt-2">
                                <Button
                                    onClick={() => actualizarCantidad(producto.id, -1)}
                                    disabled={producto.cantidadEnCarrito <= 1}
                                >
                                    -
                                </Button>
                                <span>{producto.cantidadEnCarrito}</span>
                                <Button
                                    onClick={() => actualizarCantidad(producto.id, 1)}
                                    disabled={producto.cantidadEnCarrito >= producto.cantidadMaxima}
                                >
                                    +
                                </Button>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                Disponibles: {producto.cantidadMaxima - producto.cantidadEnCarrito}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => eliminarProducto(producto.id)}
                                variant="destructive"
                                className="w-full"
                            >
                                Eliminar
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="mt-8 w-1/4 fixed right-10 flex flex-col">
                <h2 className="text-xl font-bold">Resumen del Pedido</h2>
                {
                    productosEnCarrito.map((producto) => (
                        <div key={producto.id} className='flex justify-between my-5'>
                            <div>
                                <h3 className='p-0 m-0' >{producto.nombre} </h3>
                                <p className='text-neutral-400 font-sans p-0 m-0 text-base'>Cantidad : {producto.cantidadEnCarrito}</p>
                            </div>
                            <h2>${producto.cantidadEnCarrito * producto.precio} </h2>
                        </div>
                    ))
                }
                <div className='flex justify-between text-2xl font-bold pt-5 border-t-2 '>
                    <p>Total a pagar: </p>
                    <p>${total.toFixed(2)}</p>
                </div>
                <Link href={"/Orden"}>
                    <Button className="mt-4 w-full" onClick={Confirmar}>
                        Confirmar Compra
                    </Button>
                </Link>
            </div>
        </div>
    )
}

