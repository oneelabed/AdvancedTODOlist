import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import type { Board } from "../types/Board";

type BoardFormValues = Pick<Board, "title">;

interface BoardFormDialogProps {
  open: boolean;
  onClose: () => void;
  initialValues?: Board;
  handleSave: (data: Board | BoardFormValues) => void;
}

function BoardFormDialog({
  open,
  onClose,
  initialValues,
  handleSave,
}: BoardFormDialogProps) {
  const { control, handleSubmit, reset } = useForm<BoardFormValues>({
    defaultValues: initialValues ?? { title: "" },
  });

  const onSubmit = (data: BoardFormValues) => {
    if (initialValues) {
      handleSave({ ...initialValues, ...data });
    } else {
      handleSave(data);
    }
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        {initialValues ? "Edit Board" : "Add New Board"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Stack spacing={3}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Board Title"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  autoFocus
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {initialValues ? "Save" : "Create Board"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default BoardFormDialog;
