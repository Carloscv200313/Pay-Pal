"use client"
import { IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';
interface Props {
    cantidad: number
}
export const Carrito = ({ cantidad }: Props) => {
    return (
        <Link
            href={"/carrito"}
            className=" p-5 rounded-full cursor-pointer flex justify-center items-center">
            <span className=" flex h-1 w-1 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{cantidad} </span>
            <IconShoppingCart stroke={2} className='text-black top-8 right-8 absolute w-8 h-8' />
        </Link>
    )
}
