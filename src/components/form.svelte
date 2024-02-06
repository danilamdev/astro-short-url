<script lang="ts">
  import Button from "./button.svelte";
  import { getRandomString } from "../utils/getRandomString.ts";

  import type { Data, App_Status } from "../types.d.ts";
  import { APP_STATUS } from "../const.ts";

  let app_status: App_Status = APP_STATUS.idle;
  let longUrl: string;
  let hash: string;

  async function HandlePaste() {
    const text = await navigator.clipboard.readText();
    longUrl = text;
  }

  async function handleClick() {
    hash = await getRandomString();
    app_status = APP_STATUS.ready;
  }
</script>

<button
  on:click={HandlePaste}
  class="btn-paste relative flex gap-1 text-slate-400 text-sm bg-slate-950 hover:text-white hover:font-bold rounded-full items-end justify-center mb-5 px-3 py-1"
>
  <slot name="icon" />
  <span class="font-light"> pegar url </span>
</button>

<div class="flex gap-2">
  <input
    type="text"
    placeholder="https://www.laaaaaaaaargaURL.com"
    bind:value={longUrl}
    class="bg-slate-900 text-slate-200 w-full py-3 rounded placeholder:text-gray-600 pl-4 focus:outline focus:outline-emerald-500 focus:outline-2"
  />
  <Button {handleClick}>Acortar!</Button>
</div>

{#if app_status === APP_STATUS.idle}
  <p class="text-white text-4xl">completar</p>
{/if}

{#if app_status === APP_STATUS.ready}
  <article
    class="flex flex-col border border-slate-900 rounded-2xl w-3/4 mx-auto mt-10 aspect-video"
  >
    <header class="py-4 flex justify-between items-center">
      {#if longUrl}
        <p class="text-sm text-gray-500 px-4">{longUrl}</p>
      {/if}
      <p class="text-gray-200 w-fit ml-auto px-5">copy short url</p>
    </header>

    <section class=" flex-1 py-6 flex flex-col items-center gap-2">
      <div class="flex gap-3 items-center justify-center">
        <h1 class="text-slate-300 text-5xl">shortly.io/</h1>
        <input
          type="text"
          value={hash}
          class="bg-slate-900 text-blue-400 px-4 rounded w-48 text-center py-4 text-3xl"
        />
      </div>
      <small class="text-slate-400"
        >Puedes cambiar el hash por el que tu quieras</small
      >
    </section>
    <div class="py-10 flex gap-6 justify-center items-center">
      <button
        on:click={() => (app_status = APP_STATUS.idle)}
        class="bg-slate-900 px-5 py-3 rounded hover:bg-red-400/30 transition-colors"
        >cancelar</button
      >
      <button
        class="bg-transparent px-5 py-3 rounded hover:bg-emerald-500 transition-colors"
        >confirmar</button
      >
    </div>
  </article>
{/if}

<!-- <pre class="text-white">{app_status}</pre> -->

<style>
  .btn-paste::after {
    content: "";
    position: absolute;
    inset: 0px;
    scale: 0.9;
    background-image: linear-gradient(
      45deg,
      rgb(155, 74, 36) 30%,
      rgb(199, 148, 82) 60%,
      rgb(255, 160, 83)
    );
    border-radius: 9999px;
    z-index: -10;
    transition: scale 200ms ease;
  }

  .btn-paste:hover::after {
    scale: 1.05 1.2;
  }
</style>
