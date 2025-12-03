import axios from "axios";

const API_URL = "http://localhost:8080/api/categorias-producto";

export async function getCategoriasProducto() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener categorías");

    return await res.json();
  } catch (error) {
    console.error("Error API categorías:", error);
    throw error;
  }
}