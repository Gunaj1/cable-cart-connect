import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Your Supabase client setup
const supabase = createClient(
  "https://hddvrvhuemdqahfhgsnf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkZHZydmh1ZW1kcWFoZmhnc25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNDQ0MDIsImV4cCI6MjA2OTgyMDQwMn0.c8-0Aik8Si2tcP2jbs7NWs9ruMaNwWjGJI8MpswCDwA

"
);

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsAuthenticated(!!session);
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) return null; // or loading spinner

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
