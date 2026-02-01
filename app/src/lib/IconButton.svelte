<script>
  let { children, onClick } = $props();
</script>

<button class="icon-btn" onclick={onClick}>
  {@render children()}
</button>

<style>
  .icon-btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-weight: 600;
  }
</style>
