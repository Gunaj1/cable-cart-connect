import { Navigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  "https://hddvrvhuemdqahfhgsnf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkZHZydmh1ZW1kcWFoZmhnc25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNDQ0MDIsImV4cCI6MjA2OTgyMDQwMn0.c8-0Aik8Si2tcP2jbs7NWs9ruMaNwWjGJI8MpswCDwA"
);

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const session = supabase.auth.getSession();

  // ⏳ This will just assume unauthenticated for now (you can make it dynamic later)
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
