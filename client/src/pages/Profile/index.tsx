import { Loading } from "../../components/Loading";
import { useCurrentUser, useLogout } from "../../hooks/user";
import { useNavigate } from "react-router";

export default function Profile() {
  const { data, isPending, error } = useCurrentUser();
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    navigate("/sign-in");
  };

  if (isPending) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/30">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl dark:bg-red-900/40">
            ⚠️
          </div>

          <h2 className="text-lg font-semibold text-red-700 dark:text-red-400">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8 dark:border-gray-800 dark:bg-gray-900">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            {data?.data?.username?.charAt(0).toUpperCase()}
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back!
          </h1>

          <p className="mt-1 text-gray-500 dark:text-gray-400">
            @{data?.data?.username}
          </p>
        </div>

        {/* User Details */}
        <div className="mt-8 divide-y divide-gray-200 rounded-xl border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Username
            </span>

            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {data?.data?.username}
            </span>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Email
            </span>

            <span className="max-w-[60%] truncate text-sm font-medium text-gray-900 dark:text-white">
              {data?.data?.email}
            </span>
          </div>
        </div>
        

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="mt-6 flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {logoutMutation.isPending ? <Loading /> : "Logout"}
        </button>
      </section>
    </main>
  );
}