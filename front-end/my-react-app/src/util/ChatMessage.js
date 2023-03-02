import { client } from "./client";

export const addChatMessage = async (token, data) => {
  let req;
  try {
    req = await client.post(
      "chat",
      { data },
      {
        headers: {
          auth: "Bearer " + token,
          accept: "application/json",
        },
      }
    );
  } catch (error) {
    const { response } = error;

    if (response?.data) return { error: response.data.response };

    return { error: error.message || error, data: null };
  }
  return { error: null, data: req.data };
};
export const getMessages = async (token) => {
  let req;
  try {
    req = await client.get("chat", {
      headers: {
        auth: "Bearer " + token,
        accept: "application/json",
      },
    });
  } catch (error) {
    const { response } = error;

    if (response?.data) return { error: response.data.response };

    return { error: error.message || error, data: null };
  }
  return { error: null, data: req.data };
};
