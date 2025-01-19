import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
interface Producto{
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidadEnCarrito: number;
    categoria: string;
}
interface Productos {
    productos: Producto[];
    total: number;
}
export const Pago = ({productos, total}: Productos ) => {
    const initialOptions = {
        clientId: "AcfS0ZZ1eLgGXwC_DjwXk8aFs-6aXzTiEopgiwrhxZunt6bXudkTx3FILMW-hKoVdB59UedASJ23W2Hq",
    };
    return (
        <div className="pt-10 w-3/4 text-center ">
            <h1>{total}</h1>
            <h1>{productos[0].nombre} </h1>
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons 
                    style={{ layout: "horizontal" ,color:"blue", borderRadius: 20 , height: 45}}
                    createOrder={async () => {
                        const resp = await fetch("/api/checkout", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                productos,
                                total,
                            }),
                        });                        
                        const order = await resp.json();
                        console.log(order);
                        return order;
                    }}
                    onApprove={async (data, actions) => {
                        console.log(data);
                        await actions.order?.capture();
                    }}
                    onCancel={async (data) => {
                        console.log("se cancelo la orden " + data.orderID);
                    }}
                />
            </PayPalScriptProvider>
        </div>
    )
}
