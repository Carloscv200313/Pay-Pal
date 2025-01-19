import paypal from "@paypal/checkout-server-sdk";
import { NextRequest, NextResponse } from "next/server";

const clientId = process.env.PAYPAL_CLIENT_ID || '';
const clientSecret = process.env.PAYPAL_SECRET_KEY || '';
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);
interface Product {
    nombre: string;
    descripcion: string;
    cantidadEnCarrito: number;
    precio: string;
    categoria: string;
}
export async function POST(req: NextRequest) {
    const { productos, total, impuesto } = await req.json();
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    // Construcción del cuerpo de la solicitud
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: total ,// Total incluye el impuesto
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: (parseFloat(total) - parseFloat(impuesto)).toFixed(2)
                        },
                        tax_total: {
                            currency_code: "USD",
                            value: impuesto, // Impuesto enviado desde el frontend
                        },
                        discount: {
                            currency_code: "USD",
                            value: "0.00",
                        },
                        handling: {
                            currency_code: "USD",
                            value: "0.00",
                        },
                        insurance: {
                            currency_code: "USD",
                            value: "0.00",
                        },
                        shipping: {
                            currency_code: "USD",
                            value: "0.00",
                        },
                        shipping_discount: {
                            currency_code: "USD",
                            value: "0.00",
                        },
                    },
                },
                items: productos.map((produc: Product) => ({
                    name: produc.nombre,
                    description: produc.descripcion,
                    quantity: produc.cantidadEnCarrito.toString(),
                    unit_amount: {
                        currency_code: "USD",
                        value: produc.precio,
                    },
                    category: "DIGITAL_GOODS",
                })),
            },
        ],
    });

    // Ejecución de la solicitud
    const respuesta = await client.execute(request);

    return NextResponse.json(respuesta.result.id);
}

