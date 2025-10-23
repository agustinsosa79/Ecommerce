import { store } from "../store/store";
import { loginSuccess, logout } from "../store/slices/authSlice";

export const protectedFetch = async (url: string, options: RequestInit = {}) => {
  let token = store.getState().auth.token;

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    credentials: "include",
  };

  let res = await fetch(url, { ...options, headers, credentials: "include" });

  if (res.status === 401) {
    // Token expirado: pedimos nuevo
    const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/users/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      token = data.token;

      store.dispatch(loginSuccess({ user: store.getState().auth.user!, token }));

      // Reintentamos la request original
      res = await fetch(url, { ...options, headers: { ...headers, Authorization: `Bearer ${token}` }, credentials: "include" });
    } else {
      store.dispatch(logout());
      return Promise.reject("Session expired");
    }
  }

  return res;
};
