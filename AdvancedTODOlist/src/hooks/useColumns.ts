import { useState, useCallback, useContext } from "react";
import type { Column } from "../types/Column";
import { SnackContext } from "../providers/SnackProvider";
import {
  addColumn,
  getColumns,
  updateColumn,
  deleteColumn,
} from "../services/columnsDataServiceFireBase";
import { getTasks } from "../services/tasksDataServiceFireBase";

function useColumns() {
  const [columns, setColumns] = useState<Column[]>([]);
  const { raiseSnack } = useContext(SnackContext) as {
    raiseSnack: (
      color: "success" | "error" | "warning" | "info",
      message: string,
    ) => void;
  };

  // READ
  const handleGetColumns = useCallback(async (boardId?: string) => {
    try {
      const savedColumns = await getColumns(boardId);
      setColumns(savedColumns);
    } catch {
      raiseSnack("error", "An error occurred while importing columns");
    }
  }, [raiseSnack]);

  // CREATE
  const handleAddColumn = useCallback(
    async (column: Omit<Column, "id">) => {
      try {
        const newId = await addColumn(column);
        const newColumn: Column = {
          ...column,
          id: newId,
        };

        setColumns((prev) => [...prev, newColumn]);
        raiseSnack("success", "New column added successfully");
      } catch (error) {
        raiseSnack("error", "An error occurred while creating the column");
      }
    },
    [raiseSnack],
  );

  // UPDATE
  const handleEditColumn = useCallback(
    async (column: Column) => {
      if (!column.id) return;

      try {
        await updateColumn(column.id, column);
        setColumns((prev) =>
          prev.map((c) => (c.id === column.id ? column : c)),
        );
        raiseSnack("success", "Column edited successfully");
      } catch (error) {
        raiseSnack("error", "Error editing column");
      }
    },
    [raiseSnack],
  );

  // DELETE
  const handleDeleteColumn = useCallback(
    async (id: string) => {
      try {
        const tasks = await getTasks([id]);
        if (tasks.some((t) => t.columnId === id)) {
          raiseSnack("warning", "Attention! Cannot delete a column that contains tasks");
          return;
        }

        await deleteColumn(id);
        setColumns((prev) => prev.filter((c) => c.id !== id));
        raiseSnack("success", "Column deleted successfully");
      } catch (error) {
        raiseSnack("error", "Error deleting column");
      }
    },
    [raiseSnack],
  );

  return {
    columns,
    handleGetColumns,
    handleAddColumn,
    handleEditColumn,
    handleDeleteColumn,
  };
}

export default useColumns;
