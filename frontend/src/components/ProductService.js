import axios from 'axios';

const API_URL = 'http://192.168.1.44:3001/shop/amiibos'; // Cambia por la URL de tu backend

export const fetchProductos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching productos:', error);
        throw error;
    }
};

export const fetchProductoById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching producto by ID:', error);
        throw error;
    }
};

export const createProducto = async (producto) => {
    try {
        const response = await axios.post(API_URL, producto);
        return response.data;
    } catch (error) {
        console.error('Error creating producto:', error);
        throw error;
    }
};

export const deleteProducto = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting producto:', error);
        throw error;
    }
};

export const updateProducto = async (id, producto) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, producto);
        return response.data;
    } catch (error) {
        console.error('Error updating producto:', error);
        throw error;
    }
};
