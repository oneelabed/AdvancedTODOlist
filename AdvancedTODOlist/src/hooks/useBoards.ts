import { useState, useCallback, useContext } from "react";
import type { Board } from "../types/Board";
import { SnackContext } from "../providers/SnackProvider";
import {
  addBoard,
  getBoards,
} from "../services/boardsDataServiceFireBase";

function useBoards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { raiseSnack } = useContext(SnackContext) as {
    raiseSnack: (
      color: "success" | "error" | "warning" | "info",
      message: string,
    ) => void;
  };

  const handleGetBoards = useCallback(async () => {
    setIsLoading(true);
    try {
      const savedBoards = await getBoards();
      setBoards(savedBoards);
    } catch {
      raiseSnack("error", "An error occurred while importing boards");
    } finally {
      setIsLoading(false);
    }
  }, [raiseSnack]);

  const handleAddBoard = useCallback(
    async (board: Omit<Board, "id">) => {
      try {
        const newId = await addBoard(board);
        const newBoard: Board = {
          ...board,
          id: newId,
        };
        setBoards((prev) => [...prev, newBoard]);
        raiseSnack("success", "New board added successfully");
      } catch (error) {
        raiseSnack("error", "An error occurred while creating the board");
      }
    },
    [raiseSnack],
  );

  return {
    boards,
    isLoading,
    handleGetBoards,
    handleAddBoard,
  };
}

export default useBoards;
