import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import app from "../config/firebase";
import type { Task } from "../types/Task";

const db = getFirestore(app);
const tasksCollectionName = "tasks";
const tasksCollection = collection(db, tasksCollectionName);

export const addTask = async (task: Omit<Task, "id">): Promise<string> => {
  try {
    const newDocRef = doc(tasksCollection);
    await setDoc(newDocRef, { ...task, id: newDocRef.id });
    return newDocRef.id;
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
};

export const getTasks = async (columnIds?: string[]): Promise<Task[]> => {
  try {
    let q = query(tasksCollection);
    if (columnIds && columnIds.length > 0) {
      q = query(tasksCollection, where("columnId", "in", columnIds));
    } else if (columnIds && columnIds.length === 0) {
      return [];
    }
    const querySnapshot = await getDocs(q);
    const tasks: Task[] = querySnapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
      } as Task;
    });

    return tasks;
  } catch (error) {
    console.error("Error getting tasks: ", error);
    throw error;
  }
};

export const updateTask = async (
  id: string,
  updatedData: Partial<Task>,
): Promise<void> => {
  try {
    const taskDocRef = doc(db, tasksCollectionName, id);
    await updateDoc(taskDocRef, updatedData);
  } catch (error) {
    console.error("Error updating task: ", error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    const taskDocRef = doc(db, tasksCollectionName, id);
    await deleteDoc(taskDocRef);
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw error;
  }
};

export const getTaskById = async (
  id: string,
): Promise<Task | null> => {
  const docRef = doc(db, tasksCollectionName, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
      } as Task;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};
