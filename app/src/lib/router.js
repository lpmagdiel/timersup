import { page } from "./stores.js";

export const navigate = (href) => {
  window.history.pushState({}, "", href);
  const event = new Event("popstate");
  window.dispatchEvent(event);
};
