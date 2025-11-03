
import React, { useEffect, useState } from "react";
import Personalizacion from "../components/component/Personalizacion";
import productsData from "../products.json";
import { useParams } from "react-router";
import { useCart } from "../context/cardContext";

function ProductDetails() {
  const { productId } = useParams();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
      
  const addToCart = (product) => {
    console.log(product)
    dispatch({  type: 'ADD_TO_CART', payload: product})
  };
  useEffect(() => {
    
    const selectedProduct = productsData.find((p) => p.id === +productId);
    setTimeout(() => setProduct(selectedProduct), 500);
  }, [productId]);

return(

  <main>
     <div>
      <Personalizacion product={product} onAddToCart={addToCart}/>
    </div>
    
  </main>


  
);




}
export default ProductDetails;