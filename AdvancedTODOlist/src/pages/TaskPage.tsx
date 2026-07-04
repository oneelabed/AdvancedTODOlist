import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import type { Task } from "../types/Task";
import { getTaskById } from "../services/tasksDataServiceFireBase";

export default function TaskPage() {
  const [task, setTask] = useState<Task | null>(null);
  const { id } = useParams();

  const handleGetTask = useCallback(async () => {
    if (id) {
      const savedTask = await getTaskById(id);
      if (savedTask) {
        setTask(savedTask);
      }
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      try {
        handleGetTask();
      } catch (e) {
        console.log("Error loading task details");
      }
    }
  }, [id, handleGetTask]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 4,
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{ maxWidth: 500, width: "100%", borderRadius: 2, boxShadow: 2 }}
      >
        {task ? (
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Typography variant="h5" component="h1" color="text.primary">
                {task.title}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" color="text.secondary">
              {task.description}
            </Typography>
          </CardContent>
        ) : null}
      </Card>
    </Box>
  );
}
