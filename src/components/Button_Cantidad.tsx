"use client"
import React from 'react'
interface ButtonCantidadProps {
    cantidad: number;
    contador: number;
    setContador: React.Dispatch<React.SetStateAction<number>>;
}
export const Button_Cantidad: React.FC<ButtonCantidadProps> = ({ cantidad, contador, setContador }) => {
    const aumentar = ()=>{
        if(contador<cantidad){
            setContador(contador + 1)
        }
    }
    const disminuir = ()=>{
        if(contador>1){
            setContador(contador - 1)
        }
    }
    return (
        
        <div className='flex justify-center items-center gap-5 m-5'>
            <button onClick={disminuir}
                className="bg-cyan-900 w-10 h-10 rounded-3xl" > - </button>
            {contador}
            <button onClick={aumentar}
                className='bg-cyan-900 w-10 h-10 rounded-3xl' > + </button>
        </div>
    )
}

