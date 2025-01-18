'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Producto {
    id: number;
    cantidad: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
}

export default function CarritoDeCompras() {
    const [productos, setProductos] = useState<Producto[]>([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const productosGuardados = localStorage.getItem('productos')
        if (productosGuardados) {
            setProductos(JSON.parse(productosGuardados))
        }
    }, [])

    useEffect(() => {
        const nuevoTotal = productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
        setTotal(nuevoTotal)
    }, [productos])

    const actualizarCantidad = (id: number, incremento: number) => {
        setProductos(prevProductos => prevProductos.map(producto => {
            if (producto.id === id) {
                const nuevaCantidad = producto.cantidad + incremento
                if (nuevaCantidad > 0 && nuevaCantidad <= producto.cantidad) {
                    return { ...producto, cantidad: nuevaCantidad }
                }
            }
            return producto
        }))
    }

    const eliminarProducto = (id: number) => {
        setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id))
    }

    const realizarPago = () => {
        alert('Procesando pago...')
        // Aquí iría la lógica real de pago
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productos.map(producto => (
                    <Card key={producto.id} className="flex flex-col">
                        <CardContent>
                            <Image 
                                src={producto.imagen || "/placeholder.svg"} 
                                alt={producto.nombre}
                                width={200}
                                height={200}
                                className="w-full h-48 object-cover mb-2"
                            />
                            <h2 className="text-lg font-semibold">{producto.nombre}</h2>
                            <p className="text-sm text-gray-600">{producto.descripcion}</p>
                            <p className="text-lg font-bold mt-2">${producto.precio.toFixed(2)}</p>
                            <div className="flex items-center justify-between mt-2">
                                <Button 
                                    onClick={() => actualizarCantidad(producto.id, -1)}
                                    disabled={producto.cantidad <= 1}
                                >
                                    -
                                </Button>
                                <span>{producto.cantidad}</span>
                                <Button 
                                    onClick={() => actualizarCantidad(producto.id, 1)}
                                    disabled={producto.cantidad >= producto.cantidad}
                                >
                                    +
                                </Button>
                            </div>
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
            <div className="mt-8">
                <h2 className="text-xl font-bold">Resumen del Pedido</h2>
                <p>Total de productos: {productos.reduce((acc, producto) => acc + producto.cantidad, 0)}</p>
                <p className="text-2xl font-bold mt-2">Total a pagar: ${total.toFixed(2)}</p>
                <Button onClick={realizarPago} className="mt-4 w-full">
                    Proceder al Pago
                </Button>
            </div>
        </div>
    )
}

