import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/signup`, credentials, {
        withCredentials: true, // ✅ required for cookies in Docker
      });

      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");

      // ✅ Return success so the component can handle navigation
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
      set({ isSigningUp: false, user: null });
      return false;
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, credentials, {
        withCredentials: true,
      });
      set({ user: response.data.user, isLoggingIn: false });
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error?.response?.data?.message || "Login failed");
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post(`${BASE_URL}/api/v1/auth/logout`, {}, {
        withCredentials: true,
      });
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/auth/authCheck`, {
        withCredentials: true,
      });
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
}));


