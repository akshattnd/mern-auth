

import { Loading } from "../../components/Loading";
import { useCurrentUser, useLogout } from "../../hooks/user";
import { useNavigate } from "react-router"
export default function Profile() {
  const { data, isPending, error } = useCurrentUser();
  const logoutMutation = useLogout();
  const navigate = useNavigate()
  const handleLogout = async () => {
    const res = await logoutMutation.mutateAsync()
    console.log(res)
    navigate('/sign-in');

  }
  if (isPending) return <Loading />;
  if (error) return <p>Error occured:{error.message}</p>;
  return (
    <div className="flex justify-center items-center w-full max-w-lg">
      <p>welcome :{data?.data?.username}</p>
      <button onClick={handleLogout}> Logout </button>
    </div>
  );
}
