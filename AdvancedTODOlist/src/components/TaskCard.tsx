import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Avatar,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Column } from "../types/Column";
import type { Task } from "../types/Task";
import ROUTES from "../router/routes";
import EditIcon from "@mui/icons-material/Edit";
import TaskFormDialog from "./TaskFormDialog";
import { useState, memo, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useUser } from "../providers/UserProvider";
import { getUserById } from "../services/usersDataServiceFireBase";
import type { User } from "../types/User";

interface TaskProps {
  task: Task;
  columns: Column[];
  handleEditTask: (data: Task) => void;
  handleDeleteTask: (id: string) => void;
  toggleSaveTask: (id: string) => void;
}

function TaskCard({
  task,
  columns,
  handleEditTask,
  handleDeleteTask,
  toggleSaveTask,
}: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [assignee, setAssignee] = useState<User | null>(null);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (task.assigneeId) {
      getUserById(task.assigneeId).then(setAssignee).catch(console.error);
    } else {
      setAssignee(null);
    }
  }, [task.assigneeId]);

  const isSaved = user && task.savedBy?.includes(user.id);

  return (
    <Card
      sx={{
        minHeight: 180,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        position: "relative",
      }}
      elevation={3}
    >
      <CardActionArea
        onClick={() => {
          navigate(ROUTES.TASK_PAGE + task.id);
        }}
      >
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {task.description}
          </Typography>
        </CardContent>
        <Box sx={{ px: 2, pb: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          {assignee && (
            <Tooltip title={`Assignee: ${assignee.displayName || assignee.email}`}>
              <Avatar sx={{ width: 28, height: 28, fontSize: "0.8rem", bgcolor: "secondary.main" }}>
                {(assignee.displayName || assignee.email).charAt(0).toUpperCase()}
              </Avatar>
            </Tooltip>
          )}
        </Box>
      </CardActionArea>
      {user && (
        <CardActions sx={{ borderTop: 1, borderColor: "divider", py: 0.5 }}>
          <IconButton onClick={() => setIsOpen(true)} size="small" aria-label="Edit task">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => handleDeleteTask(task.id)} aria-label="Delete task">
            <ClearIcon fontSize="small" sx={{ color: "error.main" }} />
          </IconButton>
          <IconButton size="small" onClick={() => toggleSaveTask(task.id)} aria-label="Save task">
            {isSaved ? (
              <StarIcon fontSize="small" sx={{ color: "warning.main" }} />
            ) : (
              <StarBorderIcon fontSize="small" />
            )}
          </IconButton>

          {/* Quick select dropdown for moving between columns */}
          <FormControl size="small" sx={{ minWidth: 90, ml: "auto" }}>
            <Select
              value={task.columnId}
              onChange={(e) => handleEditTask({ ...task, columnId: e.target.value })}
              variant="standard"
              disableUnderline
              sx={{ fontSize: "0.75rem" }}
            >
              {columns.map((col) => (
                <MenuItem key={col.id} value={col.id} sx={{ fontSize: "0.75rem" }}>
                  {col.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardActions>
      )}
      {isOpen && (
        <TaskFormDialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          initialValues={task}
          columns={columns}
          handleSave={handleEditTask}
        />
      )}
    </Card>
  );
}

export default memo(TaskCard);
