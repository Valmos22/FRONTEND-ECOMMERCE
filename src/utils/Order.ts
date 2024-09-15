import type { Product } from "./Produsct";

export interface Order {
    id: string;
    userId: string;
    products: Product;
    totalPrice: number;
    total: number;
    status: string;
}