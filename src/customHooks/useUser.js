import { useQuery } from "react-query";
import AuthService from "../providers/AuthService";

function useUser() {
  return useQuery("user", async () => {
    const token = AuthService.getCurrentUser();

    if (!token) {
      return null;
    }

    try {
      const response = await fetch("http://localhost:3001/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Response not ok");
      }
    } catch (error) {
      return null;
    }
  });
}

export default useUser;
