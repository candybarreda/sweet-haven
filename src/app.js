import React from "react";
import PagoForm from "./components/PagoForm";

function App() {
  const pedidoId = 1; // ejemplo, se podría obtener dinámicamente

  const handlePagoRealizado = (pago) => {
    console.log("Pago realizado:", pago);
  };

  return (
    <div className="container mt-5">
      <PagoForm pedidoId={pedidoId} onPagoRealizado={handlePagoRealizado} />
    </div>
  );
}

export default App;