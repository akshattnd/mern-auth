import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useSignUp } from "../../hooks/user";
import { data, useNavigate } from "react-router";
import { Loading } from "../../components/Loading";
import { toast } from "react-toastify";
interface LoginFormData {
  username: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    email: "",
    password: "",
  });
  const registerMutation = useSignUp();
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
    // const isEmail = emailRegex.test(formData.identifier)

    registerMutation.mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message)
        navigate("/sign-in");
      },
      onError: (error) => {
        // console.error(error);
        toast.error(error.message)
      },
    });
  };
  return (
    <div className="h-[calc(100vh-6rem)] flex items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Create an account
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your details to create your account.
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Username */}
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
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
            className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:text-white"
          />

          <p className="text-xs text-gray-500">
            Password must be at least 8 characters.
          </p>
        </div>

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {registerMutation.isPending ? <Loading /> : "Create account"}
        </button>
      </form>
    </div>
  );
}
