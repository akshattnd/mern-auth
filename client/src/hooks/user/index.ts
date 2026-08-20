import { useQuery, useMutation } from "@tanstack/react-query";
import { getCurrentUser, login, logout, register } from "../../api/user.api";
export function useCurrentUser() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: getCurrentUser,
  });
}
export function useSignIn() {
  return useMutation({
    mutationFn: login,
    mutationKey: ["user", "signIn"],
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logout,
    mutationKey: ["user", "logout"],
    onSuccess: () => {
      localStorage.clear();
    },
  });
}
export function useSignUp() {
  return useMutation({
    mutationFn: register,
    mutationKey: ["user", "signUp"],
  });
}
