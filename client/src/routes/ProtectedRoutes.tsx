import { Loading } from "../components/Loading";
import { useCurrentUser } from "../hooks/user";
import { Navigate, Outlet } from "react-router";
export function ProtectedRoute() {
  const { data: user, isPending } = useCurrentUser();
  if (isPending) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Outlet />;
}
