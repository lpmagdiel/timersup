<script>
  // @ts-nocheck

  import { locations } from "../lib/stores";
  import { fly } from "svelte/transition";
  import {
    MapPin,
    Home,
    Briefcase,
    Coffee,
    Store,
    Plus,
    Trash2,
    Locate,
    BrickWall,
    Map,
  } from "lucide-svelte";
  import IconButton from "../lib/IconButton.svelte";

  let showForm = false;
  let newLocation = {
    name: "",
    description: "",
    icon: "map-pin",
    lat: "",
    lng: "",
  };

  const icons = [
    { id: "map-pin", component: MapPin, label: "Generico" },
    { id: "home", component: Home, label: "Casa" },
    { id: "briefcase", component: Briefcase, label: "Trabajo" },
    { id: "coffee", component: Coffee, label: "Cafeteria" },
    { id: "store", component: Store, label: "Tienda" },
    { id: "brick-wall", component: BrickWall, label: "Ladrillo" },
  ];

  function toggleForm() {
    showForm = !showForm;
    if (!showForm) {
      resetForm();
    }
  }

  function resetForm() {
    newLocation = {
      name: "",
      description: "",
      icon: "map-pin",
      lat: "",
      lng: "",
    };
  }

  function saveLocation() {
    if (!newLocation.name) return; // Basic validation
    locations.update((locs) => [...locs, { ...newLocation, id: Date.now() }]);
    toggleForm();
  }

  function deleteLocation(id) {
    if (confirm("¿Estás seguro de eliminar esta ubicación?")) {
      locations.update((locs) => locs.filter((l) => l.id !== id));
    }
  }

  function getIconComponent(iconId) {
    return icons.find((i) => i.id === iconId)?.component || MapPin;
  }

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          newLocation.lat = position.coords.latitude;
          newLocation.lng = position.coords.longitude;
        },
        (error) => {
          alert("Error obteniendo ubicación: " + error.message);
        },
      );
    } else {
      alert("Geolocalización no soportada en este navegador.");
    }
  }

  function openInMaps(lat, lng) {
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    }
  }
</script>

<h1>Ubicaciones</h1>
<div class="space-y"></div>

{#if !showForm}
  <div class="header-actions">
    <small>Ubicaciones guardadas ({$locations.length})</small>
    <IconButton onClick={toggleForm}>
      <Plus size={20} />
      Nueva
    </IconButton>
  </div>

  <div class="locations-list">
    {#each $locations as location (location.id)}
      <div class="location-card">
        <div class="icon-container">
          <svelte:component
            this={getIconComponent(location.icon)}
            size={24}
            color="var(--primary-color)"
          />
        </div>
        <div class="info">
          <h3>{location.name}</h3>
          <p>{location.description}</p>
          {#if location.lat && location.lng}
            <small class="coords"
              >{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</small
            >
          {/if}
        </div>
        {#if location.lat && location.lng}
          <button
            class="map-btn"
            on:click={() => openInMaps(location.lat, location.lng)}
            aria-label="Ver en Google Maps"
          >
            <Map size={20} />
          </button>
        {/if}
        <button
          class="delete-btn"
          on:click={() => deleteLocation(location.id)}
          aria-label="Eliminar"
        >
          <Trash2 size={20} />
        </button>
      </div>
    {:else}
      <div class="empty-state">
        <p>No tienes ubicaciones guardadas.</p>
      </div>
    {/each}
  </div>
{:else}
  <div class="form-container" in:fly={{ y: 2000, duration: 500 }}>
    <h2>Nueva Ubicación</h2>
    <div class="form-group">
      <label for="name">Nombre</label>
      <input
        type="text"
        id="name"
        bind:value={newLocation.name}
        placeholder="Ej: Oficina Central"
      />
    </div>

    <div class="form-group">
      <label for="desc">Descripción</label>
      <textarea
        id="desc"
        bind:value={newLocation.description}
        placeholder="Detalles adicionales..."
      ></textarea>
    </div>

    <div class="form-group">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label>Icono</label>
      <div class="icon-selector">
        {#each icons as icon}
          <button
            class="icon-option"
            class:selected={newLocation.icon === icon.id}
            on:click={() => (newLocation.icon = icon.id)}
            title={icon.label}
          >
            <svelte:component
              this={icon.component}
              size={24}
              color={newLocation.icon === icon.id
                ? "white"
                : "var(--icon-color)"}
            />
          </button>
        {/each}
      </div>
    </div>

    <div class="form-group">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label>Coordenadas</label>
      <div class="geo-input">
        <input
          type="number"
          step="any"
          placeholder="Latitud"
          bind:value={newLocation.lat}
        />
        <input
          type="number"
          step="any"
          placeholder="Longitud"
          bind:value={newLocation.lng}
        />
        <button
          class="geo-btn"
          on:click={getCurrentLocation}
          title="Usar ubicación actual"
        >
          <Locate size={20} />
        </button>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn-secondary" on:click={toggleForm}>Cancelar</button>
      <button class="btn-primary" on:click={saveLocation}>Guardar</button>
    </div>
  </div>
{/if}

<style>
  .space-y {
    height: 20px;
  }
  .header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .btn-primary {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-weight: 600;
  }
  .btn-secondary {
    background-color: transparent;
    color: var(--text-color);
    border: 1px solid var(--text-color);
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
  }

  /* List Styles */
  .locations-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 100px; /* Space for nav */
  }
  .location-card {
    background-color: var(--box-background-color);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  .icon-container {
    background-color: rgba(
      var(--primary-color-rgb),
      0.1
    ); /* Fallback or use a light opaque */
    padding: 10px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--primary-color);
  }
  .info {
    flex: 1;
  }
  .info h3 {
    margin: 0 0 4px 0;
    font-size: 1.1rem;
  }
  .info p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
  }
  .info .coords {
    display: block;
    margin-top: 4px;
    font-family: monospace;
    opacity: 0.6;
    font-size: 0.8rem;
  }
  .delete-btn {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
  }
  .delete-btn:hover {
    background-color: rgba(239, 68, 68, 0.1);
  }
  .map-btn {
    background: none;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
  }
  .map-btn:hover {
    background-color: rgba(var(--primary-color-rgb), 0.1);
    background-color: #ffffff10;
  }

  /* Form Styles */
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
  input[type="text"],
  input[type="number"],
  textarea {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: rgba(
      255,
      255,
      255,
      0.05
    ); /* Slight transparent for dark mode compat */
    color: inherit;
    font-size: 1rem;
  }
  textarea {
    min-height: 80px;
    resize: vertical;
  }

  .icon-selector {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .icon-option {
    background: transparent;
    border: 1px solid var(--icon-color);
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .icon-option.selected {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }

  .geo-input {
    display: flex;
    gap: 8px;
  }
  .geo-input input {
    flex: 1;
  }
  .geo-btn {
    background-color: var(--box-background-color);
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    border-radius: 8px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }
  .empty-state {
    text-align: center;
    padding: 40px;
    opacity: 0.6;
  }
</style>
