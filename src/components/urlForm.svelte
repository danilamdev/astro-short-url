<script lang="ts">
  import { onMount } from "svelte";
  import { signOut } from "auth-astro/client.ts";
  import type { LongURL } from "../types";
  import { APP_STATUS, URLPattern } from "../const.ts";
  import { app_store } from "../stores/appStore.ts";

  import Button from "./button.svelte";
  import AppStatus from "./appStatus.svelte";
  import ErrorUrl from "./errorUrl.svelte";
  import { getRandomString } from "../utils/getRandomString.ts";

  export let session: {
    user: { image: string; name: string; email: string };
  } | null;

  let data: LongURL = {
    longUrl: "",
    hash: "",
    title: "",
  };

  let errorValidUrl: boolean;

  async function HandlePaste() {
    data.longUrl = "";
    const text = await navigator.clipboard.readText();
    data.longUrl = text;
  }

  async function handleClick() {
    const isValidUrl = URLPattern.test(data.longUrl);

    if (data.longUrl == undefined || data.longUrl == "" || !isValidUrl) {
      errorValidUrl = true;
      return;
    }

    errorValidUrl = false;
    data.hash = await getRandomString();
    $app_store = APP_STATUS.ready;

    console.log("store", $app_store);
  }

  onMount(() => {
    document
      .getElementById("sign-out")
      ?.addEventListener("click", () => signOut());
  });
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
<ErrorUrl {errorValidUrl} />

{#if session}
  <div class="flex justify-between items-center">
    <div>
      <p>Bienvenido {session?.user?.name}</p>
      <small class="text-gray-500">{session?.user?.email}</small>
    </div>
    <div class="flex flex-col items-end gap-y-2">
      <img
        src={session?.user?.image}
        alt="imagen del usuario"
        class="max-w-full object-cover size-9 rounded-full mr-2"
      />
      <div
        class="text-sm text-slate-500 bg-transparent hover:bg-slate-900 px-2 py-1 rounded transition-colors"
      >
        <button id="sign-out" class="text-gray-500 hover:text-red-300/70"
          >cerrar sesión</button
        >
      </div>
    </div>
  </div>
{/if}

<AppStatus {data}>
  <slot name="stop" />
</AppStatus>

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
