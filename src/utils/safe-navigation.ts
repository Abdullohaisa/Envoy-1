// let isNavigating = false;

// export const safeNavigate = (callback: () => void, delay = 200) => {
//   if (isNavigating) return;
//   isNavigating = true;
//   callback();
//   setTimeout(() => {
//     isNavigating = false;
//   }, delay);
// };

let isNavigating = false;

export const safeNavigate = (callback: () => void, delay = 150) => {
  if (isNavigating) return;
  isNavigating = true;
  callback();
  setTimeout(() => {
    isNavigating = false;
  }, delay);
};
