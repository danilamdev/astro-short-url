<script lang="ts">
  import { APP_STATUS } from "../const";
  import type { LongURL, App_Status } from "../types";

  export let data: LongURL;
  export let app_status: App_Status;

  async function handleSubmit() {
    await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
</script>

{#if app_status === APP_STATUS.idle}
  <p class="text-white text-4xl">completar</p>
{/if}

{#if app_status === APP_STATUS.ready}
  <article
    class="flex flex-col border border-slate-900 rounded-2xl w-full max-w-[650px] m-auto mt-10 aspect-video"
  >
    <header class="py-4 flex justify-between items-center">
      {#if data.longUrl}
        <p class="text-sm text-gray-500 px-4 max-w-96 truncate">
          {data.longUrl}
        </p>
      {/if}
      <p class="text-gray-200 w-fit ml-auto px-5 font-light">copy short url</p>
    </header>

    <section class=" flex-1 py-6 flex flex-col items-center gap-2">
      <label class="mb-4 space-x-2 text-gray-400">
        <span>Título</span>
        <input
          type="text"
          class="text-gray-100 bg-transparent border border-slate-900 rounded py-2 px-2 placeholder:text-slate-600"
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
      <small class="text-slate-500"
        >Puedes cambiar el <span class="font-semibold underline text-blue-400"
          >hash</span
        > por el que tu quieras</small
      >
    </section>
    <div class="py-10 flex gap-6 justify-center items-center">
      <button
        on:click={() => (app_status = APP_STATUS.idle)}
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
{/if}
