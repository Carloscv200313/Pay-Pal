"use client"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export default function Home() {
  const initialOptions = {
    clientId: "AcfS0ZZ1eLgGXwC_DjwXk8aFs-6aXzTiEopgiwrhxZunt6bXudkTx3FILMW-hKoVdB59UedASJ23W2Hq",
    currency: "USD",
    intent: "capture",
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons style={{ layout: "horizontal" }} 
        createOrder={async () => {
          const resp = await fetch("/api/checkout", { method: "POST" });
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
  );
}
