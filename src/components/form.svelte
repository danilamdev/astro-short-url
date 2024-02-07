<script lang="ts">
  import Button from "./button.svelte";
  import { getRandomString } from "../utils/getRandomString.ts";
  import AppStatus from "./appStatus.svelte";

  import type { App_Status, LongURL } from "../types.d.ts";
  import { APP_STATUS } from "../const.ts";

  let app_status: App_Status = APP_STATUS.idle;

  let data: LongURL = {
    longUrl: "",
    hash: "",
    title: "",
  };

  let error: boolean;

  async function HandlePaste() {
    const text = await navigator.clipboard.readText();
    data.longUrl = text;
  }

  async function handleClick() {
    if (data.longUrl == undefined || data.longUrl == "") {
      error = true;
      return;
    }

    error = false;
    data.hash = await getRandomString();
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
    bind:value={data.longUrl}
    class="bg-slate-900 text-slate-200 w-full py-3 rounded placeholder:text-gray-600 pl-4 focus:outline focus:outline-emerald-500 focus:outline-2"
  />
  <Button {handleClick}>Acortar!</Button>
</div>
<div class="h-20 border border-transparent">
  {#if error}
    <p
      class="text-red-300 border-red-300 w-fit px-1 rounded mt-2 py-1 text-xs font-light"
    >
      Error. No es una url válida. Intenta nuevamente
    </p>
  {/if}
</div>

<AppStatus {data} {app_status} />

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
