<script>
  import { tasks } from "../lib/stores";
  import SimpleItem from "../lib/SimpleItem.svelte";
  import {
    Share2,
    Plus,
    Delete,
    ChevronLeft,
    Calendar as CalendarIcon,
    Clock,
    DollarSign,
  } from "lucide-svelte";

  let mode = "manual"; // 'manual' | 'calendar'
  let hourlyRate = 10.0;

  // Saved Calculations
  let savedCalculations = [];

  // Manual Mode State
  let inputString = "0";
  let accumulatedHours = 0;

  // Calendar Mode State
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  let startDate = firstDay.toISOString().split("T")[0];
  let endDate = today.toISOString().split("T")[0];

  $: currentInputHours = (() => {
    if (mode !== "manual") return 0;
    const parts = inputString.split(":");
    const h = parseFloat(parts[0]) || 0;
    const m = parts.length > 1 ? parseFloat(parts[1]) || 0 : 0;
    return h + m / 60;
  })();

  $: totalEffectiveHours = accumulatedHours + currentInputHours;

  // Derived for Manual
  $: manualPay = (totalEffectiveHours * hourlyRate).toFixed(2);

  // Derived for Calendar
  $: filteredTasks = $tasks.filter((t) => {
    if (!t.completed || !t.completedAt) return false;
    const d = t.completedAt.split("T")[0];
    return d >= startDate && d <= endDate;
  });

  $: calendarEarnings = filteredTasks
    .reduce((sum, t) => {
      const base = Number(t.price);
      const extra = (t.extraHours || 0) * (t.extraHourPrice || 10);
      return sum + base + extra;
    }, 0)
    .toFixed(2);

  $: totalCalendarHours = "N/A"; // Or calculate if we tracked hours per task, but tasks have price, not time.

  // Helper to format decimal hours back to HH:MM (approximate for display)
  function formatDecimalHours(decimalHours) {
    const h = Math.floor(decimalHours);
    const m = Math.round((decimalHours - h) * 60);
    return `${h}:${m.toString().padStart(2, "0")}`;
  }

  // Universal Display Values
  $: displayTime =
    mode === "manual"
      ? accumulatedHours > 0
        ? formatDecimalHours(totalEffectiveHours)
        : inputString
      : filteredTasks.length;

  $: displayLabel = mode === "manual" ? "Tiempo Total" : "Tareas Comp.";
  $: displayUnit = mode === "manual" ? "hrs" : "";
  $: displayPay = mode === "manual" ? manualPay : calendarEarnings;

  function handleKeypad(key) {
    if (key === "backspace") {
      if (inputString.length > 1) {
        inputString = inputString.slice(0, -1);
      } else {
        inputString = "0";
        // Verify: If input is cleared and we have accumulated hours, clear everything?
        // Or require a second backspace? Let's do: If "0" and backspace pressed, clear accumulator
        if (inputString === "0" && accumulatedHours > 0) {
          accumulatedHours = 0;
          // Optional: simple toast or visual cue?
        }
      }
    } else if (key === ":") {
      if (!inputString.includes(":")) {
        inputString += ":";
      }
    } else {
      const numStr = key.toString();

      // If we are just starting or current is "0" (and not typing :)
      if (inputString === "0") {
        inputString = numStr;
        return;
      }

      // Check if we are in the "minutes" part
      if (inputString.includes(":")) {
        const parts = inputString.split(":");
        const currentMinutes = parts[1];

        // Prevent more than 2 digits for minutes
        if (currentMinutes.length >= 2) return;

        // Validation: Check if the new minute value would be invalid >= 60
        const newMinutesStr = currentMinutes + numStr;
        const newMinutesVal = parseInt(newMinutesStr, 10);

        if (newMinutesVal >= 60) return; // Invalid time, ignore input logic
      }

      inputString += numStr;
    }
  }

  function addToTotal() {
    if (currentInputHours > 0) {
      accumulatedHours += currentInputHours;
      inputString = "0";
    }
  }

  async function shareCalculation() {
    const text =
      mode === "manual"
        ? `¡He completado ${displayTime} horas! Pago estimado: $${manualPay}`
        : `Resumen de tareas: ${filteredTasks.length} completadas. Ganancias: ${calendarEarnings}€`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "TimersUp Cálculo",
          text: text,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback
      alert(text);
    }
  }
</script>

<h1>Calculadora</h1>
<div class="space"></div>

<div class="tabs">
  <button class:active={mode === "manual"} on:click={() => (mode = "manual")}
    >Manual</button
  >
  <button
    class:active={mode === "calendar"}
    on:click={() => (mode = "calendar")}>Calendario</button
  >
</div>

<div class="content">
  {#if mode === "manual"}
    <div class="rate-input-container">
      <label>Tarifa por Hora (€)</label>
      <div class="rate-input-wrapper">
        <DollarSign size={20} class="currency-icon" />
        <input type="number" bind:value={hourlyRate} step="0.5" />
      </div>
    </div>
  {/if}

  <div class="cards-row">
    <div class="card time-card">
      <div class="card-icon"><Clock size={20} color="#3b82f6" /></div>
      <span class="label">{displayLabel}</span>
      <div class="value">{displayTime} <small>{displayUnit}</small></div>
    </div>
    <div class="card pay-card">
      <div class="card-icon"><DollarSign size={20} color="#39ab92" /></div>
      <span class="label">Pago Est.</span>
      <div class="value primary-text">${displayPay}</div>
      <div class="bg-icon"><DollarSign size={60} /></div>
    </div>
  </div>

  {#if mode === "manual"}
    <div class="keypad">
      {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as num}
        <button class="key" on:click={() => handleKeypad(num)}>{num}</button>
      {/each}
      <button class="key" on:click={() => handleKeypad(":")}>:</button>
      <button class="key" on:click={() => handleKeypad(0)}>0</button>
      <button class="key action-key" on:click={() => handleKeypad("backspace")}>
        <Delete size={24} />
      </button>
    </div>
  {:else}
    <div class="calendar-view">
      <div class="date-range">
        <div class="date-input">
          <label>Desde</label>
          <input type="date" bind:value={startDate} />
        </div>
        <div class="date-input">
          <label>Hasta</label>
          <input type="date" bind:value={endDate} />
        </div>
      </div>

      <div class="tasks-summary-list">
        <small>Tareas incluidas ({filteredTasks.length})</small>
        <ul>
          {#each filteredTasks as t}
            <li>
              <span>{t.name}</span>
              <span
                >+{(
                  Number(t.price) +
                  (t.extraHours || 0) * (t.extraHourPrice || 10)
                ).toFixed(2)}€</span
              >
            </li>
          {:else}
            <li class="empty">No hay tareas completadas en este rango</li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}

  {#if savedCalculations.length > 0}
    <div class="saved-list">
      <h3>Guardados Recentemente</h3>
      <ul>
        {#each savedCalculations as item (item.id)}
          <SimpleItem
            title={item.title}
            date={item.date}
            earnings={item.earnings}
            location={item.location}
          />
        {/each}
      </ul>
    </div>
  {/if}
</div>
<div class="space"></div>
<div class="bottom-bar">
  <button class="circle-btn" on:click={addToTotal}><Plus size={24} /></button>
  <button class="save-btn" on:click={shareCalculation}>
    <Share2 size={20} />
    Compartir Cálculo
  </button>
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .header h2 {
    font-size: 1.2rem;
    margin: 0;
  }
  .icon-btn-ghost {
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    padding: 0;
  }

  .tabs {
    background-color: var(--box-background-color);
    border-radius: 12px;
    padding: 4px;
    display: flex;
    margin-bottom: 24px;
  }
  .tabs button {
    flex: 1;
    background: none;
    border: none;
    padding: 10px;
    color: var(--text-color);
    opacity: 0.6;
    cursor: pointer;
    border-radius: 8px;
    font-weight: 500;
  }
  .tabs button.active {
    background-color: rgba(255, 255, 255, 0.1); /* Subtle highlight */
    opacity: 1;
    color: var(--primary-color);
  }

  .rate-input-container {
    margin-bottom: 24px;
  }
  .rate-input-container label {
    display: block;
    margin-bottom: 8px;
    opacity: 0.8;
  }
  .rate-input-wrapper {
    background-color: var(--box-background-color);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .rate-input-wrapper input {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    width: 100%;
    outline: none;
  }
  .currency-icon {
    color: var(--icon-color);
    opacity: 0.5;
  }

  .cards-row {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
  }
  .card {
    flex: 1;
    background-color: var(--box-background-color);
    border-radius: 16px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 120px;
  }
  .card-icon {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .label {
    font-size: 0.9rem;
    opacity: 0.7;
    margin-bottom: 4px;
  }
  .value {
    font-size: 2rem;
    font-weight: bold;
    z-index: 1;
  }
  .value small {
    font-size: 1rem;
    font-weight: normal;
    opacity: 0.6;
  }
  .primary-text {
    color: var(--primary-color);
  }
  .pay-card .bg-icon {
    position: absolute;
    right: -10px;
    bottom: -10px;
    opacity: 0.05;
    transform: rotate(-15deg);
    color: var(--primary-color);
  }
  .time-card {
    border: 1px solid rgba(59, 130, 246, 0.3); /* Blue hint matching icon */
  }

  .keypad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 80px;
  }
  .key {
    background-color: var(--box-background-color);
    border: none;
    border-radius: 12px;
    padding: 20px;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
    transition: background 0.2s;
  }
  .key:active {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .action-key {
    background-color: rgba(57, 171, 146, 0.2);
    color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .calendar-view {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 100px;
  }
  .date-range {
    display: flex;
    gap: 16px;
  }
  .date-input {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .date-input input {
    background-color: var(--box-background-color);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    padding: 12px;
    border-radius: 12px;
    font-size: 1rem;
    width: 100%;
  }

  .tasks-summary-list {
    background-color: var(--box-background-color);
    border-radius: 16px;
    padding: 16px;
    flex: 1;
    max-height: 250px;
    overflow-y: auto;
  }
  .tasks-summary-list ul {
    list-style: none;
    padding: 0;
    margin-top: 10px;
  }
  .tasks-summary-list li {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.9rem;
  }
  .tasks-summary-list li.empty {
    color: rgba(255, 255, 255, 0.4);
    justify-content: center;
    font-style: italic;
  }

  .saved-list {
    margin-top: 32px;
    padding-bottom: 120px; /* Space for bottom bar */
  }
  .saved-list h3 {
    font-size: 1rem;
    margin-bottom: 12px;
    opacity: 0.8;
  }
  .saved-list ul {
    list-style: none;
    padding: 0;
  }

  .bottom-bar {
    position: fixed;
    bottom: 100px;
    left: 0;
    width: 100%;
    padding: 0 20px;
    display: flex;
    gap: 16px;
    align-items: center;
    z-index: 50;
  }
  .circle-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--box-background-color);
    border: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .save-btn {
    flex: 1;
    height: 50px;
    border-radius: 25px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
  }
</style>
