<script>
  import Nav from "../lib/nav.svelte";
</script>

<main class="font-regular">
  <slot />
</main>
<Nav />

<style>
  main {
    padding: 8px;
    box-sizing: border-box;
  }
</style>
