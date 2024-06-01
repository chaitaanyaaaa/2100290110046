import axios from 'axios';

const BASE_URL = 'http://example.com/api'; // Replace with actual API URL

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
};
