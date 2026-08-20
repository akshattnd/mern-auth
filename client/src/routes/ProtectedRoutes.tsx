import { useCurrentUser } from "../hooks/user";
import { Navigate, Outlet } from "react-router";
export function ProtectedRoute() {
  const { data: user, isPending } = useCurrentUser();
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Outlet />;
}
