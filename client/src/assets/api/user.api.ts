import { apiClient } from "../../lib/axios";
import type { ChangePassword, LoginUser, RefreshToken, RegisterUser } from "../../types/user.types";

export async function me() {
    const res = await apiClient.get("/user/me");
    return res.data
}
export async function register(data: RegisterUser) {
    const res = await apiClient.post("/user/register", data);
    return res.data
}
export async function login(data: LoginUser) {
    const res = await apiClient.post("/user/login", data);
    return res.data
}
export async function changePassword(data: ChangePassword) {
    const res = await apiClient.put("/user/change-password", data);
    return res.data
}
export async function logout() {
    const res = await apiClient.get("/user/logout");
    return res.data
}

export async function refreshToken(data: RefreshToken) {
    const res = await apiClient.post('/refresh-token', data)
    return res.data
}