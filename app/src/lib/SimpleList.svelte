<script>
  import Item from "./SimpleItem.svelte";
  let { items } = $props();
</script>

<ul>
  {#each items as item}
    <Item
      title={item.title}
      date={item.date}
      earnings={item.earnings}
      location={item.location}
    />
  {/each}
</ul>
