import { useEffect, useState } from "react";
import { fetchNotifications } from "../src/api/notifications";
import NotificationCard from "../src/components/NotificationCard";
import { Log } from "../src/utils/logger";

export default function Home() {
  const [data, setData] = useState([]);
  const [viewed, setViewed] = useState<any>({});

  useEffect(() => {
    async function load() {
      const res = await fetchNotifications({ page: 1, limit: 20 });
      setData(res);
      Log("info", "page", "Loaded all notifications");
    }
    load();
  }, []);

  function markViewed(id: string) {
    setViewed((prev: any) => ({ ...prev, [id]: true }));
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>All Notifications</h2>

      {data.map((n: any) => (
        <div key={n.ID} onClick={() => markViewed(n.ID)}>
          <NotificationCard data={n} viewed={viewed[n.ID]} />
        </div>
      ))}
    </div>
  );
}