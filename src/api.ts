import axios from "axios";

const host = "http://localhost:8008/api/v1";

export const getUserByToken = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const response = await axios({
    method: "GET",
    url: `${host}/users/get`,
    params: { email, token },
  });

  return response?.data;
};
