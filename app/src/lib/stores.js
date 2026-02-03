import { readable, writable } from 'svelte/store';

export const page = readable({ url: new URL(window.location.href) }, (set) => {
	const update = () => {
		set({ url: new URL(window.location.href) });
	};

	window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);

	return () => {
		window.removeEventListener('popstate', update);
        window.removeEventListener('hashchange', update);
	};
});

const storedLocations = localStorage.getItem('locations');
export const locations = writable(storedLocations ? JSON.parse(storedLocations) : []);

locations.subscribe((value) => {
    localStorage.setItem('locations', JSON.stringify(value));
});

const storedTasks = localStorage.getItem('tasks');
export const tasks = writable(storedTasks ? JSON.parse(storedTasks) : []);

tasks.subscribe((value) => {
    localStorage.setItem('tasks', JSON.stringify(value));
});

const storedSettings = localStorage.getItem('settings');
export const settings = writable(storedSettings ? JSON.parse(storedSettings) : {
    hourlyRate: 10.0
});

settings.subscribe((value) => {
    localStorage.setItem('settings', JSON.stringify(value));
});
