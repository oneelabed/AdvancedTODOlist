import { Box, IconButton, Paper, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { useDroppable } from "@dnd-kit/react";
import { memo, useState } from "react";
import type { Column as ColumnType } from "../types/Column";
import type { Task } from "../types/Task";
import DraggableTaskCard from "./DraggableTaskCard";
import TaskFormDialog from "./TaskFormDialog";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  columns: ColumnType[];
  onEditColumn: (column: ColumnType) => void;
  onDeleteColumn: (id: string) => void;
  handleEditTask: (data: Task) => void;
  handleDeleteTask: (id: string) => void;
  toggleSaveTask: (id: string) => void;
  handleAddNewTask: (task: Omit<Task, "id" | "savedBy">) => void;
}

function Column({
  column,
  tasks,
  columns,
  onEditColumn,
  onDeleteColumn,
  handleEditTask,
  handleDeleteTask,
  toggleSaveTask,
  handleAddNewTask,
}: ColumnProps) {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const { ref, isDropTarget } = useDroppable({
    id: column.id,
  });

  return (
    <Paper
      elevation={2}
      sx={{
        minWidth: 280,
        maxWidth: 320,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        bgcolor: isDropTarget ? "action.hover" : "background.paper",
        transition: "background-color 0.2s",
      }}
    >
      <Box
        sx={{
          p: 1.5,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" component="h2" noWrap>
          {column.title}
        </Typography>
        <Box>
          <IconButton
            size="small"
            onClick={() => onEditColumn(column)}
            aria-label="Edit Column"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDeleteColumn(column.id)}
            aria-label="Delete Column"
          >
            <ClearIcon fontSize="small" sx={{ color: "error.main" }} />
          </IconButton>
        </Box>
      </Box>

      <Box
        ref={ref}
        sx={{
          p: 1.5,
          flex: 1,
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <DraggableTaskCard
              key={task.id}
              task={task}
              columns={columns}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
              toggleSaveTask={toggleSaveTask}
            />
          ))
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", py: 4 }}
          >
            No tasks in this column
          </Typography>
        )}
      </Box>

      {/* Add Task Button inside Column */}
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setIsTaskDialogOpen(true)}
        sx={{ m: 1.5, mt: 0 }}
      >
        Add Task
      </Button>

      {isTaskDialogOpen && (
        <TaskFormDialog
          open={isTaskDialogOpen}
          onClose={() => setIsTaskDialogOpen(false)}
          columns={columns}
          initialValues={{
            id: "",
            title: "",
            description: "",
            columnId: column.id,
            assigneeId: "",
            savedBy: [],
          } as any}
          handleSave={handleAddNewTask}
        />
      )}
    </Paper>
  );
}

export default memo(Column);
