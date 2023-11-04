import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import AuthService from "../providers/AuthService";

function useProtectedRoute() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery("user", async () => {
    const token = AuthService.getCurrentUser();

    if (!token) {
      navigate("/login");
      return null;
    }

    if (token) {
      try {
        const response = await fetch(process.env.REACT_APP_API_USER_URL, {
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
        navigate("/login");
      }
    }
    return null;
  });

  return { data, error, isLoading };
}

export default useProtectedRoute;
