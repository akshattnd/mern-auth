import { useCurrentUser } from "../../hooks/user";
export default function Profile() {
  const { data, isLoading, error } = useCurrentUser();
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error occured:{error.message}</p>
  return <div>welcome :{data?.data?.username}</div>;
}
