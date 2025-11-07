import { useEffect, useState } from "react";
import { registerServiceWorker } from "./index";
import { subscribeUser, unsubscribeUser } from "./SubscribeUsers";

export default function NotificationToggle() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((sub) => {
          if (sub) {
            setIsSubscribed(true);
            setSubscription(sub);
          }
        });
      });
    }
  }, []);

  const handleSubscribe = async () => {
    await registerServiceWorker();
    const payload = await subscribeUser();
    if (payload) {
      setIsSubscribed(true);
    }
  };

  const handleUnsubscribe = async () => {
    await unsubscribeUser(subscription);
    setIsSubscribed(false);
    setSubscription(null);
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-xl shadow-md flex items-center gap-4">
      <p className="font-medium text-gray-800">
        {isSubscribed
          ? "You are subscribed to habit reminders"
          : "Subscribe to habit reminders"}
      </p>
      {isSubscribed ? (
        <button
          onClick={handleUnsubscribe}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Unsubscribe
        </button>
      ) : (
        <button
          onClick={handleSubscribe}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Subscribe
        </button>
      )}
    </div>
  );
}
