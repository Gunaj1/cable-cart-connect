import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AdminRouteProps {
  children: JSX.Element;
}

// Protect admin-only routes. Uses DB helper function is_admin() for a reliable check.
const AdminRoute = ({ children }: AdminRouteProps) => {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        setIsAllowed(false);
        navigate("/login");
        return;
      }

      // Use RPC is_admin to avoid exposing role logic client-side
      const { data: isAdmin, error } = await supabase.rpc("is_admin");
      if (!cancelled) {
        if (error) {
          console.error("Admin check failed:", error);
          setIsAllowed(false);
          navigate("/");
        } else if (isAdmin) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
          navigate("/");
        }
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (isAllowed === null) return <p>Loading...</p>;
  if (!isAllowed) return null;

  return children;
};

export default AdminRoute;
