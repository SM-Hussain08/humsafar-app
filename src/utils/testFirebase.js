import { db } from "../firebase/config";
import { ref, set } from "firebase/database";

export const testWrite = async () => {
  await set(ref(db, "test/message"), {
    text: "Firebase connected successfully 🚀",
  });
};