import { Card, CardContent, Typography } from "@mui/material";

export default function NotificationCard({ data, viewed }: any) {
  return (
    <Card
      sx={{
        marginBottom: 2,
        backgroundColor: viewed ? "#f5f5f5" : "#e3f2fd",
      }}
    >
      <CardContent>
        <Typography variant="h6">{data.Type}</Typography>
        <Typography>{data.Message}</Typography>
        <Typography variant="caption">{data.Timestamp}</Typography>
      </CardContent>
    </Card>
  );
}