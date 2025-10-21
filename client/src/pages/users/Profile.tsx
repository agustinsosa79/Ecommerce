// src/pages/users/Profile.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { loginSuccess } from "../../store/slices/authSlice";
import { userSchema } from "../../schemas/userSchema";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((s: RootState) => s.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nameUser: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  }

  // Inicializamos formData cuando llega un user
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        nameUser: user.nameUser,
        email: user.email,
        password: "",
      });
      setIsEditing(false);
      setError(null);
      setSuccess(null);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name,
        nameUser: user.nameUser,
        email: user.email,
        password: "",
      });
    }
    setError(null);
    setSuccess(null);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError(null);
    setSuccess(null);

    // Validación con zod
    const validation = userSchema.safeParse({
      name: formData.name,
      nameUser: formData.nameUser,
      email: formData.email,
      password: formData.password || undefined,
    });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    // Solo enviamos campos modificados
    const payload: Record<string, string> = {};
    if (formData.name !== user.name) payload.name = formData.name;
    if (formData.nameUser !== user.nameUser) payload.nameUser = formData.nameUser;
    if (formData.email !== user.email) payload.email = formData.email;
    if (formData.password) payload.password = formData.password;

    if (Object.keys(payload).length === 0) {
      setError("No hay cambios para guardar.");
      return;
    }

    setLoading(true);
    try {

      console.log("Payload que voy a enviar:", payload);
      const resp = await fetch(`http://localhost:4000/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Error al actualizar");

      dispatch(loginSuccess({ user: data, token }));
      setFormData({ name: data.name, nameUser: data.nameUser, email: data.email, password: "" });
      setSuccess("Perfil actualizado correctamente.");
      setIsEditing(false);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message || "Error al guardar cambios");
      else setError("Error desconocido");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3500);
    }
  };

  return (
    <section className="min-h-screen max-w-full bg-black text-white flex flex-col items-center justify-start py-12 px-6">
      <h1 className="text-4xl font-serif mb-8">Mi Perfil</h1>

      <div className="w-full max-w-2xl bg-black/60 backdrop-blur-sm border border-white/6 rounded-2xl shadow-xl p-6 flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-white/60 text-sm">Nombre completo</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={clsx(
                "w-full rounded-lg px-3 py-2 bg-black/40 outline-none text-white placeholder-white/40",
                isEditing ? "border border-white/10 focus:ring-2 focus:ring-white/20" : "border-b border-white/6"
              )}
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="text-white/60 text-sm">Usuario</label>
            <input
              name="nameUser"
              value={formData.nameUser}
              onChange={handleChange}
              disabled={!isEditing}
              className={clsx(
                "w-full rounded-lg px-3 py-2 bg-black/40 outline-none text-white placeholder-white/40",
                isEditing ? "border border-white/10 focus:ring-2 focus:ring-white/20" : "border-b border-white/6"
              )}
              placeholder="Tu usuario"
            />
          </div>

          <div>
            <label className="text-white/60 text-sm">Correo</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={clsx(
                "w-full rounded-lg px-3 py-2 bg-black/40 outline-none text-white placeholder-white/40",
                isEditing ? "border border-white/10 focus:ring-2 focus:ring-white/20" : "border-b border-white/6"
              )}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label className="text-white/60 text-sm">Nueva contraseña</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
              className={clsx(
                "w-full rounded-lg px-3 py-2 bg-black/40 outline-none text-white placeholder-white/40",
                isEditing ? "border border-white/10 focus:ring-2 focus:ring-white/20" : "border-b border-white/6"
              )}
              placeholder="Si no querés cambiarla, dejala vacía"
            />
          </div>

          <div className="mt-1 min-h-[1.25rem]">
            {error && <p className="text-sm text-red-400">{error}</p>}
            {success && <p className="text-sm text-green-400">{success}</p>}
          </div>

          <div className="mt-3 flex gap-3">
            {isEditing && (
              <>
                <button type="submit" disabled={loading} className=" cursor-pointer px-5 py-2 rounded-lg bg-white text-black font-semibold transition hover:bg-white/90">
                  {loading ? "Guardando..." : "Guardar cambios"}
                </button>
                <button type="button" onClick={handleCancel} className=" cursor-pointer hover:bg-zinc-900  px-4 py-2 rounded-lg bg-transparent border border-white/10 text-white">
                  Cancelar
                </button>
              </>
            )}
          </div>
        </form>

        {!isEditing && (
        <button onClick={handleEditClick} className=" cursor-pointer px-4 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-900 text-white border border-black transition">
          Editar perfil
        </button>
        )}
      </div>

      <button onClick={() => navigate("/inicio")} className=" cursor-pointer max-w-2xl w-full mt-4 px-4 py-2 rounded-lg bg-gray-800/40 hover:bg-gray-700/20 text-white border border-black transition">
        Volver al inicio
      </button>
    </section>
  );
};

export default Profile;
