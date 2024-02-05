<script>
  let query;

  async function handleSubmit(e) {
    const response = await fetch("/api/create", {
      method: "post",
      body: JSON.stringify({ longUrl: query }),
    });

    const data = await response.json();

    console.log("data", data);

    e.target.reset();
  }

  async function HandlePaste() {
    const text = await navigator.clipboard.readText();
    query = text;
  }
</script>

<button
  on:click={HandlePaste}
  class="btn-paste relative flex gap-1 text-slate-400 text-sm bg-slate-950 hover:text-white hover:font-bold rounded-full items-end justify-center mb-5 px-3 py-1"
>
  <slot name="icon" />
  <span class="font-light"> pegar url </span>
</button>

<form class="flex gap-2" on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    placeholder="https://www.laaaaaaaaargaURL.com"
    bind:value={query}
    class="bg-slate-900 w-full py-3 rounded placeholder:text-gray-600 pl-4 focus:outline focus:outline-emerald-500 focus:outline-2"
  />
  <button class="bg-green-300 px-8 rounded font-semibold text-lg"
    >Acortar!</button
  >
</form>

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
