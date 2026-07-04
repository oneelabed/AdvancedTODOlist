import { useState, useCallback, useContext } from "react";
import type { Task } from "../types/Task";
import { SnackContext } from "../providers/SnackProvider";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../services/tasksDataServiceFireBase";
import { useUser } from "../providers/UserProvider";

function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { raiseSnack } = useContext(SnackContext) as any;
  const { user } = useUser();

  // READ
  const handleGetTasks = useCallback(async (columnIds?: string[]) => {
    setIsLoading(true);
    try {
      const savedTasks = await getTasks(columnIds);
      setTasks(savedTasks);
    } catch (e) {
      raiseSnack("error", "An error occurred while importing tasks");
      setError("Error fetching tasks");
    } finally {
      setIsLoading(false);
    }
  }, [raiseSnack]);

  // CREATE
  const handleAddNewTask = useCallback(
    async (task: Omit<Task, "id" | "savedBy">) => {
      if (!task.columnId) {
        raiseSnack("error", "Please select a column for the task");
        return;
      }

      const { id, ...taskWithoutId } = task as any;
      const newTaskData = {
        ...taskWithoutId,
        savedBy: [],
      };

      try {
        const newId = await addTask(newTaskData as any);
        const newTask: Task = {
          ...newTaskData,
          id: newId,
        } as Task;

        setTasks((prev) => [...prev, newTask]);
        raiseSnack("success", "New task added successfully");
      } catch (error) {
        raiseSnack("error", "An error occurred while creating the task");
      }
    },
    [raiseSnack],
  );

  // UPDATE - Move Column (Optimistic Update)
  const moveTaskToColumn = useCallback(
    (taskId: string, columnId: string) => {
      setTasks((prev) => {
        const task = prev.find((t) => t.id === taskId);
        if (!task || task.columnId === columnId) return prev;

        updateTask(taskId, { columnId }).catch(() => {
          raiseSnack("error", "Error saving task column location");
        });

        return prev.map((t) =>
          t.id === taskId ? { ...t, columnId } : t,
        );
      });
    },
    [raiseSnack],
  );

  // UPDATE - Full Edit
  const handleEditTask = useCallback(
    async (task: Task) => {
      if (!task.id) return;

      try {
        await updateTask(task.id, task);
        setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
        raiseSnack("success", "Task edited successfully");
      } catch (error) {
        raiseSnack("error", "Error editing task");
      }
    },
    [raiseSnack],
  );

  // DELETE
  const handleDeleteTask = useCallback(
    async (id: string) => {
      if (confirm("Are you sure you want to delete this task?")) {
        try {
          await deleteTask(id);
          setTasks((prev) => prev.filter((t) => t.id !== id));
          raiseSnack("success", "Task deleted successfully");
        } catch (error) {
          raiseSnack("error", "Error deleting task");
        }
      }
    },
    [raiseSnack],
  );

  // TOGGLE SAVE TASK (Optimistic Update)
  const toggleSaveTask = useCallback(
    async (id: string) => {
      if (!user) {
        raiseSnack("warning", "Please log in to save tasks");
        return;
      }

      setTasks((prev) => {
        const task = prev.find((t) => t.id === id);
        if (!task) return prev;

        const isSaved = task.savedBy.includes(user.id);
        const newSavedBy = isSaved
          ? task.savedBy.filter((uid) => uid !== user.id)
          : [...task.savedBy, user.id];

        updateTask(id, { savedBy: newSavedBy }).catch(() => {
          raiseSnack("error", "Error updating task save state");
        });

        return prev.map((t) => (t.id === id ? { ...t, savedBy: newSavedBy } : t));
      });
    },
    [raiseSnack, user],
  );

  return {
    tasks,
    handleAddNewTask,
    handleEditTask,
    handleDeleteTask,
    handleGetTasks,
    toggleSaveTask,
    moveTaskToColumn,
    isLoading,
    error,
  };
}

export default useTasks;
