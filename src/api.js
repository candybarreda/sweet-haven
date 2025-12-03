import axios from "axios";

const API_URL = "http://localhost:8080/api";


// Obtener producto por ID
export const getProductoById = async (id) => {
  const res = await axios.get(`${API_URL}/productos/${id}`);
  return res.data;
};

// Obtener personalizaciones por producto
export const getPersonalizacionesPorProducto = async (idProducto) => {
  const res = await axios.get(`${API_URL}/personalizaciones/producto/${idProducto}`);
  return res.data;
};
