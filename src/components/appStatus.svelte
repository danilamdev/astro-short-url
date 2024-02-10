<script lang="ts">
  import { APP_STATUS } from "../const";
  import type { LongURL, API_RESPONSE } from "../types";
  import { app_store } from "../stores/appStore.ts";
  import ShortUrlCard from "./shortUrlCard.svelte";
  import Atom from "../components/icons/atom.svelte";

  export let data: LongURL;

  let appError: string;
  let shortUrl: Omit<LongURL, "longUrl">;

  async function handleSubmit() {
    const res = await fetch("/api/shortUrl", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const response: API_RESPONSE = await res.json();

    if (response.status === "error") {
      $app_store = APP_STATUS.error;
      appError = response.message;
      return;
    }

    const { status, ...apiResponse } = response;

    $app_store = APP_STATUS.submitted;
    shortUrl = { ...apiResponse };
  }
</script>

{#if $app_store === APP_STATUS.idle}
  <div class="spinning text-slate-700">
    <Atom classname="mx-auto size-96" />
  </div>
{/if}

{#if $app_store === APP_STATUS.ready}
  <section class="pb-32">
    <article
      class="flex flex-col border border-slate-900 rounded-2xl w-full max-w-[650px] m-auto mt-10 aspect-video"
    >
      <header class="py-4 flex justify-between items-center">
        {#if data.longUrl}
          <p class="text-sm text-gray-500 px-4 max-w-96 truncate">
            {data.longUrl}
          </p>
        {/if}
        <p class="text-gray-200 w-fit ml-auto px-5 font-light">
          copy short url
        </p>
      </header>

      <section class=" flex-1 py-6 flex flex-col items-center gap-2">
        <label class="mb-4 flex items-center gap-4 text-gray-400 w-3/4">
          <span>Título</span>
          <input
            type="text"
            class="w-full text-gray-100 bg-transparent border border-slate-900 rounded py-2 px-2 placeholder:text-slate-600"
            placeholder="Mi url corta..."
            bind:value={data.title}
          />
        </label>

        <div class="flex gap-3 items-center justify-center">
          <h1 class="text-slate-300 text-5xl">shortly.io/</h1>
          <input
            type="text"
            bind:value={data.hash}
            class="bg-slate-900 text-blue-400 px-4 rounded w-48 text-center py-4 text-3xl"
          />
        </div>
        <span class="text-slate-500 text-sm mt-2"
          >Puedes cambiar el <span class="font-semibold underline text-blue-400"
            >hash</span
          > por el que tu quieras</span
        >
      </section>
      <div class="py-10 flex gap-6 justify-center items-center">
        <button
          on:click={() => ($app_store = APP_STATUS.idle)}
          class="bg-slate-900 text-slate-300 px-5 py-3 rounded hover:bg-red-400/30 transition-colors"
          >cancelar</button
        >
        <button
          on:click={handleSubmit}
          class="bg-slate-900 text-emerald-300 px-5 py-3 rounded hover:bg-emerald-500 hover:text-white transition-colors"
          >guardar</button
        >
      </div>
    </article>
  </section>
{/if}

{#if $app_store === APP_STATUS.submitted}
  <ShortUrlCard {shortUrl} />
{/if}

{#if $app_store === APP_STATUS.error}
  <div class="w-ful h-56 flex flex-col items-center gap-y-5">
    <slot />
    <p class="text-red-300 text-xl">
      Error: {appError}
    </p>
  </div>
{/if}

<style>
  @keyframes spinning {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 360deg;
    }
  }

  .spinning {
    animation: spinning 150s linear infinite;
  }
</style>
