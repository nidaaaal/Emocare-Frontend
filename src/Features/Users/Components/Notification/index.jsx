export async function registerServiceWorker() {
  if ("serviceWorker" in navigator && !navigator.serviceWorker.controller) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered:", registration);
      return registration;
    } catch (err) {
      console.error("Service Worker registration failed:", err);
    }
  } else {
    return navigator.serviceWorker.ready;
  }
}
