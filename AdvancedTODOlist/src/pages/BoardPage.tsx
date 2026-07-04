import { useEffect, useState, memo, useMemo, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import useTasks from "../hooks/useTasks";
import useColumns from "../hooks/useColumns";
import KanbanBoard from "../components/KanbanBoard";
import ColumnFormDialog from "../components/ColumnFormDialog";
import { SnackContext } from "../providers/SnackProvider";
import { useUser } from "../providers/UserProvider";
import { getBoardById } from "../services/boardsDataServiceFireBase";
import type { Board } from "../types/Board";
import type { Column } from "../types/Column";

function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const [board, setBoard] = useState<Board | null>(null);
  const [boardLoading, setBoardLoading] = useState(true);
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false);
  const [editingColumn, setEditingColumn] = useState<Column | undefined>();
  const [filterType, setFilterType] = useState<"all" | "my" | "saved">("all");

  const { raiseSnack } = useContext(SnackContext) as {
    raiseSnack: (
      color: "success" | "error" | "warning" | "info",
      message: string,
    ) => void;
  };

  const {
    columns,
    handleGetColumns,
    handleAddColumn,
    handleEditColumn,
    handleDeleteColumn,
  } = useColumns();

  const {
    tasks,
    handleAddNewTask,
    handleEditTask,
    handleDeleteTask,
    handleGetTasks,
    toggleSaveTask,
    moveTaskToColumn,
    isLoading: tasksLoading,
    error: tasksError,
  } = useTasks();

  useEffect(() => {
    if (boardId) {
      setBoardLoading(true);
      getBoardById(boardId)
        .then((b) => {
          if (b) {
            setBoard(b);
          } else {
            raiseSnack("error", "The requested board was not found");
            navigate("/");
          }
        })
        .catch(() => {
          raiseSnack("error", "Error loading board");
        })
        .finally(() => {
          setBoardLoading(false);
        });
    }
  }, [boardId, navigate, raiseSnack]);

  useEffect(() => {
    if (boardId) {
      handleGetColumns(boardId);
    }
  }, [boardId, handleGetColumns]);

  useEffect(() => {
    if (columns.length > 0) {
      const colIds = columns.map((c) => c.id);
      handleGetTasks(colIds);
    } else {
      handleGetTasks([]);
    }
  }, [columns, handleGetTasks]);

  const columnIds = useMemo(
    () => new Set(columns.map((c) => c.id)),
    [columns],
  );

  const filteredTasks = useMemo(() => {
    if (!user) return tasks;
    if (filterType === "my") {
      return tasks.filter((t) => t.assigneeId === user.id);
    }
    if (filterType === "saved") {
      return tasks.filter((t) => t.savedBy?.includes(user.id));
    }
    return tasks;
  }, [tasks, filterType, user]);

  const handleOpenAddColumn = () => {
    setEditingColumn(undefined);
    setIsColumnDialogOpen(true);
  };

  const handleOpenEditColumn = (column: Column) => {
    setEditingColumn(column);
    setIsColumnDialogOpen(true);
  };

  const handleColumnSave = (data: Column | Pick<Column, "title">) => {
    if (boardId) {
      if ("id" in data) {
        handleEditColumn(data);
      } else {
        handleAddColumn({ ...data, boardId });
      }
    }
  };

  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: "all" | "my" | "saved" | null,
  ) => {
    if (newFilter !== null) {
      setFilterType(newFilter);
    }
  };

  const hasColumns = columns.length > 0;

  if (boardLoading || tasksLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (tasksError) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          {tasksError}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, pb: 10 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ borderRadius: 2 }}
        >
          Back to Boards
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          {board?.title}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2, mb: 4 }}>
        <ToggleButtonGroup
          value={filterType}
          exclusive
          onChange={handleFilterChange}
          aria-label="tasks"
          color="primary"
          size="medium"
        >
          <ToggleButton value="all">All Tasks</ToggleButton>
          <ToggleButton value="my">My Tasks</ToggleButton>
          <ToggleButton value="saved">Saved Tasks</ToggleButton>
        </ToggleButtonGroup>

        {hasColumns && (
          <Button
            variant="contained"
            startIcon={<ViewColumnIcon />}
            onClick={handleOpenAddColumn}
            sx={{ borderRadius: 2 }}
          >
            Add Column
          </Button>
        )}
      </Box>

      {!hasColumns ? (
        <Box sx={{ textAlign: "center", py: 8, border: 1, borderStyle: "dashed", borderColor: "divider", borderRadius: 2, bgcolor: "background.paper" }}>
          <Typography variant="h6" gutterBottom>
            No columns on this board — create a first column to start
          </Typography>
          <Button
            variant="contained"
            startIcon={<ViewColumnIcon />}
            onClick={handleOpenAddColumn}
            sx={{ mt: 2 }}
          >
            Create First Column
          </Button>
        </Box>
      ) : (
        <>
          <KanbanBoard
            columns={columns}
            tasks={filteredTasks}
            columnIds={columnIds}
            onMoveTask={moveTaskToColumn}
            onEditColumn={handleOpenEditColumn}
            onDeleteColumn={handleDeleteColumn}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            toggleSaveTask={toggleSaveTask}
            handleAddNewTask={handleAddNewTask}
          />

          <Paper
            elevation={1}
            sx={{
              mt: 3,
              p: 2,
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer",
              border: 1,
              borderStyle: "dashed",
              borderColor: "divider",
              borderRadius: 2,
              "&:hover": { bgcolor: "action.hover" }
            }}
            onClick={handleOpenAddColumn}
          >
            <ViewColumnIcon sx={{ mr: 1 }} color="action" />
            <Typography color="text.secondary">+ Add Column</Typography>
          </Paper>
        </>
      )}

      {isColumnDialogOpen && (
        <ColumnFormDialog
          open={isColumnDialogOpen}
          onClose={() => setIsColumnDialogOpen(false)}
          initialValues={editingColumn}
          handleSave={handleColumnSave}
        />
      )}
    </Box>
  );
}

export default memo(BoardPage);
