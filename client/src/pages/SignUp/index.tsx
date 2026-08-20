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
    <form onSubmit={handleSubmit}>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter email "
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter username "
          value={formData.username}
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

      <button type="submit" disabled={registerMutation.isPending}>{registerMutation.isPending ? <Loading /> : <span>Submit</span>} </button>
    </form>
  );
}
