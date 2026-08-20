import { useQuery, useMutation } from "@tanstack/react-query";
import { getCurrentUser, login, register } from "../../api/user.api"
export function useCurrentUser() {
    return useQuery({
        queryKey: ['user', 'me'],
        queryFn: getCurrentUser,
    })
}
export function useSignIn() {
    return useMutation({
        mutationFn: login,
        mutationKey: ['user', 'signIn']
    })
}
export function useSignUp() {
    return useMutation({
        mutationFn: register,
        mutationKey: ['user', 'signUp']
    })
}
