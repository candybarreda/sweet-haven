import React from "react";
import Hero from "../components/component/Hero";
import Producto from "../components/component/Producto";
import WhyChooseUs from "../components/component/WhyChooseUs";
import Categories from "../components/component/Categories";
import { useCart } from "../context/cardContext";
import Header from "../components/component/Header";

function Home() {

  const { dispatch } = useCart();
      
  const addToCart = (product) => {
    console.log(product)
    dispatch({  type: 'ADD_TO_CART', payload: product})
  };   

  return (
    <>
    <main>
      <Hero />
      <Producto onAddToCart={addToCart} />
      <WhyChooseUs />
      <Categories />
    </main>
    </>
    
  );      
}

export default Home;      