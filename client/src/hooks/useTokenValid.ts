import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store/store";
import { jwtDecode } from "jwt-decode";
import { logout } from "../store/slices/authSlice"; // asegurate que exista esta acción

export const useTokenValid = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [valid, setValid] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      setValid(false);
      return;
    }

    try {
      const decoded: { exp: number } = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp > now) {
        setValid(true);

        // programar deslogueo automático cuando expire
        const timeLeft = (decoded.exp - now) * 1000;
        const timeout = setTimeout(() => {
          dispatch(logout());
          setValid(false);
        }, timeLeft);

        return () => clearTimeout(timeout);
      } else {
        // ya expiró
        dispatch(logout());
        setValid(false);
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      dispatch(logout());
      setValid(false);
    }
  }, [token, dispatch]);

  return { valid };
};