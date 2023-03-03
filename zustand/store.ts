import { Database } from "@/lib/database.types";
import { create } from "zustand";

type Routine = Database["public"]["Tables"]["routine"]["Insert"];

export const useStore = create((set) => ({
  name: "",
  description: "",
  daysPerWeek: 1,
  days: [{}]
}));
