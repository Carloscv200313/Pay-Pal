'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface OrderSummaryProps {
  customerInfo: {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    phone: string;
  };
  orderDetails: {
    numItems: number;
    subtotal: number;
    taxRate: number;
  };
}

export default function OrderSummary({ 
  customerInfo = {
    name: "Melissa Flores",
    address: "543 HeartSone",
    postalCode: "K2S Y43",
    city: "Ottawa, CA",
    phone: "123.456.7789"
  },
  orderDetails = {
    numItems: 3,
    subtotal: 110.00,
    taxRate: 0.15
  }
}: OrderSummaryProps) {
  const tax = orderDetails.subtotal * orderDetails.taxRate
  const total = orderDetails.subtotal + tax

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Dirección de entrega */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Dirección de entrega</h2>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{customerInfo.name}</p>
              <p>{customerInfo.address}</p>
              <p>{customerInfo.postalCode}</p>
              <p>{customerInfo.city}</p>
              <p>{customerInfo.phone}</p>
            </div>
          </div>

          <Separator />

          {/* Resumen de orden */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Resumen de orden</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>No. Productos</span>
                <span>{orderDetails.numItems} artículos</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${orderDetails.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Impuestos ({(orderDetails.taxRate * 100)}%)</span>
                <span>${tax.toFixed(2)}</span>
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
        <p className="text-sm text-gray-600">
          Al hacer clic en "Colocar orden", aceptas nuestros{" "}
          <Link href="/terminos" className="text-blue-600 hover:underline">
            términos y condiciones
          </Link>{" "}
          y{" "}
          <Link href="/privacidad" className="text-blue-600 hover:underline">
            política de privacidad
          </Link>
        </p>
        <Button className="w-full" size="lg">
          Colocar orden
        </Button>
      </CardFooter>
    </Card>
  )
}

