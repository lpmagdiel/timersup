<script>
  import SimpleList from "../lib/SimpleList.svelte";
  import { tasks, locations } from "../lib/stores";

  import { Info, X } from "lucide-svelte";
  import { fly, fade } from "svelte/transition";

  // Get current month tasks
  $: currentMonthTasks = $tasks
    .filter((task) => {
      const taskDate = new Date(task.createdAt);
      const now = new Date();
      return (
        taskDate.getMonth() === now.getMonth() &&
        taskDate.getFullYear() === now.getFullYear()
      );
    })
    .map((task) => {
      // Calculate total price
      const total =
        Number(task.price) +
        (task.extraHours || 0) * (task.extraHourPrice || 10);

      // Get location name
      const loc = $locations.find((l) => l.id === task.locationId);

      // Format date for SimpleItem (YYYY-MM-DD)
      const d = new Date(task.createdAt);
      // We want month 0 for Jan.
      const monthIndex = d.getMonth(); // 0-11
      const dateStr = `${d.getFullYear()}-${monthIndex}-${d.getDate()}`;

      return {
        title: task.name,
        date: dateStr, // "2024-0-25" for Jan
        earnings: total.toFixed(2),
        location: loc ? loc.name : "Sin ubicación",
      };
    })
    .reverse(); // Newest first

  $: estimatedEarnings = currentMonthTasks
    .reduce((sum, t) => sum + Number(t.earnings), 0)
    .toFixed(2);

  let showInfo = false;
</script>

<div class="header">
  <h1>Timers<span class="tag">Up</span></h1>
  <button class="icon-btn" on:click={() => (showInfo = true)}>
    <Info size={24} color="#39ab92" />
  </button>
</div>

<div class="price-view">
  <p>Estimado este mes:</p>
  <h2>€ {estimatedEarnings}</h2>
</div>
<div class="list-last-registers">
  <h3>Ultimos registros</h3>
  <small>{currentMonthTasks.length} registros este mes</small>
  <SimpleList items={currentMonthTasks} />
</div>

{#if showInfo}
  <div
    class="modal-overlay"
    transition:fade
    on:click={() => (showInfo = false)}
  >
    <div
      class="modal-content"
      transition:fly={{ y: 50, duration: 300 }}
      on:click|stopPropagation
    >
      <div class="modal-header">
        <h3>Información</h3>
        <button class="close-btn" on:click={() => (showInfo = false)}>
          <X size={20} />
        </button>
      </div>
      <div class="modal-body">
        <p><strong>Versión:</strong> 1.0.0</p>
        <p><strong>Desarrollador:</strong> Magdiel López M.</p>
      </div>
    </div>
  </div>
{/if}

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  h1 {
    margin: 0;
  }
  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }
  .icon-btn:hover {
    background-color: rgba(57, 171, 146, 0.1);
  }

  span,
  h2 {
    color: #39ab92;
  }
  h3 {
    color: var(--text-color-secondary);
  }
  .price-view {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--box-background-color);
    padding: 16px;
    border-radius: 8px;
  }
  small {
    color: var(--icon-color);
  }
  .list-last-registers {
    margin-top: 24px;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .modal-content {
    background-color: var(--box-background-color);
    padding: 24px;
    border-radius: 16px;
    width: 90%;
    max-width: 320px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .modal-header h3 {
    margin: 0;
    color: var(--text-color);
  }
  .close-btn {
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    opacity: 0.6;
  }
  .modal-body p {
    margin: 8px 0;
    color: var(--text-color);
    font-size: 1rem;
    opacity: 0.8;
  }
</style>
