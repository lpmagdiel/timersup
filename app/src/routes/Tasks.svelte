<script>
  // @ts-nocheck
  import { tasks, locations } from "../lib/stores";
  import { fly } from "svelte/transition";
  import IconButton from "../lib/IconButton.svelte";
  import {
    ClipboardList,
    Plus,
    Trash2,
    CheckCircle,
    Clock,
    Repeat,
    MapPin,
  } from "lucide-svelte";
  import { dateShort } from "../helpers/dateTime";

  let showForm = false;
  let filter = "pending"; // 'pending' | 'completed'

  let newTask = {
    name: "",
    description: "",
    price: "",
    locationId: "",
    type: "once", // 'once' | 'recurrent'
    extraHours: 0,
    extraHourPrice: 10,
  };

  let activeTemplate = null;

  $: filteredTasks = $tasks.filter((t) =>
    filter === "completed" ? t.completed : !t.completed,
  );

  $: recurrentTemplates = $tasks.filter((t) => t.type === "recurrent");

  // Determine if the current form data differs from the selected template
  $: isModified = activeTemplate
    ? newTask.name !== activeTemplate.name ||
      newTask.description !== activeTemplate.description ||
      Number(newTask.price) !== Number(activeTemplate.price) ||
      newTask.locationId !== activeTemplate.locationId ||
      Number(newTask.extraHourPrice) !== Number(activeTemplate.extraHourPrice)
    : true;

  function toggleForm() {
    showForm = !showForm;
    if (!showForm) resetForm();
  }

  function resetForm() {
    activeTemplate = null;
    newTask = {
      name: "",
      description: "",
      price: "",
      locationId: "",
      type: "once",
      extraHours: 0,
      extraHourPrice: 10,
    };
  }

  function saveTask() {
    if (!newTask.name || !newTask.price) return;

    tasks.update((ts) => [
      ...ts,
      {
        ...newTask,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        completed: false,
        completedAt: null,
      },
    ]);
    toggleForm();
  }

  function deleteTask(id) {
    if (confirm("¿Eliminar tarea?")) {
      tasks.update((ts) => ts.filter((t) => t.id !== id));
    }
  }

  function completeTask(task) {
    tasks.update((ts) =>
      ts.map((t) =>
        t.id === task.id
          ? { ...t, completed: true, completedAt: new Date().toISOString() }
          : t,
      ),
    );
  }

  function addExtraHour(task) {
    tasks.update((ts) =>
      ts.map((t) =>
        t.id === task.id ? { ...t, extraHours: (t.extraHours || 0) + 1 } : t,
      ),
    );
  }

  function getLocationName(id) {
    const loc = $locations.find((l) => l.id === id);
    return loc ? loc.name : "Sin ubicación";
  }

  function loadTemplate(e) {
    const templateId = e.target.value;
    if (!templateId) {
      activeTemplate = null;
      return;
    }
    const template = $tasks.find((t) => t.id == templateId);
    if (template) {
      activeTemplate = template;
      newTask = {
        ...newTask,
        name: template.name,
        description: template.description,
        price: template.price,
        locationId: template.locationId,
        extraHourPrice: template.extraHourPrice,
        type: "once", // Default to 'once' to avoid accidental duplication
      };
    }
  }

  function formatDate(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString)
      .toLocaleDateString()
      .split("/")
      .reverse()
      .join("-");
    return dateShort(date);
  }
</script>

<h1>Tareas</h1>
<div class="header-actions">
  <small>{filteredTasks.length} Tareas</small>
  <IconButton onClick={toggleForm}>
    <Plus size={20} /> Nueva
  </IconButton>
</div>
<div class="tabs">
  <button
    class:active={filter === "pending"}
    on:click={() => (filter = "pending")}>Pendientes</button
  >
  <button
    class:active={filter === "completed"}
    on:click={() => (filter = "completed")}>Completadas</button
  >
</div>

{#if !showForm}
  <div class="tasks-list">
    {#each filteredTasks as task (task.id)}
      <div class="task-card" class:completed={task.completed}>
        <div class="task-header">
          <h3>{task.name}</h3>
          {#if task.type === "recurrent"}
            <span class="badge" title="Recurrente"><Repeat size={14} /></span>
          {/if}
          <span class="price">
            {(
              Number(task.price) +
              (task.extraHours || 0) * (task.extraHourPrice || 10)
            ).toFixed(2)} €
          </span>
        </div>

        <p class="desc">{task.description}</p>

        <div class="meta">
          <span class="location"
            ><MapPin size={14} /> {getLocationName(task.locationId)}</span
          >
          <span class="date">{formatDate(task.createdAt)}</span>
        </div>

        {#if !task.completed}
          <div class="actions">
            <div class="extra-hours">
              <small>Extras: {task.extraHours || 0}h</small>
              <button on:click={() => addExtraHour(task)}
                ><Plus size={14} /></button
              >
            </div>
            <div class="main-actions">
              <button
                class="btn-icon delete"
                on:click={() => deleteTask(task.id)}
              >
                <Trash2 size={20} />
              </button>
              <button
                class="btn-icon complete"
                on:click={() => completeTask(task)}
              >
                <CheckCircle size={24} />
              </button>
            </div>
          </div>
        {:else}
          <div class="completed-info">
            <small>Completada el {formatDate(task.completedAt)}</small>
            <button
              class="btn-icon delete"
              on:click={() => deleteTask(task.id)}
            >
              <Trash2 size={20} />
            </button>
          </div>
        {/if}
      </div>
    {:else}
      <div class="empty-state">
        <p>No hay tareas en esta vista.</p>
      </div>
    {/each}
  </div>
{:else}
  <div class="form-container" in:fly={{ y: 2000, duration: 500 }}>
    <h2>Nueva Tarea</h2>

    {#if recurrentTemplates.length > 0}
      <div class="form-group">
        <label>Usar Plantilla</label>
        <select on:change={loadTemplate}>
          <option value="">Seleccionar...</option>
          {#each recurrentTemplates as t}
            <option value={t.id}>{t.name}</option>
          {/each}
        </select>
      </div>
    {/if}

    <div class="form-group">
      <label>Nombre</label>
      <input
        type="text"
        bind:value={newTask.name}
        placeholder="Limpieza general"
      />
    </div>

    <div class="form-group">
      <label>Descripción</label>
      <input
        type="text"
        bind:value={newTask.description}
        placeholder="Detalles..."
      />
    </div>

    <div class="row">
      <div class="form-group">
        <label>Precio Base (€)</label>
        <input type="number" bind:value={newTask.price} placeholder="0.00" />
      </div>
      <div class="form-group">
        <label>Precio Hora Extra (€)</label>
        <input
          type="number"
          bind:value={newTask.extraHourPrice}
          placeholder="10.00"
        />
      </div>
    </div>

    <div class="form-group">
      <label>Ubicación</label>
      <select bind:value={newTask.locationId}>
        <option value="">Sin ubicación</option>
        {#each $locations as loc}
          <option value={loc.id}>{loc.name}</option>
        {/each}
      </select>
    </div>

    <div class="form-group radio-group">
      <label>
        <input type="radio" bind:group={newTask.type} value="once" /> Única
      </label>
      <label class:disabled={!isModified && activeTemplate}>
        <input
          type="radio"
          bind:group={newTask.type}
          value="recurrent"
          disabled={!isModified && activeTemplate ? true : false}
        /> Recurrente (Plantilla)
      </label>
    </div>

    <div class="form-actions">
      <button class="btn-secondary" on:click={toggleForm}>Cancelar</button>
      <button class="btn-primary" on:click={saveTask}>Guardar</button>
    </div>
  </div>
{/if}

<style>
  .tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--box-background-color);
  }
  .tabs button {
    background: none;
    border: none;
    padding: 10px 20px;
    color: var(--text-color);
    cursor: pointer;
    font-size: 1rem;
    opacity: 0.6;
  }
  .tabs button.active {
    opacity: 1;
    border-bottom: 2px solid var(--primary-color);
    font-weight: bold;
  }

  .header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 100px;
  }

  .task-card {
    background-color: var(--box-background-color);
    padding: 16px;
    border-radius: 12px;
    border-left: 4px solid transparent;
  }
  .task-card.completed {
    border-left-color: #22c55e;
    opacity: 0.8;
  }

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .task-header h3 {
    margin: 0;
    font-size: 1.1rem;
  }
  .price {
    font-weight: bold;
    color: var(--primary-color);
    font-size: 1.2rem;
  }

  .badge {
    background-color: var(--primary-color);
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    margin-left: 8px;
    display: flex;
    align-items: center;
  }

  .desc {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 12px;
  }

  .meta {
    display: flex;
    gap: 12px;
    font-size: 0.8rem;
    opacity: 0.6;
    margin-bottom: 12px;
  }
  .meta span {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 12px;
  }

  .extra-hours {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.05);
    padding: 4px 8px;
    border-radius: 8px;
  }
  .extra-hours button {
    background: var(--primary-color);
    border: none;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .main-actions {
    display: flex;
    gap: 12px;
  }

  .btn-icon {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }
  .btn-icon.delete {
    color: #ef4444;
  }
  .btn-icon.complete {
    color: #22c55e;
  }

  /* Form Styles Reuse mostly */
  .form-container {
    background-color: var(--box-background-color);
    padding: 20px;
    border-radius: 16px;
    padding-bottom: 100px;
  }
  .form-group {
    margin-bottom: 16px;
  }
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }
  input,
  select {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: rgba(255, 255, 255, 0.05);
    color: inherit;
    font-size: 1rem;
  }

  .row {
    display: flex;
    gap: 12px;
  }
  .row .form-group {
    flex: 1;
  }

  .radio-group {
    display: flex;
    gap: 20px;
  }
  .radio-group label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  .radio-group input {
    width: auto;
  }
  .radio-group label.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }
  .btn-primary {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
  }
  .btn-secondary {
    background: transparent;
    color: var(--text-color);
    border: 1px solid var(--text-color);
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
  }
  .empty-state {
    text-align: center;
    padding: 40px;
    opacity: 0.6;
  }
</style>
