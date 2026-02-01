<script>
  import { tasks } from "../lib/stores";
  import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    DollarSign,
    ListChecks,
    Clock,
  } from "lucide-svelte";

  let currentDate = new Date();
  let selectedStart = null;
  let selectedEnd = null;

  // Helpers
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun
    // Adjust for Monday start if preferred, lets stick to Sun=0 for now or Mon?
    // Let's use standard Mon=0 in UI but JS uses Sun=0.
    // Let's align to Monday start for display: Mon=0 .. Sun=6
    let startDay = firstDay === 0 ? 6 : firstDay - 1;

    const days = [];
    // Padding
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    // Days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  function changeMonth(delta) {
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + delta,
      1,
    );
  }

  function isSameDay(d1, d2) {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  function handleDateClick(date) {
    if (!date) return;

    if (!selectedStart || (selectedStart && selectedEnd)) {
      selectedStart = date;
      selectedEnd = null;
    } else {
      // We have a start, no end
      if (date < selectedStart) {
        selectedStart = date; // Reset start if clicked before
      } else {
        selectedEnd = date;
      }
    }
  }

  function isInRange(date) {
    if (!date || !selectedStart || !selectedEnd) return false;
    return date > selectedStart && date < selectedEnd;
  }

  // --- Statistics ---
  // Ensure we compare purely on dates (ignore time) using ISO strings YYYY-MM-DD
  $: startStr = selectedStart
    ? selectedStart.toISOString().split("T")[0]
    : null;
  $: endStr = selectedEnd
    ? selectedEnd.toISOString().split("T")[0]
    : selectedStart // If only start selected, default to single day execution
      ? selectedStart.toISOString().split("T")[0]
      : null;

  $: filteredTasks = $tasks.filter((t) => {
    if (!t.completed || !t.completedAt) return false;
    if (!startStr) return false; // meaningful default: show nothing or month? Plan said selected range.
    const d = t.completedAt.split("T")[0];
    return d >= startStr && d <= endStr;
  });

  $: totalEarnings = filteredTasks
    .reduce((sum, t) => {
      const base = Number(t.price);
      const extra = (t.extraHours || 0) * (t.extraHourPrice || 10);
      return sum + base + extra;
    }, 0)
    .toFixed(2);

  $: totalTasks = filteredTasks.length;
  $: totalExtraHours = filteredTasks.reduce(
    (sum, t) => sum + (t.extraHours || 0),
    0,
  );

  const weekHeaders = ["L", "M", "M", "J", "V", "S", "D"];
</script>

<h1>Estadísticas</h1>
<div class="space"></div>

<div class="calendar-container">
  <div class="month-nav">
    <button class="nav-btn" on:click={() => changeMonth(-1)}
      ><ChevronLeft size={20} /></button
    >
    <span class="month-label">
      {currentDate.toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric",
      })}
    </span>
    <button class="nav-btn" on:click={() => changeMonth(1)}
      ><ChevronRight size={20} /></button
    >
  </div>

  <div class="calendar-grid">
    <div class="week-headers">
      {#each weekHeaders as day}
        <div class="weekday">{day}</div>
      {/each}
    </div>
    <div class="days-grid">
      {#each getDaysInMonth(currentDate) as day}
        <button
          class="day-cell"
          class:empty={!day}
          class:selected={isSameDay(day, selectedStart) ||
            isSameDay(day, selectedEnd)}
          class:in-range={isInRange(day)}
          class:today={isSameDay(day, new Date())}
          disabled={!day}
          on:click={() => handleDateClick(day)}
        >
          {day ? day.getDate() : ""}
        </button>
      {/each}
    </div>
  </div>
</div>

<div class="stats-container">
  <!-- Earnings -->
  <div class="stat-card">
    <div class="icon-box green"><DollarSign size={20} /></div>
    <div class="stat-info">
      <span class="label">Ganancias</span>
      <span class="value">{totalEarnings}€</span>
    </div>
  </div>

  <!-- Tasks -->
  <div class="stat-card">
    <div class="icon-box blue"><ListChecks size={20} /></div>
    <div class="stat-info">
      <span class="label">Tareas</span>
      <span class="value">{totalTasks}</span>
    </div>
  </div>

  <!-- Hours -->
  <div class="stat-card">
    <div class="icon-box orange"><Clock size={20} /></div>
    <div class="stat-info">
      <span class="label">Horas Extra</span>
      <span class="value">{totalExtraHours}</span>
    </div>
  </div>
</div>

<style>
  .header {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .header h2 {
    font-size: 1.2rem;
    margin: 0;
  }

  .calendar-container {
    background-color: var(--box-background-color);
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 20px;
  }

  .month-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .month-label {
    font-weight: bold;
    text-transform: capitalize;
    font-size: 1.1rem;
  }
  .nav-btn {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .calendar-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .week-headers {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-bottom: 8px;
  }
  .weekday {
    font-size: 0.8rem;
    opacity: 0.6;
    font-weight: bold;
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    row-gap: 8px;
  }
  .day-cell {
    aspect-ratio: 1;
    background: none;
    border: none;
    color: var(--text-color);
    font-size: 0.9rem;
    cursor: pointer;
    border-radius: 8px; /* Square with slight radius usually implies range better than circle? Or circle? Let's do circle for selection */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
  .day-cell.empty {
    cursor: default;
  }
  .day-cell.today {
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    font-weight: bold;
  }
  .day-cell.selected {
    background-color: var(--primary-color);
    color: white;
    opacity: 1;
  }
  .day-cell.in-range {
    background-color: rgba(57, 171, 146, 0.15); /* Primary color low opacity */
    border-radius: 0;
  }

  /* Round the ends of the range visual improvement could be added if cells were connected */

  .stats-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .stat-card {
    background-color: var(--box-background-color);
    padding: 16px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .icon-box {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-box.green {
    background-color: rgba(34, 197, 94, 0.2);
    color: #22c55e;
  }
  .icon-box.blue {
    background-color: rgba(59, 130, 246, 0.2);
    color: #3b82f6;
  }
  .icon-box.orange {
    background-color: rgba(249, 115, 22, 0.2);
    color: #f97316;
  }

  .stat-info {
    display: flex;
    flex-direction: column;
  }
  .stat-info .label {
    font-size: 0.8rem;
    opacity: 0.7;
  }
  .stat-info .value {
    font-size: 1.2rem;
    font-weight: bold;
  }
</style>
