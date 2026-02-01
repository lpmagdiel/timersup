<script>
  import Layout from "./routes/Layout.svelte";
  import Home from "./routes/Home.svelte";
  import Tasks from "./routes/Tasks.svelte";
  import Calculator from "./routes/Calculator.svelte";
  import Calendar from "./routes/Calendar.svelte";
  import Locations from "./routes/Locations.svelte";
  import { page } from "./lib/stores";

  // Mapeo simple de rutas
  const routes = {
    "/": Home,
    "/tasks": Tasks,
    "/calculator": Calculator,
    "/calendar": Calendar,
    "/locations": Locations,
  };

  $: component = routes[$page.url.pathname] || Home;
</script>

<Layout>
  <svelte:component this={component} />
</Layout>

<style>
</style>
