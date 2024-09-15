import type { PageLoad } from './$types';
import { fetchAPI } from '$lib/api';

export const load: PageLoad = async ({ params }) => {
    const product = await fetchAPI(`/products/${params.id}`);
    return { product };
}