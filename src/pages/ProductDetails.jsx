import React, { useEffect, useState } from "react";
import Personalizacion from "../components/component/Personalizacion";
import { useParams } from "react-router";
import { useCart } from "../context/cardContext";
import { getProductoById } from "../productos";   // <--- usamos tu backend

function ProductDetails() {
  const { productId } = useParams();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  console.log(productId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productFromApi = await getProductoById(productId);
        console.log({
          productFromApi
        })
        setProduct(productFromApi);
      } catch (error) {
        console.error("Error cargando producto:", error);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <main>
      <div>
        {/* Corregido: 'producto' no existe. Debe ser 'product' */}
        <Personalizacion product={product} onAddToCart={addToCart} />
      </div>
    </main>
  );
}

export default ProductDetails;