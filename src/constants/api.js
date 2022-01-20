/*export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://armelgeek-nodejs-mysql.herokuapp.com"
    : "https://armelgeek-nodejs-mysql.herokuapp.com";
*/
export const API_URL = "http://localhost:8100"
export const VONAGE_REQUEST = `${API_URL}/request`;
export const CREATE_USER = `${API_URL}/api/users`