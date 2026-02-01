<script>
  // @ts-nocheck

  import {
    LayoutGrid,
    Calculator,
    CalendarX,
    ClipboardList,
    MapPinned,
  } from "lucide-svelte";
  import { page } from "./stores";
  import { navigate } from "./router";

  function handleClick(e, href) {
    e.preventDefault();
    navigate(href);
  }
</script>

<nav>
  <ul>
    <a
      href="/"
      on:click={(e) => handleClick(e, "/")}
      class:active={$page.url.pathname === "/"}
    >
      <li>
        <LayoutGrid size={32} color="currentColor" />
      </li>
    </a>
    <a
      href="/tasks"
      on:click={(e) => handleClick(e, "/tasks")}
      class:active={$page.url.pathname === "/tasks"}
    >
      <li>
        <ClipboardList size={32} color="currentColor" />
      </li>
    </a>
    <a
      href="/locations"
      on:click={(e) => handleClick(e, "/locations")}
      class:active={$page.url.pathname === "/locations"}
    >
      <li>
        <MapPinned size={32} color="currentColor" />
      </li>
    </a>
    <a
      href="/calculator"
      on:click={(e) => handleClick(e, "/calculator")}
      class:active={$page.url.pathname === "/calculator"}
    >
      <li>
        <Calculator size={32} color="currentColor" />
      </li>
    </a>
    <a
      href="/calendar"
      on:click={(e) => handleClick(e, "/calendar")}
      class:active={$page.url.pathname === "/calendar"}
    >
      <li>
        <CalendarX size={32} color="currentColor" />
      </li>
    </a>
  </ul>
</nav>

<style>
  nav {
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;
    height: 90px;
    background-color: var(--box-background-color);
    border-top: 1px solid var(--icon-color);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  nav ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-top: 10px;
    height: 100%;
    list-style: none;
  }
  nav ul li {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    color: var(--icon-color);
    text-decoration: none;
    display: flex; /* alignment */
    align-items: center;
    height: 100%;
    padding-bottom: 20px;
  }
  .active {
    color: var(--primary-color);
    transform: scale(1.1);
    transition: all 0.3s ease;
  }
</style>
