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
    const { productos,total } = await req.json();
    //const nuevoTotal: number = productos.reduce((acc: number, producto: Product) => acc + (parseFloat(producto.precio) * producto.cantidadEnCarrito), 0);
    //console.log(productos);
    //console.log(nuevoTotal);
    console.log(total);
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    // Construcción del cuerpo de la solicitud
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: total,
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: total,
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
                        tax_total: {
                            currency_code: "USD",
                            value: "0.00",
                        },
                    },
                },
                items: productos.map((produc: Product) => ({
                    name: produc.nombre,
                    description: produc.descripcion,
                    quantity: produc.cantidadEnCarrito,
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

    //console.log({ Response: respuesta });
    //console.log({ Captura: respuesta.result });

    return NextResponse.json(respuesta.result.id);
}
