<script lang="ts">
  import { login } from "$lib/api";
  import { writable } from "svelte/store";

  let email = "";
  let password = "";
  let error = writable<string | null>(null);
  let isDisabled = true;

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log("Token:", response.token);
      localStorage.setItem("authToken", response.token);
    } catch (err) {
      error.set(err.message);
    }
  };
</script>

<main class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
    >
      Inicia sesión en tu cuenta (PROXIMAMENTE)
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form
      on:submit|preventDefault={handleLogin}
      class="space-y-6"
      action="#"
      method="POST"
    >
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900">Email</label
        >
        <div class="mt-2">
          <input
            disabled={isDisabled}
            id="email"
            name="email"
            type="email"
            bind:value={email}
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Contraseña</label
          >
        </div>
        <div class="mt-2">
          <input
            disabled={isDisabled}
            id="password"
            name="password"
            type="password"
            bind:value={password}
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      {#if $error}
        <p class="text-red-500">{$error}</p>
      {/if}
      <div>
        <button
          disabled={isDisabled}
          type="submit"
          class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Iniciar sesion</button
        >
      </div>
    </form>
  </div>

  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <a
      href="/orders"
      title=""
      class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-black"
      >Esto es (TEMPORAL) te invito a ver las ordenes
      <svg
        class="h-5 w-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        ><path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 12H5m14 0-4 4m4-4-4-4"
        ></path></svg
      ></a
    >
  </div>
</main>
