import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface IUser {
    id: string;
    name: string;
    nameUser: string;
    email:string;
}

interface IAuthState {
    user: IUser | null,
    token: string | null
}

const storedUser = localStorage.getItem("user");
const initialState: IAuthState = {
  user: storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
  token: localStorage.getItem('token') || null
};


const authSlice = createSlice({
    name: "auth",   
    initialState: initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ user: IUser, token: string }>) => {
            state.user = action.payload.user
            state.token = action.payload.token

            localStorage.setItem("user", JSON.stringify(action.payload.user))
            localStorage.setItem("token", action.payload.token)
        },
        logout: (state) => {
            state.user = null
            state.token = null
        
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        },
        signUpSuccess: (state, action: PayloadAction<{ user: IUser  }> ) => {
            state.user = action.payload.user

            localStorage.setItem("user", JSON.stringify(action.payload.user))
        }
    }
})


export const { loginSuccess, logout, signUpSuccess } = authSlice.actions;
export default authSlice.reducer;


