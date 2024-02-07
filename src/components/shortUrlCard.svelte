<script>
  import CopyIcon from "../components/icons/copy.svelte";
  import TrashIcon from "./icons/trash.svelte";
  import GoodIcon from "./icons/good.svelte";
  import { app_store } from "../stores/appStore";
  import { APP_STATUS } from "../const";

  export let shortUrl;

  let isCopied = false;

  function CopyUrl() {
    return () => {
      navigator.clipboard.writeText("shortly.io/" + shortUrl.hash);
      isCopied = true;

      setTimeout(() => {
        isCopied = false;
      }, 2000);
    };
  }

  async function handleRemove(hash) {
    await fetch(`api/shortUrl?hash=${hash}`);

    $app_store = APP_STATUS.idle;
  }
</script>

<div class="bg-slate-800 py-5 rounded-lg max-w-xl mx-auto px-5 relative">
  <button
    on:click={() => handleRemove(shortUrl.hash)}
    class="text-red-300 bg-transparent transition-colors hover:bg-red-300/20 rounded-full p-1 absolute top-2 right-2"
  >
    <TrashIcon classname="size-5" />
  </button>

  <button
    on:click={CopyUrl()}
    class="bg-transparent transition-colors hover:bg-slate-700 rounded-full p-1 absolute top-2 right-11"
  >
    {#if isCopied}
      <span class="text-emerald-400">
        <GoodIcon classnames="size-4" />
      </span>
    {:else}
      <CopyIcon classnames="size-5" />
    {/if}
  </button>
  <p class="text-3xl px-2 border-b pb-2 border-slate-700/50">
    {shortUrl?.title || "Sin título"}
  </p>
  <div class="flex justify-between pl-2 mt-6 items-center">
    <div class="flex items-center">
      <p>shorly.io/</p>
      <span class="text-emerald-400">{shortUrl?.hash ?? "3js8DD"}</span>
    </div>
  </div>
</div>
