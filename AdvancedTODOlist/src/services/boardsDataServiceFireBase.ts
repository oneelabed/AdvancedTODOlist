import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import app from "../config/firebase";
import type { Board } from "../types/Board";

const db = getFirestore(app);
const boardsCollectionName = "boards";
const boardsCollection = collection(db, boardsCollectionName);

export const addBoard = async (board: Omit<Board, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(boardsCollection, board);
    return docRef.id;
  } catch (error) {
    console.error("Error adding board: ", error);
    throw error;
  }
};

export const getBoards = async (): Promise<Board[]> => {
  try {
    const querySnapshot = await getDocs(boardsCollection);
    const boards: Board[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Board,
    );
    return boards;
  } catch (error) {
    console.error("Error getting boards: ", error);
    throw error;
  }
};

export const getBoardById = async (id: string): Promise<Board | null> => {
  const docRef = doc(db, boardsCollectionName, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Board;
    }
    return null;
  } catch (error) {
    console.error("Error getting board by id: ", error);
    throw error;
  }
};
