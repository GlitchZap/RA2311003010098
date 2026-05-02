import { useEffect, useState } from "react";
import { fetchNotifications } from "../src/api/notifications";

export default function Priority() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("Placement");

  useEffect(() => {
    async function load() {
      const res = await fetchNotifications({
        page: 1,
        limit: 10,
        notification_type: type,
      });
      setData(res);
    }
    load();
  }, [type]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Priority Notifications</h2>

      <select onChange={(e) => setType(e.target.value)}>
        <option>Placement</option>
        <option>Result</option>
        <option>Event</option>
      </select>

      {data.map((n: any) => (
        <div key={n.ID}>
          <p>{n.Message}</p>
        </div>
      ))}
    </div>
  );
}