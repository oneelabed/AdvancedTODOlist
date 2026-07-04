import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import type { Column } from "../types/Column";
import type { Task } from "../types/Task";
import type { User } from "../types/User";
import { getUsers } from "../services/usersDataServiceFireBase";
import { useState, useEffect } from "react";

interface TaskFormDialogProps {
  open: boolean;
  onClose: () => void;
  initialValues?: Task;
  columns: Column[];
  handleSave: (data: Task) => void;
}

function TaskFormDialog({
  open,
  onClose,
  initialValues,
  columns,
  handleSave,
}: TaskFormDialogProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (open) {
      getUsers().then(setUsers).catch(console.error);
    }
  }, [open]);

  const { control, handleSubmit, reset } = useForm<Task>({
    defaultValues: initialValues ?? {
      title: "",
      description: "",
      columnId: columns[0]?.id ?? "",
      assigneeId: "",
      savedBy: [],
    },
  });

  const onSubmit = (data: Task) => {
    handleSave(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialValues ? "Edit Task" : "Add New Task"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Stack spacing={3}>
            {/* Task Title */}
            <Controller
              name="title"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            {/* Task Description */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                />
              )}
            />

            {/* Column */}
            <Controller
              name="columnId"
              control={control}
              rules={{ required: "Please select a column" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  label="Column"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                >
                  {columns.map((col) => (
                    <MenuItem key={col.id} value={col.id}>
                      {col.title}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* Assignee */}
            <Controller
              name="assigneeId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Assignee"
                  fullWidth
                >
                  <MenuItem value="">Unassigned</MenuItem>
                  {users.map((u) => (
                    <MenuItem key={u.id} value={u.id}>
                      {u.displayName || u.email}
                    </MenuItem>
                  ))}
                  {field.value && !users.some((u) => u.id === field.value) && (
                    <MenuItem value={field.value} style={{ display: "none" }}>
                      Loading...
                    </MenuItem>
                  )}
                </TextField>
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {initialValues ? "Save" : "Create Task"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TaskFormDialog;
