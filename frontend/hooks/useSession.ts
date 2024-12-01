// hooks/useSession.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const useSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => { 
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3000/api/auth/verify", {
            withCredentials: true, 
        });
        console.log(response)

        if (response.data.success) {
          setIsAuthenticated(true);
          setUser(response.data.user);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Session verification failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/signin");
  };

  return { isAuthenticated, user, loading, logout };
};

export default useSession;
