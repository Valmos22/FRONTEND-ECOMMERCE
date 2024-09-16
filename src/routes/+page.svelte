<script lang="ts">
  import { onMount } from "svelte";
  import { getProducts } from "$lib/api";
  import type { Product } from "../utils/Produsct";

  let products: Product[] = [];
  let err: string;

  onMount(async () => {
    try {
      products = await getProducts();
    } catch (error) {
      err = error.message;
    }
  });
</script>

{#if err}
  <p class="text-red-500">{err}</p>
{:else if products.length > 0}
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>

      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
        {#each products as product (product.id)}
          <a href={`/products/${product.id}`} class="group">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={product.image}
                alt={product.name}
                class="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 class="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p class="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
          </a>
        {/each}
      </div>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}

