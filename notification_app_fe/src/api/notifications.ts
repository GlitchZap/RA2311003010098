import axios from "axios";
import { Log } from "../utils/logger";

const API = "http://20.207.122.201/evaluation-service/notifications";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhazk5MDZAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMjk1MCwiaWF0IjoxNzc3NzAyMDUwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOWYyNWYzOTAtN2JjMC00OWQ3LTk1YTAtNWY1YjhlYjE0ZmNlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWF5dXNoIGt1bWFyIiwic3ViIjoiN2EzNDEzZWUtN2RlMS00NmIzLTg2ZGQtZjVlMDYxNDc0Yzc3In0sImVtYWlsIjoiYWs5OTA2QHNybWlzdC5lZHUuaW4iLCJuYW1lIjoiYWF5dXNoIGt1bWFyIiwicm9sbE5vIjoicmEyMzExMDAzMDEwMDk4IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiN2EzNDEzZWUtN2RlMS00NmIzLTg2ZGQtZjVlMDYxNDc0Yzc3IiwiY2xpZW50U2VjcmV0IjoiY1hoQnhOYWJCaG1ZQkRaRSJ9.JkoAjMoE8nTlgTXn24xer3IhTpRQ1hiTgnDMasSGWDQ";

export async function fetchNotifications(params: any) {
  try {
    Log("info", "api", "Fetching notifications");

    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      params,
    });

    Log("info", "api", "Notifications fetched");

    return res.data.notifications;
  } catch (err: any) {
    Log("error", "api", "API fetch failed");
    return [];
  }
}