import { client } from "./client";
export const addUser = async (data) => {
  let req;
  try {
    req = await client.post("user", data);
  } catch (error) {
    const { response } = error;

    if (response?.data) return { error: response.data.response };

    return { error: error.message || error, data: null };
  }
  return { error: null, data: req.data };
};
export const getUser = async (data) => {
  let req;
  try {
    req = await client.get("user", {
      params: { data },
    });
  } catch (error) {
    const { response } = error;

    if (response?.data) return { error: response.data.response };

    return { error: error.message || error, data: null };
  }
  return { error: null, data: req.data };
};
