import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string,
  email: string;
  name: string;
  city: string;
}

const useSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const checkSession = useCallback(() => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      // Directly set user data from localStorage if token exists
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Session verification failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    checkSession();
    setLoading(false);
  }, [checkSession]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/signin");
  }, [router]);

  return { isAuthenticated, user, setUser, loading, logout };
};

export default useSession;
