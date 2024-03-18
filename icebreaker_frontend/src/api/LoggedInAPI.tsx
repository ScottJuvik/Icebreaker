import { getUserData } from "./UserAPI";

const getLoggedIn = (): boolean => {
  const user_id = sessionStorage.getItem("user_id");
  return user_id !== "" && user_id !== null;
};

const getLoggedInId = (): string => {
  const id = sessionStorage.getItem("user_id");
  if (id) return id;
  return "";
};

const getLoggedInName = async (): Promise<string> => {
  if (!getLoggedIn()) return "";
  const user = await getUserData(sessionStorage.getItem("user_id") || "");
  return user.name;
};

const getLoggedInType = async (): Promise<string> => {
  if (!getLoggedIn()) return "";
  const user = await getUserData(sessionStorage.getItem("user_id") || "");
  return user.type;
};

const getLoggedInUser = async () => {
  if (!getLoggedIn()) return;
  return await getUserData(sessionStorage.getItem("user_id") || "");
};

export {
  getLoggedIn,
  getLoggedInId,
  getLoggedInName,
  getLoggedInType,
  getLoggedInUser,
};
