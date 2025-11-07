import api from "../../../../Api/baseurl";

const VAPID_PUBLIC_KEY = "BAouj9ya5PeKOwucaopL-phe6uPGhR4x8hWTzjm9GAb-8WC1KVwvXZZwGJSeYVNVQYMtanY9ASdl5CXa7by4EGM";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export async function subscribeUser() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    alert("You must allow notifications to subscribe.");
    return;
  }

  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });
  console.log(subscription);
  

  // Flatten subscription object to match backend requirements
  const payload = {
    endpoint: subscription.endpoint,
    p256dh: subscription.toJSON().keys.p256dh,
    auth: subscription.toJSON().keys.auth,
  };

  await api.post("/Notification/subscribe", payload, { withCredentials: true });

  console.log("Subscribed:", payload);
  return payload;
}

export async function unsubscribeUser(subscription) {
  if (subscription) {
    await subscription.unsubscribe();
    console.log("Unsubscribed from push notifications");
  }
}
