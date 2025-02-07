const getItem = (key) => {
  const data = typeof window !== "undefined" ? localStorage.getItem(key) : "";

  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

const setItem = (key, value) => {
  const stringify = typeof value !== "string" ? JSON.stringify(value) : value;
  return localStorage.setItem(key, stringify);
};

const getName = () => {
  const data =
    typeof window !== "undefined" ? localStorage.getItem("accessUser") : null;

  if (!data) return undefined; // Return undefined if there's no data

  try {
    const parsedData = JSON.parse(data);
    return parsedData.name; // Ensure that parsedData is an object that contains 'role'
  } catch (err) {

    return undefined;
  }
};

const getRole = () => {
  const data =
    typeof window !== "undefined" ? localStorage.getItem("accessUser") : null;

  if (!data) return undefined; // Return undefined if there's no data

  try {
    const parsedData = JSON.parse(data);
    return parsedData.role; // Ensure that parsedData is an object that contains 'role'
  } catch (err) {
    console.error("Failed to parse user data:", err);
    return undefined;
  }
};

const getUserId = () => {
  const data =
    typeof window !== "undefined" ? localStorage.getItem("accessUser") : null;

  if (!data) return undefined; // Return undefined if there's no data

  try {
    const parsedData = JSON.parse(data);
    return parsedData._id; // Ensure that parsedData is an object that contains 'role'
  } catch (err) {
    console.error("Failed to parse user data:", err);
    return undefined;
  }
};

const removeItem = () => {
  localStorage.removeItem("accessUser");
  localStorage.removeItem("accessToken");
};

const removeItemByKey = (key) => {
  localStorage.removeItem(key);
};

const isAuthenticated = () => {
  const data =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
  if (data) {
    return true;
  }
  return false;
};
export {
  getItem,
  setItem,
  removeItem,
  isAuthenticated,
  getRole,
  getName,
  getUserId,
  removeItemByKey
};
