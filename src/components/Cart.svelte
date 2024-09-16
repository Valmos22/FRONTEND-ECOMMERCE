<script lang="ts">
  import { onMount } from "svelte";
  import { cart } from "../stores/cartStore";
  import { createOrder } from "$lib/api";

  let items: string | any[] = [];
  let total = 0;

  onMount(() => {
    cart.subscribe((value) => {
      items = value.items;
      total = value.total;
    });
  });

  const removeItem = (id: string) => {
    cart.removeItem(id);
  };

  const clearCart = () => {
    cart.clear();
  };

  const handleCreateOrder = async () => {
    const userId = "WCmEBCBWsulwOpGU4KhJ";

    const order = {
      userId,
      items,
      total,
      status: "Pendiente",
    };

    try {
      const orderId = await createOrder(order);
      alert(`Orden creada con éxito. ID de la orden: ${orderId}`);
      cart.clear();
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Hubo un error al crear la orden.");
    }
  };
</script>

<section class="bg-white py-8 antialiased border-solid border-2 border-black">
  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    {#if items.length > 0}
      <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
        {#each items as item (item.id)}
          <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div class="space-y-6">
              <div
                class="rounded-lg border border-gray-200 bg-black p-4 md:p-6"
              >
                <div
                  class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"
                >
                  <div class="shrink-0 md:order-1">
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img
                      class="h-20 w-20 dark:hidden"
                      src={item.image}
                      alt="imac image"
                    />
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img
                      class="hidden h-20 w-20 dark:block"
                      src={item.image}
                      alt="imac image"
                    />
                  </div>

                  <label for="counter-input" class="sr-only"
                    >Choose quantity:</label
                  >
                  <div
                    class="flex items-center justify-between md:order-3 md:justify-end"
                  >
                    <div class="flex items-center">
                      <button
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="counter-input"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                      >
                        <svg
                          class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="counter-input"
                        data-input-counter
                        class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                        placeholder=""
                        value={item.quantity}
                        required
                      />
                      <button
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="counter-input"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                      >
                        <svg
                          class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <div class="text-end md:order-4 md:w-32">
                      <p
                        class="text-base font-bold text-gray-900 dark:text-white"
                      >
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div
                    class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md"
                  >
                    <p
                      class="text-base font-medium text-gray-900 hover:underline dark:text-white"
                    >
                      {item.name}
                    </p>

                    <div class="flex items-center gap-4">
                      <button
                        on:click={() => removeItem(item.id)}
                        type="button"
                        class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                      >
                        <svg
                          class="me-1.5 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18 17.94 6M18 18 6.06 6"
                          />
                        </svg>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
        <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
          <div
            class="space-y-4 rounded-lg border border-gray-200 bg-black p-4 sm:p-6"
          >
            <p class="text-xl font-semibold text-gray-900 dark:text-white">
              Order summary
            </p>

            <div class="space-y-4">
              <dl
                class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700"
              >
                <dt class="text-base font-bold text-gray-900 dark:text-white">
                  Total
                </dt>
                <dd class="text-base font-bold text-gray-900 dark:text-white">
                  $8,191.00
                </dd>
              </dl>
            </div>

            <button
              on:click={handleCreateOrder}
              class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >Proceed to Checkout</button
            >

            <div class="flex items-center justify-center gap-2">
              <span
                class="text-sm font-normal text-gray-500 dark:text-gray-400"
              >
                or
              </span>
              <a
                href="/"
                title=""
                class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-white"
              >
                Continue Shopping
                <svg
                  class="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div>
        <p>El carrito está vacío</p>
        <a href="/">Ir a ver catalogo</a>
      </div>
    {/if}
  </div>
</section>
