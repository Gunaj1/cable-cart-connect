import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://hddvrvhuemdqahfhgsnf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkZHZydmh1ZW1kcWFoZmhnc25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNDQ0MDIsImV4cCI6MjA2OTgyMDQwMn0.c8-0Aik8Si2tcP2jbs7NWs9ruMaNwWjGJI8MpswCDwA"
);

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) return <p>Loading...</p>;

  return children;
};

export default PrivateRoute;
