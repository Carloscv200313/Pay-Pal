import paypal from "@paypal/checkout-server-sdk"
import { NextResponse } from "next/server";

const clientId="AcfS0ZZ1eLgGXwC_DjwXk8aFs-6aXzTiEopgiwrhxZunt6bXudkTx3FILMW-hKoVdB59UedASJ23W2Hq"
const clientSecret="ECrFa3YSmLi6o6OsgJbDhC54v7cRB3IgX_cYooqXOga6R9u7f1K3ZYj5kLoVgJA6X5N2L500SzMJRGXY"
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
            value: "100.00",
            },
            description: "un libro de React",
        },
        ],
    });
    const respuesta = await client.execute(request);
    console.log(respuesta)
    return NextResponse.json(respuesta.result.id);
}