import React from "react";
import Hero from "../components/component/Hero";
import Products from "../components/component/Products";
import WhyChooseUs from "../components/component/WhyChooseUs";
import Categories from "../components/component/Categories";
import { useCart } from "../context/cardContext";

function Home() {

  const { dispatch } = useCart();
      
  const addToCart = (product) => {
    console.log(product)
    dispatch({  type: 'ADD_TO_CART', payload: product})
  };   

  return (
    <main>
      <Hero />
      <Products onAddToCart={addToCart} />
      <WhyChooseUs />
      <Categories />
    </main>
  );      
}

export default Home;      