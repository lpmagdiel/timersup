const getStorage = () => JSON.parse( window.localStorage.getItem('timers') ) || [];

const setStorage = (timers) => window.localStorage.setItem('timers', JSON.stringify(timers));

const removeStorage = () => window.localStorage.removeItem('timers');

export const getTimer = (id) => getStorage().filter(timer => timer.id === id)[0];

export const getTimers = () => getStorage();

export const addTimer = (timer) => {
  const timers = getStorage();
  timers.push(timer);
  setStorage(timers);
};

export const removeTimer = (id) => {
  const timers = getStorage();
  const newTimers = timers.filter(timer => timer.id !== id);
  setStorage(newTimers);
};

export const updateTimer = (timer) => {
  const timers = getStorage();
  const newTimers = timers.map(t => t.id === timer.id ? timer : t);
  setStorage(newTimers);
};

export const clearStorage = () => setStorage([]);

export const getStorageLength = () => getStorage().length;