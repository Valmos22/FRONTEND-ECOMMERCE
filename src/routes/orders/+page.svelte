<script lang="ts">
  import { onMount } from "svelte";
  import { getOrders } from "$lib/api";
  import type { Order } from "../../utils/Order";

  let orders: Order[] = [];
  let err: string;

  onMount(async () => {
    try {
      orders = await getOrders();
    } catch (error) {
      err = error.message;
    }
  });
</script>

{#if err}
  <p class="text-red-500">{err}</p>
{:else if orders.length > 0}
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-black dark:bg-black dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3"> ID Orden </th>
          <th scope="col" class="px-6 py-3"> ID Producto </th>
          <th scope="col" class="px-6 py-3"> Category </th>
          <th scope="col" class="px-6 py-3"> Price </th>
          <th scope="col" class="px-6 py-3"> Action </th>
        </tr>
      </thead>
      {#each orders as order (order.id)}
        <tbody>
          <tr
            class="odd:bg-white odd:dark:bg-gray-700 even:bg-gray-50 even:dark:bg-gray-700 border-b dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {order.id}
            </th>
            <td class="px-6 py-4"> {order.id} </td>
            <td class="px-6 py-4"> {order.total} </td>
            <td class="px-6 py-4"> {order.status} </td>
            <td class="px-6 py-4">
              <button
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >Edit</button
              >
            </td>
          </tr>
        </tbody>
      {/each}
    </table>
  </div>
{:else}
  <p>Loading...</p>
{/if}
