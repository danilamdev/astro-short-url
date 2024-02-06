<script>
  export let handleClick;
</script>

<button
  on:click={() => handleClick()}
  class="bg-green-300 px-8 rounded font-semibold text-lg relative overflow-hidden py-2.5 text-black duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90"
>
  <slot />
</button>
