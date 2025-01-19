'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { IconCreditCard } from '@tabler/icons-react';
import Link from 'next/link'
import { Pago } from '@/components/Pago'

interface Producto {
    id: number;
    cantidad: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    cantidadEnCarrito: number;
    categoria: string;
}

export default function Home() {
    const [pedido, setPedido] = useState<Producto[]>([])
    const [cantidad, setCantidad] = useState(0)
    const [impuesto, setImpuesto] = useState(0)
    const [subtotal, setSubTotal] = useState(0)
    const [orden, setOrden] = useState("")
    const [total, setTotal] = useState(0)
    const [ordenPagada, setOrdenPagada] = useState(false) // Nuevo estado

    useEffect(() => {
        const pedidos = localStorage.getItem('pedido')
        const dinero = localStorage.getItem('total')
        if (pedidos && dinero) {
            setPedido(JSON.parse(pedidos))
            setSubTotal(Number(dinero))
        }
    }, [])

    useEffect(() => {
        const total = pedido.reduce((acumulador, ped) => acumulador + ped.cantidadEnCarrito, 0);
        setCantidad(total);
        setTotal(subtotal * 118 / 100)
        setImpuesto(subtotal * 18 / 100)
    }, [pedido, subtotal]);
    const eliminar =()=>{
        localStorage.clear();
    }
    return (
        <div className="container mx-auto p-4 flex justify-between ">
            <div className="flex flex-col items-center justify-center flex-wrap gap-4 w-4/6">
                <p className='text-5xl font-serif font-extrabold text-start w-full mt-8 '>{`${ordenPagada?`Orden: ${orden}`:"Verificar Orden"} `}</p>
                {/* Tarjeta de estado de pago */}
                <Card className={`flex flex-row gap-4 w-full items-center justify-start p-4 font-bold text-xl ${ordenPagada ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    <IconCreditCard stroke={2} className='h-10 w-10' />
                    {ordenPagada ? "Pagado" : "No pagado"}
                </Card>

                {pedido.map((producto) => (
                    <Card key={producto.id} className={`flex flex-col w-full justify-center ${ordenPagada  ? 'bg-green-100' : ''}`}>
                        <CardContent className='flex items-center justify-between p-4'>
                            <div className='flex gap-3'>
                                <Image
                                    src={producto.imagen || "/placeholder.svg"}
                                    alt={producto.nombre}
                                    width={1000}
                                    height={1000}
                                    priority
                                    className="w-auto h-24 object-cover"
                                />
                                <div className='flex flex-col'>
                                    <h2 className="text-lg font-semibold">{producto.nombre}</h2>
                                    <p className="text-sm text-gray-600">{producto.descripcion}</p>
                                    <p className='text-gray-600  p-0 m-0 text-sm'>Cantidad : {producto.cantidadEnCarrito}</p>
                                    <p className='text-gray-600  p-0 m-0 text-sm'>Precio : ${producto.precio.toFixed(2)}</p>
                                </div>
                            </div>
                            <p className="text-lg font-bold">${(producto.cantidadEnCarrito * producto.precio).toFixed(2)}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-8 w-1/4 right-10 flex flex-col">
                <Card className="w-full mx-auto">
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-1">Pedidos</h2>
                                <div className="space-y-1 text-base">
                                    {pedido.map((producto) => (
                                        <div key={producto.id} className='flex justify-between py-1'>
                                            <span className='font-medium'>{producto.nombre}</span>
                                            <h2>${producto.cantidadEnCarrito * producto.precio}</h2>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <h2 className="text-xl font-semibold mb-3">Resumen de orden</h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>No. Productos</span>
                                        <span>{cantidad}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Impuestos (18%)</span>
                                        <span>${impuesto.toFixed(2)}</span>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-stretch p-6 pt-0 gap-4">
                        {!ordenPagada ? (
                            <Pago productos={pedido} total={total} impuesto={impuesto} setOrden={setOrden} setOrdenPagada={setOrdenPagada} />
                        ) : (
                            <Link href="/" className="text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-800" onClick={eliminar}>
                                Volver al catálogo
                            </Link>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
