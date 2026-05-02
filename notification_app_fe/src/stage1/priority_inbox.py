import requests
from datetime import datetime

LOG_API = "http://20.207.122.201/evaluation-service/logs"
NOTIF_API = "http://20.207.122.201/evaluation-service/notifications"

TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhazk5MDZAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMjk1MCwiaWF0IjoxNzc3NzAyMDUwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOWYyNWYzOTAtN2JjMC00OWQ3LTk1YTAtNWY1YjhlYjE0ZmNlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWF5dXNoIGt1bWFyIiwic3ViIjoiN2EzNDEzZWUtN2RlMS00NmIzLTg2ZGQtZjVlMDYxNDc0Yzc3In0sImVtYWlsIjoiYWs5OTA2QHNybWlzdC5lZHUuaW4iLCJuYW1lIjoiYWF5dXNoIGt1bWFyIiwicm9sbE5vIjoicmEyMzExMDAzMDEwMDk4IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiN2EzNDEzZWUtN2RlMS00NmIzLTg2ZGQtZjVlMDYxNDc0Yzc3IiwiY2xpZW50U2VjcmV0IjoiY1hoQnhOYWJCaG1ZQkRaRSJ9.JkoAjMoE8nTlgTXn24xer3IhTpRQ1hiTgnDMasSGWDQ"


def Log(stack, level, package, message):
    try:
        requests.post(
            LOG_API,
            json={
                "stack": stack,
                "level": level,
                "package": package,
                "message": message
            },
            headers={
                "Authorization": f"Bearer {TOKEN}"
            }
        )
    except:
        pass


def fetch_notifications():
    Log("frontend", "info", "api", "Fetching notifications from API")

    try:
        response = requests.get(
            NOTIF_API,
            headers={"Authorization": f"Bearer {TOKEN}"}
        )

        data = response.json()

        Log("frontend", "info", "api", "Notifications fetched successfully")

        return data["notifications"]

    except Exception as e:
        Log("frontend", "error", "api", "Error while fetching notifications")
        return []


def get_priority_score(notification):

    if notification["Type"] == "Placement":
        weight = 3
    elif notification["Type"] == "Result":
        weight = 2
    else:
        weight = 1

    time_value = datetime.strptime(
        notification["Timestamp"], "%Y-%m-%d %H:%M:%S"
    ).timestamp()

    score = weight * 10000000000000 + time_value

    return score


def get_top_notifications():
    notifications = fetch_notifications()

    Log("frontend", "info", "utils", "Calculating priority scores")
    sorted_notifications = sorted(
        notifications,
        key=get_priority_score,
        reverse=True
    )

    top_10 = sorted_notifications[:10]

    Log("frontend", "info", "utils", "Top 10 notifications selected")

    return top_10


if __name__ == "__main__":
    result = get_top_notifications()

    Log("frontend", "info", "utils", "Displaying results")

    print("\nTop 10 Priority Notifications:\n")

    for i in range(len(result)):
        n = result[i]
        print(
            f"{i+1}. [{n['Type']}] {n['Message']} - {n['Timestamp']}"
        )