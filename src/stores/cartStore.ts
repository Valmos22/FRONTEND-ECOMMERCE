import { writable } from 'svelte/store';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string
}

interface CartState {
    items: CartItem[];
    total: number;
}

const initialState: CartState = {
    items: [],
    total: 0,
};

const createCart = () => {
    const { subscribe, set, update } = writable(initialState);

    return {
        subscribe,
        addItem: (product: CartItem) => update(state => {
            const index = state.items.findIndex(item => item.id === product.id);
            if (index !== -1) {
                state.items[index].quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            state.total += product.price;
            return state;
        }),
        removeItem: (productId: string) => update(state => {
            const index = state.items.findIndex(item => item.id === productId);
            if (index !== -1) {
                state.total -= state.items[index].price * state.items[index].quantity;
                state.items.splice(index, 1);
            }
            return state;
        }),
        clear: () => set(initialState),
    };
}

export const cart = createCart();