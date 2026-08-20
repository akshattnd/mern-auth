import { apiClient } from "../lib/axios";
import type {
    User,
    ChangePassword,
    LoginUser,
    RefreshToken,
    RegisterUser,
    RefreshAccessToken,
} from "../types/user.types";
import { type ApiResponse } from "../types/api.types";
export async function getCurrentUser() {

    const res = await apiClient.get<ApiResponse<User>>("/user/me");
    return res.data;

}
export async function register(data: RegisterUser) {
    const res = await apiClient.post<ApiResponse<User>>("/user/register", data);
    return res.data;
}
export async function login(data: LoginUser) {
    const res = await apiClient.post<ApiResponse<User>>("/user/login", data);
    return res.data;
}
export async function changePassword(data: ChangePassword) {
    const res = await apiClient.put<ApiResponse<null>>("/user/change-password", data);
    return res.data;
}
export async function logout() {
    const res = await apiClient.get<ApiResponse<null>>("/user/logout");
    return res.data;
}

export async function refreshToken(data: RefreshToken) {
    const res = await apiClient.post<ApiResponse<RefreshAccessToken>>("/refresh-token", data);
    return res.data;
}
