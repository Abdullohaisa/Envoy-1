let isNavigating = false;

export const safeNavigate = (callback: () => void, delay = 1000) => {
  if (isNavigating) return;
  isNavigating = true;
  callback();
  setTimeout(() => {
    isNavigating = false;
  }, delay);
};
