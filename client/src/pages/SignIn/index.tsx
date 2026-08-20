import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useSignIn } from "../../hooks/user";
import { useNavigate } from "react-router";
import { Loading } from "../../components/Loading";
import { toast } from "react-toastify";
interface LoginFormData {
  identifier: string;
  password: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export default function SignIn() {
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: "",
    password: "",
  });
  const loginMutation = useSignIn();
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
  };
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmail = emailRegex.test(formData.identifier);
    const payload = isEmail
      ? {
        email: formData.identifier,
        password: formData.password,
      }
      : {
        username: formData.identifier,
        password: formData.password,
      };
    // console.log("payload", payload);
    loginMutation.mutate(payload, {
      onSuccess: (data) => {
        const { accessToken, refreshToken } = data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        toast.success(data.message)
        navigate("/");
      },
      onError: (error) => {
        // console.error(error);
        toast.error(error.message)
      },
    });
  };
  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8 dark:border-gray-800 dark:bg-gray-900"
      >
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome back
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign in to your account to continue.
          </p>
        </div>

        {/* Username / Email */}
        <div className="space-y-2">
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Username or Email
          </label>

          <input
            id="identifier"
            name="identifier"
            type="text"
            placeholder="Enter username or email"
            value={formData.identifier}
            onChange={handleChange}
            required
            autoComplete="username"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-500 dark:hover:border-gray-600"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            autoComplete="current-password"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-500 dark:hover:border-gray-600"
          />

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Password must be at least 8 characters.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loginMutation.isPending ? <Loading /> : "Sign in"}
        </button>
      </form>
    </div>
  );
}
