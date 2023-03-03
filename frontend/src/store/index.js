import { createSlice,  configureStore } from "@reduxjs/toolkit";
const loginSlice = createSlice({
name: "auth",
initialState: {isLoggedIn: false},
reducers: {
    login(state){
        state.isLoggedIn = true
    },
    logout(state){
        state.isLoggedIn = false
    },
},
});
export const loginActions = loginSlice.actions
export const store = configureStore({
    reducer: loginSlice.reducer
})