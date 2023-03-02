import { client } from "./client";

export const GetisAuth = async (token) => {
  let req;
  try {
    req = await client.get("user/isAuth", {
      headers: {
        auth: "Bearer " + token,
        accept: "application/json",
      },
    });
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return { error: response.data.response };
    }

    return { error: error.message || error };
  }
  return { error: null, user: req.data };
};
