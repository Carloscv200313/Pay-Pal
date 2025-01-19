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
    impuesto: number;
    setOrden: React.Dispatch<React.SetStateAction<string>>
    setOrdenPagada: React.Dispatch<React.SetStateAction<boolean>>
}
export const Pago = ({productos, total , impuesto, setOrden,setOrdenPagada}: Productos ) => {
    const initialOptions = {
        clientId: "AcfS0ZZ1eLgGXwC_DjwXk8aFs-6aXzTiEopgiwrhxZunt6bXudkTx3FILMW-hKoVdB59UedASJ23W2Hq",
    };
    return (
        <div className="pt-0 w-full text-center ">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons 
                    style={{ layout: "horizontal" ,color:"gold" , disableMaxWidth: true, borderRadius: 10 , height: 45}}
                    createOrder={async () => {
                        const resp = await fetch("/api/checkout", { method: "POST", body: JSON.stringify({productos,total,impuesto})});
                        const order = await resp.json();
                        console.log(order);
                        setOrden(order)
                        return order;
                    }}
                    onApprove={async (data, actions) => {
                        console.log(data);
                        await actions.order?.capture();
                        setOrdenPagada(true)
                    }}
                    onCancel={async (data) => {
                        console.log("se cancelo la orden " + data.orderID);
                    }}
                />
            </PayPalScriptProvider>
        </div>
    )
}
