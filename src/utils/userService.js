import { db } from "../firebase/config";
import { ref, get, push, set } from "firebase/database";

export const checkEmailExists = async (email) => {
  const usersRef = ref(db, "users");
  const snapshot = await get(usersRef);

  if (!snapshot.exists()) return false;

  const users = snapshot.val();

  return Object.values(users).some(
    (user) => user.email?.toLowerCase() === email.toLowerCase()
  );
};

export const createUserAccount = async (userData) => {
  const usersRef = ref(db, "users");
  const newUserRef = push(usersRef);

  const finalUserData = {
    id: newUserRef.key,
    ...userData,
    isPassenger: true,
    hasRiderProfile: Boolean(userData.riderProfile),
    createdAt: new Date().toISOString(),
  };

  await set(newUserRef, finalUserData);

  return finalUserData;
};

export const loginUser = async (email, password) => {
  const usersRef = ref(db, "users");
  const snapshot = await get(usersRef);

  if (!snapshot.exists()) {
    return {
      success: false,
      message: "No registered users found. Please create an account first.",
    };
  }

  const users = snapshot.val();

  const matchedUser = Object.values(users).find(
    (user) => user.email?.toLowerCase() === email.toLowerCase()
  );

  if (!matchedUser) {
    return {
      success: false,
      message: "No account found with this email. Please create an account first.",
    };
  }

  if (matchedUser.password !== password) {
    return {
      success: false,
      message: "Incorrect password. Please try again.",
    };
  }

  return {
    success: true,
    user: matchedUser,
    message: "Login successful.",
  };
};