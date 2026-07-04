import type { Column } from "../types/Column";

export const getColumnName = (columnId: string, columns: Column[]) => {
  return columns.find((c) => c.id === columnId)?.title ?? columnId;
};
