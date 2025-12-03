import React from "react";
import Producto from "../components/component/Producto";
import { useCart } from "../context/cardContext";

function Menu(){

  const { dispatch } = useCart();

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <>
      <main>
        
        <Producto categoryId={1} onAddToCart={addToCart}></Producto>
      
      </main>

    </>
    
    
  )

}




export default Menu;