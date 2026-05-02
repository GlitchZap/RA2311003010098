# Stage 1 Priority Inbox

## Problem Statement

Users receive many notifications and may miss important ones.\
The goal is to display the Top 10 most important unread notifications
based on priority.

## Approach

Priority is based on: - Type Weight: Placement \> Result \> Event -
Recency: Newer notifications have higher priority

Score formula: score = weight \* large_number + timestamp

## Implementation Steps

1.  Fetch notifications from API
2.  Log API request and response
3.  Calculate score for each notification
4.  Sort notifications by score
5.  Select top 10 notifications
6.  Display results

## Efficiency

Current approach uses sorting
Better approach: Min Heap

## Logging Strategy

Logging is used for: - API calls - Processing steps - Final output

## Conclusion

The system prioritizes notifications effectively and highlights
important updates.
