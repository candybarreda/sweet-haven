import axios from "axios";

const API_URL = "http://localhost:8080/api/productos";


export const getProductos = async (categoryId = 1) => {
  const res = await axios.get(API_URL, { withCredentials: true, params: { categoryId } });
  return res.data;
};

export const getProducto = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
  return res.data;
};

export const getProductoById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}

export const createProducto = async (producto) => {
  const res = await axios.post(API_URL, producto, { withCredentials: true });
  return res.data;
};

export const updateProducto = async (id, producto) => {
  const res = await axios.put(`${API_URL}/${id}`, producto, { withCredentials: true });
  return res.data;
};

export const deleteProducto = async (id) => {
  await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};
export const getPersonalizacionesPorProducto = async (idProducto) => {
  const response = await axios.get(`${API_URL}/personalizaciones/producto/${idProducto}`);
  return response.data;
};