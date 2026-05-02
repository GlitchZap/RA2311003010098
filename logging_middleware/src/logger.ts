import axios from "axios";

export type Stack = "backend" | "frontend";

export type Level = "debug" | "info" | "warn" | "error" | "fatal";

export type Package =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils"
  | "cache"
  | "controller"
  | "cron_job"
  | "dh"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service";

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

const TOKEN =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhazk5MDZAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzY5OTI1MSwiaWF0IjoxNzc3Njk4MzUxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZjVmNTJhYTMtZTBkZi00MTcyLWEwNTctZGI0OTc4MjFjZjJkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWF5dXNoIGt1bWFyIiwic3ViIjoiN2EzNDEzZWUtN2RlMS00NmIzLTg2ZGQtZjVlMDYxNDc0Yzc3In0sImVtYWlsIjoiYWs5OTA2QHNybWlzdC5lZHUuaW4iLCJuYW1lIjoiYWF5dXNoIGt1bWFyIiwicm9sbE5vIjoicmEyMzExMDAzMDEwMDk4IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiN2EzNDEzZWUtN2RlMS00NmIzLTg2ZGQtZjVlMDYxNDc0Yzc3IiwiY2xpZW50U2VjcmV0IjoiY1hoQnhOYWJCaG1ZQkRaRSJ9.y54BLgGV1w6swTCttNT5nZ8VcyfcQnvUtKhszDE5AhA";

export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
) {
  try {
    await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
  } catch (err: any) {
    console.error("Logging failed:", err.message);
  }
}