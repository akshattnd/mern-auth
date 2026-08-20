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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="identifier">Username or Email</label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          placeholder="Enter username or email"
          value={formData.identifier}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
          min={8}
        />
      </div>

      <button type="submit" disabled={loginMutation.isPending}>{loginMutation.isPending ? <Loading /> : <span>Submit</span>}</button>
    </form>
  );
}
