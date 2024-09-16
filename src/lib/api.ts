import { endpoinUrlProd, endpoinUrlLocal } from "../utils/environment";

const API_URL = endpoinUrlProd;

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export const getProducts = async () => {
    return fetchAPI(`/products`)
}

export const getProductById = async (id: string) => {
    return fetchAPI(`/products/${id}`)
}

export const createOrder = async (order: any) => {
    return fetchAPI('/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
}

export const login = async (email: string, password: string) => {
    return fetchAPI('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
}

export const getOrders = async () => {
    return fetchAPI(`/orders`)
}