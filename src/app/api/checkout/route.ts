import paypal from "@paypal/checkout-server-sdk"
import { NextResponse } from "next/server";

const clientId = process.env.PAYPAL_CLIENT_ID || '';
const clientSecret = process.env.PAYPAL_SECRET_KEY || '';
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST (){
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
        {
            amount: {
            currency_code: "USD",
            value: "295.00",
            breakdown: {
                item_total: {
                    currency_code: "USD",
                    value: "300.00",
                },
                discount: {
                    currency_code: "USD",
                    value: "10.00",
                    //descuento
                },
                handling: {
                    currency_code: "USD",
                    value: "0.00",
                    //cargo adicional por manejo
                },
                insurance: {
                    currency_code: "USD",
                    value: "0.00",
                    //cargo por seguro en esta transacción
                },
                shipping: {
                    currency_code: "USD",
                    value: "10.00",
                    //costos de envío
                },
                shipping_discount: {
                    currency_code: "USD",
                    value: "5.00",
                    //descuento al envío
                },
                tax_total: {
                    currency_code: "USD",
                    value: "0.00",
                }
            }
            },
            items: [
                {
                    name: "React",
                    description: "re",
                    quantity: "1",
                    unit_amount: {
                        currency_code: "USD",
                        value: "200.00",
                    },
                    category: "DIGITAL_GOODS"
                },
                {
                    name: "React",
                    description: "re",
                    quantity: "1",
                    unit_amount: {
                        currency_code: "USD",
                        value: "100.00",
                    },
                    category: "PHYSICAL_GOODS"
                },
            ],
        },
        ],
    });
    const respuesta = await client.execute(request);
    console.log({Response: respuesta});
    console.log({Captura: respuesta.result});
    return NextResponse.json(respuesta.result.id);
}